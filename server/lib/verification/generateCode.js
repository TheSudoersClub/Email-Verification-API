// fs module for handling files
const fs = require("fs");

// sendMail function to send the verification code email
const sendMail = require('../sendmail/sendMail');

// function for generating verification code with given file name 
async function generateCode(email) {
    // generate code
    const code = Math.floor(Math.random() * (999999 - 100000)) + 1000;

    // filepath
    const filepath = "temp/otp/" + email + ".txt";

    // store the generate code in file temporarily 
    try {
        fs.writeFileSync(filepath, code.toString());

        // send email to user and store set result (true/false)
        const result = await sendMail(email, code.toString());

        if (result) {
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