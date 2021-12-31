const express = require('express')
const router = express.Router()
const validate = require("../../../lib/validate")
const UserController = require("../Controller/userController");
let User = require('../models/user')

//register User
async function createUser(req, res) {
    validate(req.body, {
        type: "object",
        properties: {
            name: { type: "string", format: "nonEmptyOrBlank" },
            email: { type: "string", format: "email" },
            userName: { type: "string", format: "nonEmptyOrBlank" },
            password: { type: "string", format: "nonEmptyOrBlank", minLength: 5, maxLength: 20 },
        },
        required: ["name", "email","userName", "password"]
    });

    let user = Object.assign({}, req.body);
    await UserController.createUser(user);

    return res.json({
        "message": "user created successfully"
    });

}

//login user
async function loginUser(req, res) {
    
    validate(req.body, {
        type: "object",
        properties: {
            email: { type: "string", format: "email", maxLength: 128 },
            password: { type: "string", format: "password", maxLength: 128 }
        },
        required: ["email", "password"]
    });

    const token = await UserCtrl.loginUser(req.body.email, req.body.password);


    
    res.setHeader("Authorization", token);
    res.json({ "message": "Logged in successfully." });

}


//forget password 
async function forgetHandler (req, res) {
    validate(req.body,{
        type: "object",
        properties: {
            email: { type: "string", format: "email" }
        },
        required: ["email"]
    });
    await UserCtrl.forgotPassword(req.body.email);
    res.json({"message":"success"});
}


module.exports = router.post('/login',loginUser)
module.exports = router.post('/register',createUser)
module.exports = router.post('/forgetpassword',forgetHandler)