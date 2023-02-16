// express module for server
const express = require("express");
const app = express();

// fs module for handling files
const fs = require("fs");

// generateCode route
const generateCode = require('./api/generateCode');

app.use((req, res, next) => {
    next();
});

// generate and send verification code endpoint
app.use("/generateCode", generateCode);

// listen server on port 3000
app.listen(3000, () => {
    console.log("Api listening on port 3000");
})