let _ = require("lodash");

const NUMERIC = "0123456789";


class Utility {

    static randomNumeric(length) {
        if (!_.isNumber(length) || length < 1) {
            throw new Error("length should be a non zero number.");
        }

        let random = [];
        for (let i = 0; i < length; i++) {
            random.push(NUMERIC[_.random(0, NUMERIC.length - 1)]);
        }

        return random.join("");
    }

}


module.exports = Utility;