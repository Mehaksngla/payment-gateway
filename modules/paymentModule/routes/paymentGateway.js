const express = require('express');
const router = express.Router();
const validate = require("../../../lib/validate");
const _ = require("lodash");


const Constants = require("../../../constants/constants");

const PaymentController = require("../paymentController");

/**
 * Route for payment
 */
module.exports = router.post(Constants.routes.paymentGateway,paymentGateway);

/** Validate request body */
const validateBodySchema = {
    type: "object",
    properties: {
        amount: { type: "string", format: "nonEmptyOrBlank" },
        currency: { type: "string", format: "nonEmptyOrBlank" },
        description: { type: "string", format: "nonEmptyOrBlank" },
        customer: { type: "string", format: "nonEmptyOrBlank" },
    },
    required: ["amount", "currency", "customer"]
};

/** Payment Gateway for payments */
/**
 * @swagger
 * components:
 * path:
 *  /payment:
 *    post:
 *      summary: payment handling for the customer registered.
 *      description: payment done using third party integration stripe
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema: 
 *              required : -amount 
 *                         -customer
 *                         -currency 
 *      responses:
 *        "200":
 *          content:
 *            application/json:
 *              example:
 *                "message": "Transaction Done Successfully"
 */
async function paymentGateway(req, res) {
    validate(req.body, validateBodySchema);

    let paymentDetails = Object.assign({}, req.body);
    await PaymentController.paymentGateway(paymentDetails);

    return res.json({
        "message": "Transaction Done Successfully"
    });

}