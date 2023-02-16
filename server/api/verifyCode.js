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

    // status
    const result = await verifyCode(email, code);

    // response according to result
    if (result) {
        res.send({success: true});
    } else {
        res.send({success: false});
    }
});

// export the router
module.exports = router;