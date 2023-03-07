const express = require('express');
const router = express.Router();

// generateCode function
const verifyCode = require('../lib/verification/verifyCode');


// verify verification code route
router.get('/', async (req, res) => {
    // email of user
    const email = decodeURIComponent(req.query.email);

    // user entered verification code
    const code = decodeURIComponent(req.query.code);

    // get response
    const {
        status,
        message,
        codeExpired,
        attemptsLeft
    } = await verifyCode(email, code);

    // sent the response
    res.send({
        status: status,
        message: message,
        codeExpired: codeExpired,
        attemptsLeft: attemptsLeft
    });
});

// export the router
module.exports = router;