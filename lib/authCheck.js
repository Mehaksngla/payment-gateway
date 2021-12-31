const util = require("util");
const jwt = require("jsonwebtoken");
const errors = require('../lib/error');

async function generateToken(userId, expiresIn) {
    const sign = util.promisify(jwt.sign);
    const options = {};
    const authSecret = process.env.authTokenSecret;
    options["expiresIn"] = expiresIn;

    return sign({
        data: {
            userId: userId
        }
        
    },
    authSecret,
    options 
    );
}

async function verifyAuthToken(authToken) {
    const verify = util.promisify(jwt.verify),
        authSecret = process.env.authTokenSecret;
    try {
        return verify(authToken, authSecret);
    } catch (e) {
        const detail =
            e.name == "TokenExpiredError" ?
                "Token is expired." :
                "Auth token is invalid.";
        throw errors.UNAUTHORIZED(detail);
    }
}



module.exports = {
    generateToken,
    verifyAuthToken
};