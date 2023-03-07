const fs = require('fs');

// Delete the directory and its contents recursively
function deleteDirectory(path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(file => {
            const curPath = `${path}/${file}`;
            if (fs.statSync(curPath).isDirectory()) { // Use fs.statSync instead of fs.lstatSync
                deleteDirectory(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}

// Export the deleteDirectory function
module.exports = deleteDirectory;