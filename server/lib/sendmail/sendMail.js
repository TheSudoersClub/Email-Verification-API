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
        subject: "verification code from TSC",
        text: `Verification code - ${message}`,
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
        return true;
    } catch (error) {
        console.log(error);
    }
}

// export sendMail function
module.exports = sendMail;