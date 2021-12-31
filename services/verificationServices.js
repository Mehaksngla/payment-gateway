const Constants = require("../constants/constants");
const VerificationController= require("../modules/verificationModule/controller/verificationController");
const Utility = require("../utils/utility");


const verifyOtp = async (code, purpose)=>{
    return await VerificationController.verifyOtp(code, purpose);
};


const deleteDoc = async (id)=>{
    return await VerificationController.deleteDoc(id);
};

const forgotPassword = async(email)=>{
    const code = Utility.randomNumeric(5);
    return VerificationController.updateOrCreateVerificationDoc(Constants.verificationTypes.email, Constants.verificationPurposes.forgetPassword, email, code);
};

module.exports = {
    verifyOtp,
    deleteDoc,
    forgotPassword
};
