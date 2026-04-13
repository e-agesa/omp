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

    // Fix root .htaccess — exclude /cms/ from ALL rules
    const rootHtaccess = `RewriteEngine On

# Force HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# IMPORTANT: Let WordPress /cms/ handle its own requests
RewriteCond %{REQUEST_URI} ^/cms/ [NC]
RewriteRule ^ - [L]

# Allow _next directory
RewriteRule ^_next/(.*)$ _next/$1 [L]

# Product dynamic routes (Next.js static)
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^product/([^/]+)/?$ /product/placeholder/index.html [L]

# Trailing slash fallback for static HTML
RewriteCond %{REQUEST_URI} !^/cms/
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME}.html -f
RewriteRule ^(.*)$ $1.html [L]

DirectoryIndex index.html index.php
ErrorDocument 404 /404.html
Options -Indexes

<IfModule mod_expires.c>
ExpiresActive On
ExpiresByType text/css "access plus 1 year"
ExpiresByType application/javascript "access plus 1 year"
ExpiresByType image/webp "access plus 1 year"
ExpiresByType image/jpeg "access plus 1 year"
ExpiresByType font/woff2 "access plus 1 year"
</IfModule>
<IfModule mod_deflate.c>
AddOutputFilterByType DEFLATE text/html text/css application/javascript application/json
</IfModule>
<IfModule mod_headers.c>
Header set X-Content-Type-Options "nosniff"
Header set X-Frame-Options "SAMEORIGIN"
Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>
`;

    await sftp.put(Buffer.from(rootHtaccess), "/home/ourmallpharmacy/public_html/.htaccess");
    console.log("Updated root .htaccess (cms excluded from rewrites)");

    // WordPress .htaccess
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
    console.log("Updated /cms/.htaccess");

    // Fix file permissions to be safe
    try { await sftp.chmod("/home/ourmallpharmacy/public_html/phptest.php", 0o644); } catch {}
    try { await sftp.chmod("/home/ourmallpharmacy/public_html/cms/test.php", 0o644); } catch {}
    try { await sftp.chmod("/home/ourmallpharmacy/public_html/cms/index.php", 0o644); } catch {}
    try { await sftp.chmod("/home/ourmallpharmacy/public_html/cms/wp-login.php", 0o644); } catch {}
    console.log("Permissions set to 644");

  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    await sftp.end();
  }
}

fix();
