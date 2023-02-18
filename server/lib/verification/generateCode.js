// fs module for handling files
const fs = require("fs");

// exec module to run system commands - to remove (delete) the file 
const {
    exec
} = require('child_process');

// sendMail function to send the verification code email
const sendMail = require('../sendmail/sendMail');

// function for generating verification code with given file name 
async function generateCode(email) {
    // generate code
    const code = Math.floor(Math.random() * (999999 - 100000)) + 100000;

    // directoryPath
    const directoryPath = "server/temp/otp/" + email;

    // verificationCodePath
    const verificationCodePath = directoryPath + "/otp.txt";

    // attempts file path
    const attemptFile = directoryPath + "/attempts.txt";

    try {
        // create the directory for client
        fs.mkdirSync(directoryPath, {
            recursive: true
        });

        // delete the generated directory after 5min
        setTimeout(() => {

            // delete the directory once the code is verified
            exec(`rm -rf ${directoryPath}`, (error, stdout, stderr) => {
                if (error) {
                    console.log(error);
                }
            });
        }, 300000);

        // store the generate code in file
        try {
            // generate the file for verification code and attempts
            fs.writeFileSync(verificationCodePath, code.toString());
            fs.writeFileSync(attemptFile, "0");

            // send email to user and store set result (true/false)
            const result = await sendMail(email, code.toString());

            if (result) {
                // return success
                return true;
            }
        }
        // handle error
        catch (error) {
            console.error(error);
            return false;
        }

    } catch (error) {
        console.error(error);
        return false;
    }

}

// export the function
module.exports = generateCode;