const _ = require("lodash");
const ApiError = require("./apiError");
const errorCodes = require("./errorCodes");

module.exports = _.mapValues(errorCodes, (val, key) => {
    return message => new ApiError(message || val.message, val.status, key);
});
