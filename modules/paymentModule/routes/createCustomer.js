const express = require('express');
const router = express.Router();
const validate = require("../../../lib/validate");
const _ = require("lodash");


const Constants = require("../../../constants/constants");

const PaymentController = require("../paymentController");

/**
 * Route for creating cutomer on stripe
 */
module.exports = router.post(Constants.routes.createCustomer,createCustomer);

/** Validate request body */
const validateBodySchema = {
    type: "object",
    properties: {
        email: { type: "string", format: "nonEmptyOrBlank" },
        name: { type: "string", format: "nonEmptyOrBlank" },
        description: { type: "string" },
    },
    required: ["email","name"]
};


async function createCustomer(req, res) {
    validate(req.body, validateBodySchema);

    let userData = Object.assign({}, req.body);
    await PaymentController.createCustomer(userData);

    return res.json({
        "message": "Customer Registed Successfully"
    });

}