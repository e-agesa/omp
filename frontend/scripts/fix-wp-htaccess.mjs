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

    // Check cms directory
    console.log("Checking /cms/ contents:");
    const listing = await sftp.list("/home/ourmallpharmacy/public_html/cms");
    listing.slice(0, 15).forEach(f => console.log(`  ${f.type === "d" ? "[DIR]" : "     "} ${f.name}`));

    // Upload WordPress .htaccess
    const wpHtaccess = `# BEGIN WordPress
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]
RewriteBase /cms/
RewriteRule ^index\\.php$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /cms/index.php [L]
</IfModule>
# END WordPress
`;

    await sftp.put(Buffer.from(wpHtaccess), "/home/ourmallpharmacy/public_html/cms/.htaccess");
    console.log("\nUploaded /cms/.htaccess");

    // Check wp-config.php exists
    try {
      const stat = await sftp.stat("/home/ourmallpharmacy/public_html/cms/wp-config.php");
      console.log("wp-config.php exists:", stat.size, "bytes");
    } catch {
      console.log("wp-config.php MISSING!");
    }

  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    await sftp.end();
  }
}

fix();
