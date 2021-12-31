const VerificationModel = require("../models/verification");
const constants = require("../../../constants/constants")


class VerificationController {

    static async updateOrCreateVerificationDoc(verificationType, verificationPurpose, value, code) {

        const type = verificationType;
        const purpose = verificationPurpose;
        const query = { value: value, type: verificationType };

        const data = {
            issuedAt: new Date(),
            value: value,
            type: type,
            purpose: purpose,
            code: code,
            verified: false
        };

        const options = {
            new: true,
            upsert: true 
        };

        return await VerificationModel.findOneAndUpdate(query, data, options);
    }

}

module.exports = VerificationController;
