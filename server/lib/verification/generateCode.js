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

    // filepath
    const filepath = "server/temp/otp/" + email + ".txt";

    // store the generate code in file temporarily 
    try {
        fs.writeFileSync(filepath, code.toString());

        // send email to user and store set result (true/false)
        const result = await sendMail(email, code.toString());

        if (result) {
            // auto delete file after 5 min
            setTimeout(() => {

                // remove the file from system
                exec(`rm -f ${filepath}`, (error, stdout, stderr) => {
                    if (error) {
                        console.log(error);
                    }
                });

            }, 300000);

            // return success
            return true;
        }
    }
    // handle error
    catch (error) {
        console.log(error)
        return false;
    }

}

// export the function
module.exports = generateCode;