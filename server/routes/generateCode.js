const express = require('express');
const router = express.Router();
const path = require("path")

// generateCode function
const generateCode = require(path.join(__dirname, '../lib/verification/generateCode'));

// generate verification code route
router.get('/', async (req, res) => {
    // email of user
    const email = req.query.email

    // get the response
    const {
        status,
        message
    } = await generateCode(email);

    // send the response
    res.send({
        status,
        message
    });
});

// export the router
module.exports = router;