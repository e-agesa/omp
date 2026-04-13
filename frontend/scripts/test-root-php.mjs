import SftpClient from "ssh2-sftp-client";

const CONFIG = {
  host: "ourmallpharmacy.com",
  port: 22,
  username: "ourmallpharmacy",
  password: "Tw1nFusion2026",
};

async function fix() {
  const sftp = new SftpClient();
  try {
    await sftp.connect(CONFIG);
    const testPhp = `<?php echo 'PHP OK: ' . phpversion(); ?>`;
    await sftp.put(Buffer.from(testPhp), "/home/ourmallpharmacy/public_html/phptest.php");
    console.log("Created phptest.php in root");
  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    await sftp.end();
  }
}
fix();
