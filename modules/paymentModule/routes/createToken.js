const express = require('express');
const router = express.Router();
const validate = require("../../../lib/validate");
const _ = require("lodash");


const Constants = require("../../../constants/constants");

const PaymentController = require("../paymentController");



/** Validate request body */
const validateBodySchema = {
    type: "object",
    properties: {
        number: { type: "string", format: "nonEmptyOrBlank" },
        exp_month: { type: "string", format: "nonEmptyOrBlank" },
        exp_year: { type: "string", format: "notEmptyOrBlank"},
        cvc : {type:"string",format:"notEmptyOrBlank"}
    },
    required: ["number","exp_mponth","exp_year","cvc"]
};


async function createToken(req, res) {
    validate(req.body, validateBodySchema);

    let cardDetails = Object.assign({}, req.body);
    await PaymentController.createCustomer(cardDetails);

    return res.json({
        "message": "Token created Succesfully"
    });

}

/**
 * Route for creating token for getting token id to add card details
 */
 module.exports = router.post(Constants.routes.crateToken,createToken);