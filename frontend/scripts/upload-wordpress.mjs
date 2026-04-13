/**
 * Upload WordPress to cPanel via SFTP
 */

import SftpClient from "ssh2-sftp-client";
import path from "path";
import fs from "fs";

const CONFIG = {
  host: "ourmallpharmacy.com",
  port: 22,
  username: "ourmallpharmacy",
  password: "Tw1nFusion2026",
};

// Git Bash /tmp maps to a different location on Windows
import os from "os";
const LOCAL_DIR = path.join(os.tmpdir(), "wordpress");
const REMOTE_DIR = "/home/ourmallpharmacy/public_html/cms";

let uploadCount = 0;
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
  try { await sftp.mkdir(remoteDir, true); } catch {}

  const entries = fs.readdirSync(localDir, { withFileTypes: true });
  for (const entry of entries) {
    const localPath = path.join(localDir, entry.name);
    const remotePath = `${remoteDir}/${entry.name}`;

    if (entry.isDirectory()) {
      await uploadDir(sftp, localPath, remotePath);
    } else {
      try {
        const remoteStat = await sftp.stat(remotePath);
        const localStat = fs.statSync(localPath);
        if (remoteStat.size === localStat.size) { uploadCount++; continue; }
      } catch {}

      for (let attempt = 1; attempt <= 3; attempt++) {
        try { await sftp.put(localPath, remotePath); break; }
        catch (err) { if (attempt === 3) console.error(`  Failed: ${remotePath}`); await new Promise(r => setTimeout(r, 500)); }
      }
      uploadCount++;
      if (uploadCount % 100 === 0 || uploadCount === totalFiles) {
        const pct = Math.round((uploadCount / totalFiles) * 100);
        process.stdout.write(`\r  Uploading: ${uploadCount}/${totalFiles} (${pct}%)`);
      }
    }
  }
}

async function deploy() {
  const sftp = new SftpClient();
  try {
    console.log(`\n  Uploading WordPress to ${REMOTE_DIR}...`);
    await sftp.connect({ ...CONFIG, readyTimeout: 30000 });

    totalFiles = countFiles(LOCAL_DIR);
    console.log(`  ${totalFiles} files\n`);

    await uploadDir(sftp, LOCAL_DIR, REMOTE_DIR);
    console.log(`\n\n  WordPress uploaded!`);
    console.log(`  Admin: https://ourmallpharmacy.com/cms/wp-admin/`);
    console.log(`  Install: https://ourmallpharmacy.com/cms/wp-admin/install.php\n`);
  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    await sftp.end();
  }
}

deploy();
