const express = require('express');
const router = express.Router();

// generate verification code route
router.get('/', (req, res) => {
    // email of user
    const email = req.query.email

    // status 
    const result = true;
    // const result = generateCode(email);

    // response
    if (result) {
        res.send({
            success: true
        });
    } else {
        res.send({
            success: false
        });
    }
});

// export the router
module.exports = router;