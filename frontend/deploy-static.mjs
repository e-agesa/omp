/**
 * OMP Frontend — Deploy static export to public_html
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

const REMOTE_DIR = "/home/ourmallpharmacy/public_html";
const LOCAL_DIR = path.join(__dirname, "out");

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
      // Skip if same size (resume)
      try {
        const remoteStat = await sftp.stat(remotePath);
        const localStat = fs.statSync(localPath);
        if (remoteStat.size === localStat.size) {
          skipCount++;
          uploadCount++;
          if (uploadCount % 50 === 0) {
            process.stdout.write(`\r  Progress: ${uploadCount}/${totalFiles} (${skipCount} skipped)`);
          }
          continue;
        }
      } catch { /* doesn't exist */ }

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
      if (uploadCount % 20 === 0 || uploadCount === totalFiles) {
        const pct = Math.round((uploadCount / totalFiles) * 100);
        process.stdout.write(`\r  Uploading: ${uploadCount}/${totalFiles} files (${pct}%)`);
      }
    }
  }
}

async function deploy() {
  const sftp = new SftpClient();

  try {
    console.log(`\n  Connecting to ${CONFIG.host}...`);
    await sftp.connect({ ...CONFIG, readyTimeout: 30000 });
    console.log("  Connected!\n");

    totalFiles = countFiles(LOCAL_DIR);
    console.log(`  Deploying ${totalFiles} static files to ${REMOTE_DIR}\n`);

    await uploadDir(sftp, LOCAL_DIR, REMOTE_DIR);

    const uploaded = uploadCount - skipCount;
    console.log(`\n\n  Deploy complete!`);
    console.log(`  ${uploaded} files uploaded, ${skipCount} skipped`);
    console.log(`\n  Site live at: https://ourmallpharmacy.com\n`);

  } catch (err) {
    console.error("\n  Error:", err.message);
    console.error("  Run again to resume.");
  } finally {
    await sftp.end();
  }
}

deploy();
