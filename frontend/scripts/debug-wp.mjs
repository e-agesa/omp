import SftpClient from "ssh2-sftp-client";

const CONFIG = {
  host: "ourmallpharmacy.com",
  port: 22,
  username: "ourmallpharmacy",
  password: "Tw1nFusion2026",
};

async function debug() {
  const sftp = new SftpClient();
  try {
    await sftp.connect(CONFIG);

    // Check file permissions on key files
    console.log("File permissions:");
    const files = [
      "/home/ourmallpharmacy/public_html/phptest.php",
      "/home/ourmallpharmacy/public_html/cms/index.php",
      "/home/ourmallpharmacy/public_html/cms/wp-config.php",
      "/home/ourmallpharmacy/public_html/cms/wp-login.php",
      "/home/ourmallpharmacy/public_html/cms/test.php",
    ];
    for (const f of files) {
      try {
        const stat = await sftp.stat(f);
        console.log(`  ${f.split("/").pop()}: mode=${stat.mode?.toString(8)} size=${stat.size}`);
      } catch { console.log(`  ${f.split("/").pop()}: NOT FOUND`); }
    }

    // Check directory permissions
    console.log("\nDirectory permissions:");
    const dirs = [
      "/home/ourmallpharmacy/public_html",
      "/home/ourmallpharmacy/public_html/cms",
      "/home/ourmallpharmacy/public_html/cms/wp-admin",
    ];
    for (const d of dirs) {
      try {
        const stat = await sftp.stat(d);
        console.log(`  ${d}: mode=${stat.mode?.toString(8)}`);
      } catch { console.log(`  ${d}: NOT FOUND`); }
    }

    // Check root .htaccess — it might be blocking PHP in subdirs
    console.log("\nRoot .htaccess:");
    try {
      const content = await sftp.get("/home/ourmallpharmacy/public_html/.htaccess");
      console.log(content.toString());
    } catch { console.log("  No root .htaccess"); }

    // Fix permissions - PHP files need 644, directories need 755
    console.log("\nFixing permissions...");
    await sftp.chmod("/home/ourmallpharmacy/public_html/cms", 0o755);
    await sftp.chmod("/home/ourmallpharmacy/public_html/cms/index.php", 0o644);
    await sftp.chmod("/home/ourmallpharmacy/public_html/cms/wp-login.php", 0o644);
    await sftp.chmod("/home/ourmallpharmacy/public_html/cms/wp-config.php", 0o644);
    await sftp.chmod("/home/ourmallpharmacy/public_html/cms/test.php", 0o644);
    await sftp.chmod("/home/ourmallpharmacy/public_html/phptest.php", 0o644);
    console.log("Permissions fixed (dirs=755, files=644)");

  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    await sftp.end();
  }
}

debug();
