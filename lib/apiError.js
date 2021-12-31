class ApiError extends Error {
    constructor(message, status, code) {
        super(message);
        this._status = status;
        this._code = code;
    }

    send(res) {
        res.status(this._status || 500);
        res.json({
            isError: true,
            code: this._code || "INTERNAL_ERROR",
            message: this.message
        });
    }
    get() {
        return {
            isError: true,
            status: this._status || 500,
            code: this._code || "INTERNAL_ERROR",
            message: this.message
        };
    }
}

module.exports =  ApiError;