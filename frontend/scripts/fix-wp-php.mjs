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

    // Upload .htaccess with PHP handler enabled
    const wpHtaccess = `# Enable PHP execution
<IfModule LiteSpeed>
    RewriteEngine On
    RewriteRule .* - [E=noabort:1,E=noconntimeout:1]
</IfModule>

AddHandler application/x-httpd-lsphp .php

# BEGIN WordPress
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
    console.log("Updated /cms/.htaccess with PHP handler");

    // Also create a simple PHP test file
    const testPhp = `<?php echo 'PHP OK: ' . phpversion(); ?>`;
    await sftp.put(Buffer.from(testPhp), "/home/ourmallpharmacy/public_html/cms/test.php");
    console.log("Created test.php");

  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    await sftp.end();
  }
}

fix();
