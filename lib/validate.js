const _ = require("lodash");
const tv4 = require("tv4");
const errors = require("./error");

tv4.addFormat(require("./tv4formats.js"));

module.exports = function validate(data, schema) {

    const result = tv4.validateResult(data, schema, false, false);

    if (result.valid) {
        return;
    }

    let message;
    if (_.has(result.error, "dataPath") && result.error.dataPath.length) {
        message = `${result.error.message} at ${result.error.dataPath}`;
    } else {
        message = result.error.message;
    }

    throw errors.INVALID_INPUT(message);
};