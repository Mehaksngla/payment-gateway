module.exports={
    verificationTypes: {
    "email": "email",
    "phone": "phone"
},
    verificationPurposes: {
        "emailVerify": "Email Verify",
        "forgetPassword": "forget Password",
        "phoneVerify": "Phone verify"
    },
    templateIds: {
        forgetPasswordTemplate: "ResetPassword"
    },
    routes: {
        paymentGateway: "/paymentGateway",
        createCustomer: "/createCustomer",
        createToken:"/createToken"
    }
}
