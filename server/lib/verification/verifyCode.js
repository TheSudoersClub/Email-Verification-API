// fs module for handling files
const fs = require("fs");

// exec module to run system commands - to remove (delete) the file 
const {
    exec
} = require('child_process');

// function for generating verification code with given file name 
async function verifyCode(fileName, clientCode) {

    // directory path
    const directoryPath = "server/temp/otp/" + fileName;

    // verificationCodePath
    const verificationCodePath = directoryPath + "/otp.txt";

    // attempts file path
    const attemptFile = directoryPath + "/attempts.txt";

    try {
        // read the actual verification code
        data = fs.readFileSync(verificationCodePath, "utf8");

        // compare the code with actual code
        if (clientCode === data) {
            // delete the directory once the code is verified
            exec(`rm -rf ${directoryPath}`, (error, stdout, stderr) => {
                if (error) {
                    console.log(error);
                }
            });

            // return success once code is verified
            return true;
        } else {

            // initialize the attemptCount with 0 initially
            let attemptCount = 0;

            try {
                // update the attemptCount form attempts.txt file
                attemptCount = parseInt(fs.readFileSync(attemptFile, "utf8"));

                // increment the attemptCount for invalid attempt
                attemptCount++;

                // check weather the attemptCount has greater than 3 
                if (attemptCount >= 3) {
                    // delete the directory if attempt count exceeds 3
                    exec(`rm -rf ${directoryPath}`, (error, stdout, stderr) => {
                        if (error) {
                            console.log(error);
                        }
                    });

                    // return false for invalid attempts
                    return false;
                } else {
                    // write the updated attempt count to the attempt file
                    fs.writeFileSync(attemptFile, attemptCount.toString(), "utf8");
                }
            } catch (err) {
                console.error(err);
                return false;
            }

        }
    } catch (error) {
        console.log(error);
        return false;
    }

}

// export the verifyCode function
module.exports = verifyCode;