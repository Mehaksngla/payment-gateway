const errors = require("../../lib/error");
const stripe =  require('stripe')('sk_test_51KCOBmSJVW9yInJ5ucWoFJfYu8IAFduh35LtAxUSm20VADpN1dOCgX04WWtQAaIRaUIui60fG6Qx4YCXZ9M71XEV00Q7l8KER9')



class PaymentController {

    static async paymentGateway(data) {
        return stripe.charges.create(data);
    }

    static async createCustomer(userdata){
        let customer = await stripe.customers.retrieve(userdata.email)
        if(customer){
            throw errors.ALREADY_REGISTERED("Customer with same email id already exists")
        }

        return stripe.customers.create(userdata)
    }

    static async createToken(cardDetails){
        return stripe.tokens.create(cardDetails);
    }
}
module.exports = PaymentController;