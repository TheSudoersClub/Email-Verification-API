// fs module for handling files
const fs = require("fs");

// exec module to run system commands - to remove (delete) the file 
const {
    exec
} = require('child_process');

// function for generating verification code with given file name 
async function verifyCode(fileName, clientCode) {
    // filepath
    const filepath = "server/temp/otp/" + fileName + ".txt";

    try {
        const data = fs.readFileSync(filepath, "utf8");

        // if verification code matches
        if (clientCode === data) {

            // delete the file once the code is verified
            exec(`rm ${filepath}`, (error, stdout, stderr) => {
                if (error) {
                    console.log(error);
                }
            });

            // return true (success)
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.log(err);
        return false;
    }

}

module.exports = verifyCode;