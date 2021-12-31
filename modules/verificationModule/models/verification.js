const mongoose = require("mongoose");
const _ = require("lodash");
const constants = require("../../../constants/constants")

const expireIn = process.env.verificationExpiresIn;
const types = _.values(constants.verificationTypes);
const purposes = _.values(constants.verificationPurposes);

const verificationSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true }, // random generated code
    type: { type: String, required: true, emum: types, lowercase: true },
    purpose: { type: String, required: true, emum: purposes, lowercase: true },
    value: { type: String, required: true, lowercase: true, trim: true },
    issuedAt: { type: Date, default: Date.now, expires: expireIn },
    verified: { type: Boolean, default: false, required: true }
});

module.exports = mongoose.model("Verification", verificationSchema);