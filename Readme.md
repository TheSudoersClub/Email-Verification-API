# Email Verification API

This API allows you to generate and verify email verification codes for a specified email address.

## Base URL

[https://verify-email.onrender.com/](https://verify-email.onrender.com/)

## Endpoint
`Get /generateCode`\
`Get /VerifyCode`

## GenerateCode Endpoint
This endpoint generates a verification code and sends it to the specified email address.

### Request

**URL:** '/generateCode'\
**Method:** `GET`\
**Query Parameters:** \
&nbsp;&nbsp;&nbsp;&nbsp;**email:** the email address to which the verification code should be sent.

### Response
**Success:**
```json
{
  "status": true,
  "message": "Verification code has been sent to user@example.com"
}
```

**Error:**
```json
{
  "status": false,
  "message": "Error sending verification code"
}

```

## VerifyCode Endpoint
This endpoint verifies the entered verification code for the specified email address.

### Request

**URL:** '/verifyCode'\
**Method:** `GET`\
**Query Parameters:** \
&nbsp;&nbsp;&nbsp;&nbsp;**email:**  the email address for which the verification code should be verified.\
&nbsp;&nbsp;&nbsp;&nbsp;**code:** This endpoint verifies the entered verification code for the specified email address.


### Response
**Success:**
```json
{
  "status": true,
  "message": "Verification successful",
  "codeExpired": true,
  "attemptsLeft": 0
}

```

**Error:**
```json
{
  "status": true,
  "message": "Verification successful",
  "codeExpired": false,
  "attemptsLeft": 2
}
```
