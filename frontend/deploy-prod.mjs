/**
 * OMP Frontend — SFTP Deploy to cPanel (with resume support)
 * Usage: node deploy-prod.mjs
 */

import SftpClient from "ssh2-sftp-client";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CONFIG = {
  host: "ourmallpharmacy.com",
  port: 22,
  username: "ourmallpharmacy",
  password: "Tw1nFusion2026",
};

const REMOTE_DIR = "/home/ourmallpharmacy/omp-frontend";
const LOCAL_DIR = path.join(__dirname, ".next", "standalone");

let uploadCount = 0;
let skipCount = 0;
let totalFiles = 0;

function countFiles(dir) {
  let count = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      count += countFiles(path.join(dir, entry.name));
    } else {
      count++;
    }
  }
  return count;
}

async function uploadDir(sftp, localDir, remoteDir) {
  try {
    await sftp.mkdir(remoteDir, true);
  } catch { /* exists */ }

  const entries = fs.readdirSync(localDir, { withFileTypes: true });

  for (const entry of entries) {
    const localPath = path.join(localDir, entry.name);
    const remotePath = `${remoteDir}/${entry.name}`;

    if (entry.isDirectory()) {
      await uploadDir(sftp, localPath, remotePath);
    } else {
      // Check if file exists and same size (resume support)
      try {
        const remoteStat = await sftp.stat(remotePath);
        const localStat = fs.statSync(localPath);
        if (remoteStat.size === localStat.size) {
          skipCount++;
          uploadCount++;
          if (uploadCount % 100 === 0) {
            process.stdout.write(`\r  Progress: ${uploadCount}/${totalFiles} (${skipCount} skipped)`);
          }
          continue;
        }
      } catch { /* file doesn't exist, upload it */ }

      // Retry up to 3 times
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          await sftp.put(localPath, remotePath);
          break;
        } catch (err) {
          if (attempt === 3) throw err;
          await new Promise(r => setTimeout(r, 1000));
        }
      }
      uploadCount++;
      if (uploadCount % 50 === 0 || uploadCount === totalFiles) {
        const pct = Math.round((uploadCount / totalFiles) * 100);
        process.stdout.write(`\r  Uploading: ${uploadCount}/${totalFiles} files (${pct}%) [${skipCount} skipped]`);
      }
    }
  }
}

async function deploy() {
  const sftp = new SftpClient();

  try {
    console.log(`\n  Connecting to ${CONFIG.host}...`);
    await sftp.connect({
      ...CONFIG,
      readyTimeout: 30000,
      retries: 3,
      retry_minTimeout: 2000,
    });
    console.log("  Connected!\n");

    totalFiles = countFiles(LOCAL_DIR);
    console.log(`  ${totalFiles} files to upload to ${REMOTE_DIR}`);
    console.log(`  (Skipping files that already exist with same size)\n`);

    await uploadDir(sftp, LOCAL_DIR, REMOTE_DIR);
    console.log("\n");

    // Upload .env.local
    const envFile = path.join(__dirname, ".env.local");
    if (fs.existsSync(envFile)) {
      await sftp.put(envFile, `${REMOTE_DIR}/.env.local`);
      console.log("  Uploaded .env.local");
    }

    const uploaded = uploadCount - skipCount;
    console.log(`\n  Deploy complete!`);
    console.log(`  ${uploaded} files uploaded, ${skipCount} skipped (already existed)`);
    console.log(`  Files at: ${REMOTE_DIR}`);
    console.log(`\n  cPanel Node.js App Setup:`);
    console.log(`  1. Go to "Setup Node.js App" in cPanel`);
    console.log(`  2. Create a new app:`);
    console.log(`     - Node.js version: 18+ (latest available)`);
    console.log(`     - App mode: Production`);
    console.log(`     - App root: omp-frontend`);
    console.log(`     - App URL: / (root domain)`);
    console.log(`     - Startup file: server.js`);
    console.log(`  3. Click "Create" then your site is live at https://ourmallpharmacy.com\n`);

  } catch (err) {
    console.error("\n  Error:", err.message);
    console.error("  Run again to resume — already uploaded files will be skipped.");
  } finally {
    await sftp.end();
  }
}

deploy();
