const express = require('express');
const router = express.Router();

// generateCode function
const generateCode = require('../lib/verification/generateCode');

// generate verification code route
router.get('/', (req, res) => {
    // email of user
    const email = req.query.email
    console.log(email)
    // status 
    const result = generateCode(email);

    // handle promise
    result.then((status) => {
        // response
        if (status) {
            res.send({
                success: true
            });
        } else {
            res.send({
                success: false
            });
        }
    })
});

// export the router
module.exports = router;