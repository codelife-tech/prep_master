const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist');
const clientDir = path.join(distDir, 'client');
const serverDir = path.join(distDir, 'server');

function copyRecursiveSync(src, dest) {
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats.isDirectory();
    if (isDirectory) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }
        fs.readdirSync(src).forEach((childItemName) => {
            copyRecursiveSync(
                path.join(src, childItemName),
                path.join(dest, childItemName)
            );
        });
    } else {
        fs.copyFileSync(src, dest);
    }
}

console.log('Merging dist/client and dist/server into dist root...');

if (fs.existsSync(clientDir)) {
    copyRecursiveSync(clientDir, distDir);
    console.log('Copied client assets.');
}

if (fs.existsSync(serverDir)) {
    copyRecursiveSync(serverDir, distDir);
    console.log('Copied server files.');
}

console.log('Merge complete!');
