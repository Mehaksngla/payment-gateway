const ApiError = require("./apiError");
const errors = require("./error");;
const _ = require("lodash");

/**
 * Express error handler middleware.
 * Should be the last middleware used.
 *
 * @param {Error|*} err Error value
 * @param {Request} req Express request
 * @param {Response} res Express response
 * @param {Function} next Next function
 */
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
    if (res.headersSent) {
    // end if headers have already been sent
        res.end();
    } else {
    // send error
        if (err instanceof ApiError) {
            // send API error
            err.send(res);
        } else {
            // send default API error
            let details = inspectDetail(err);
            errors.INTERNAL(details).send(res);
        }
    }
}
/**
 * Inspect err object and return related error detail if any.
 *
 * @param {*} err - error to inspect.
 * @return {Object} error details, or undefined.
 */
function inspectDetail(err) {
    // native mongo driver errors, forwarded by mongoose
    if (err instanceof Error && err.name === "MongoError" && err.driverm && (err.code === 11000)) {
        // unique index conflict
        return "Document already exists.";
    }

    // mongoose errors
    if ("MongooseError" === _.get(err, "constructor.name") && (err.name === "ValidationError") ) {
        const details = [];
        // schema validation failed
        extractMongooseValidationDetails(details, err.errors);
        return JSON.stringify(details);
    }

    // generic errors
    if (err instanceof Error && _.has(err, "message")) {
        return err.message;
    }

    // return default detail
    return "Unknown Error";
}
/**
 * Extract mongoose validation error tree to flat array.
 *
 * @param {Array} details - array to populate. Empty array for start.
 * @param {Object} errors - mongoose errors object.
 */
function extractMongooseValidationDetails(details, err) {
    // log path and message if exist
    if (_.isString(err.path) && _.isString(err.message)) {
        details.push({ path: err.path, message: err.message });
    }

    // recurse
    _.forOwn(err, e => {
        if ("MongooseError" === _.get(e, "constructor.name")) {
            extractMongooseValidationDetails(details, e);
        }
    });
}

module.exports = errorHandler;
