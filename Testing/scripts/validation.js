let email;
let code;

document.getElementById('verify-email-btn').addEventListener('click', () => {
    email = document.getElementById('email').value;

    fetch(`http://localhost:3000/generateCode?email=${encodeURIComponent(email)}`)
        .then(response => response.text())
        .then(data => {
            console.log(data);
        })
        .catch(err => console.error(err));

    console.log('done')
});

document.getElementById('verify-code-btn').addEventListener('click', () => {

    // get the verification code entered by an user
    verificationCode = document.getElementById('verification-code').value;

    fetch(`http://localhost:3000/verifyCode?email=${encodeURIComponent(email)}&code=${encodeURIComponent(verificationCode)}`)
        .then(response => response.text())
        .then(data => {
            console.log(data);
        })
        .catch(err => console.error(err));

});