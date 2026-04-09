#!/bin/bash
# ═══════════════════════════════════════════════════════
# OMP Frontend — Build & Deploy via SFTP
# Usage: ./deploy.sh [staging|production]
# ═══════════════════════════════════════════════════════

set -euo pipefail

ENV="${1:-staging}"

# ── Configuration ──
# Override these via environment variables or edit below
SFTP_HOST="${SFTP_HOST:-}"
SFTP_USER="${SFTP_USER:-}"
SFTP_PORT="${SFTP_PORT:-22}"
SFTP_KEY="${SFTP_KEY:-~/.ssh/id_rsa}"
REMOTE_DIR="${REMOTE_DIR:-/var/www/omp-frontend}"

if [ -z "$SFTP_HOST" ] || [ -z "$SFTP_USER" ]; then
  echo "================================================================"
  echo "  OMP Deploy Script"
  echo "================================================================"
  echo ""
  echo "  SFTP credentials not set. Configure via environment variables:"
  echo ""
  echo "    export SFTP_HOST=your-server-ip"
  echo "    export SFTP_USER=your-username"
  echo "    export SFTP_PORT=22"
  echo "    export SFTP_KEY=~/.ssh/id_rsa"
  echo "    export REMOTE_DIR=/var/www/omp-frontend"
  echo ""
  echo "  Or create a .deploy.env file (gitignored):"
  echo ""
  echo "    SFTP_HOST=your-server-ip"
  echo "    SFTP_USER=your-username"
  echo ""
  echo "  Then run: ./deploy.sh staging"
  echo "================================================================"

  # Check for .deploy.env
  if [ -f ".deploy.env" ]; then
    echo "Found .deploy.env, loading..."
    export $(grep -v '^#' .deploy.env | xargs)
  else
    exit 1
  fi
fi

echo "══════════════════════════════════════"
echo "  Deploying OMP Frontend → ${ENV}"
echo "  Host: ${SFTP_HOST}"
echo "  Dir:  ${REMOTE_DIR}"
echo "══════════════════════════════════════"

# ── Step 1: Clean previous build ──
echo ""
echo "[1/5] Cleaning previous build..."
rm -rf .next
rm -rf out

# ── Step 2: Install dependencies ──
echo "[2/5] Installing dependencies..."
npm ci --production=false

# ── Step 3: Copy env file for build ──
echo "[3/5] Setting environment for ${ENV}..."
if [ "$ENV" = "production" ] && [ -f ".env.production" ]; then
  cp .env.production .env.local
elif [ -f ".env.staging" ]; then
  cp .env.staging .env.local
fi

# ── Step 4: Build ──
echo "[4/5] Building Next.js (standalone)..."
npm run build

# Prepare standalone package
echo "  Copying public and static assets..."
cp -r public .next/standalone/public 2>/dev/null || true
cp -r .next/static .next/standalone/.next/static

# Copy env to standalone
if [ -f ".env.local" ]; then
  cp .env.local .next/standalone/.env.local
fi

# Create a package archive
echo "  Creating deployment archive..."
cd .next/standalone
tar -czf ../../omp-frontend-${ENV}.tar.gz .
cd ../..

ARCHIVE="omp-frontend-${ENV}.tar.gz"
ARCHIVE_SIZE=$(du -h "$ARCHIVE" | cut -f1)
echo "  Archive: ${ARCHIVE} (${ARCHIVE_SIZE})"

# ── Step 5: Upload via SFTP ──
echo "[5/5] Uploading to ${SFTP_HOST}..."

# Upload archive
scp -P "${SFTP_PORT}" -i "${SFTP_KEY}" \
  "${ARCHIVE}" \
  "${SFTP_USER}@${SFTP_HOST}:/tmp/${ARCHIVE}"

# Extract on server and restart
ssh -p "${SFTP_PORT}" -i "${SFTP_KEY}" "${SFTP_USER}@${SFTP_HOST}" << REMOTE
  set -e

  # Backup current deployment
  if [ -d "${REMOTE_DIR}" ]; then
    echo "  Backing up current deployment..."
    cp -r "${REMOTE_DIR}" "${REMOTE_DIR}.bak.$(date +%Y%m%d_%H%M%S)" 2>/dev/null || true
  fi

  # Create target directory
  mkdir -p "${REMOTE_DIR}"

  # Extract new deployment
  echo "  Extracting new build..."
  tar -xzf /tmp/${ARCHIVE} -C "${REMOTE_DIR}"
  rm /tmp/${ARCHIVE}

  # Restart the app with PM2 (or systemd)
  if command -v pm2 &> /dev/null; then
    echo "  Restarting with PM2..."
    cd "${REMOTE_DIR}"
    pm2 stop omp-frontend 2>/dev/null || true
    PORT=3000 pm2 start server.js --name omp-frontend
    pm2 save
  else
    echo "  PM2 not found. Start manually with:"
    echo "    cd ${REMOTE_DIR} && PORT=3000 node server.js"
  fi

  echo "  Done!"
REMOTE

# Cleanup local archive
rm -f "${ARCHIVE}"

echo ""
echo "══════════════════════════════════════"
echo "  Deploy complete!"
echo "  Environment: ${ENV}"
echo "  Server: ${SFTP_HOST}"
echo "══════════════════════════════════════"
