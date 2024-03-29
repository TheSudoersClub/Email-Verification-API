// express module for server
const express = require("express");
const app = express();
const path = require("path")

// generateCode route
const generateCode = require(path.join(__dirname, '/routes/generateCode'));

// verifyCode route
const verifyCode = require(path.join(__dirname, '/routes/verifyCode'));

app.use((req, res, next) => {

    // Set CORS headers
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});

// generate and send verification code endpoint
app.use("/generateCode", generateCode);

// verify verification code endpoint
app.use("/verifyCode", verifyCode);

// listen server on port 3000
app.listen(3000, () => {
    console.log("Api listening on port 3000");
})