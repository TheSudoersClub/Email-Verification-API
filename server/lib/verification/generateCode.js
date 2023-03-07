// fs module for handling files
const fs = require("fs");

// deleteDirectory function to remove (delete) the directory
const deleteDirectory = require("../helper/deleteDirectory");

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
            deleteDirectory(directoryPath);

        }, 300000);

        // store the generate code in file
        try {
            // generate the file for verification code and attempts
            fs.writeFileSync(verificationCodePath, code.toString());
            fs.writeFileSync(attemptFile, "0");

            // call sendmail get the response 
            const {
                status,
                message
            } = await sendMail(email, code.toString());

            // return the response of the email
            return {
                status: status,
                message: message
            }
        }

        // handle error
        catch (error) {
            console.error(error);
            return {
                status: false,
                message: error
            };
        }

    } catch (error) {
        return {
            status: false,
            message: error
        };
    }

}

// export the function
module.exports = generateCode;