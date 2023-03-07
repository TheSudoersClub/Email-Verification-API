// fs module for handling files
const fs = require("fs");

// deleteDirectory function to remove (delete) the directory
const deleteDirectory = require("../helper/deleteDirectory");

// function for generating verification code with given file name 
async function verifyCode(fileName, clientCode) {

    console.log("verifyCode");

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

            console.log("verified");

            // delete the directory once the code is verified
            await deleteDirectory(directoryPath);

            // return success once code is verified
            return {
                status: true,
                message: "Verification Code verified successfully",
                codeExpired: true,
                codeExpired: true,
                attemptsLeft: 0
            };
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
                    await deleteDirectory(directoryPath);

                    // after 3 invalid attempts
                    return {
                        status: false,
                        message: "Attempts limit reached",
                        codeExpired: true,
                        codeExpired: true,
                        attemptsLeft: 0
                    };

                } else {
                    // write the updated attempt count to the attempt file
                    fs.writeFileSync(attemptFile, attemptCount.toString(), "utf8");

                    // return false for invalid attempts
                    return {
                        status: false,
                        message: "Invalid attempt",
                        codeExpired: false,
                        codeExpired: false,
                        attemptsLeft: (3 - attemptCount)
                    };
                }
            } catch (error) {

                // if the requested file is not fount or has been removed
                return {
                    status: false,
                    message: error,
                    codeExpired: true,
                    attemptsLeft: 0
                };
            }

        }
    } catch (error) {

        // if the requested file is not fount or has been removed
        return {
            status: false,
            message: error,
            codeExpired: true,
            attemptsLeft: 0
        };
    }

}

// export the verifyCode function
module.exports = verifyCode;