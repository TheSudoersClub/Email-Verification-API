// load environment variables
require("dotenv/config");

// import nodemailer to send emails with node
const nodemailer = require("nodemailer");

// function for sending emails to user
async function sendMail(sendersEmail, message) {

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.APP_PASSWORD
        }
    });

    let mailOptions = {
        from: 'TSC email verification api',
        to: sendersEmail,
        subject: "Verification code from TSC",
        text: `Verification code - ${message}`,
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        return {
            status: true,
            message: `Message sent: ${info.messageId}`
        };
    } catch (error) {
        console.log(error);
        return {
            status: false,
            message: error
        };
    }
}

// export sendMail function
module.exports = sendMail;