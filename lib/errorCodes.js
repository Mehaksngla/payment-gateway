module.exports = {
    ALREADY_REGISTERED: {
        code: "ALREADY_REGISTERED",
        status: 400,
        message: "User already registered."
    },
    USERNAME_ALREADY_REGISTERED: {
        code: "USERNAME_ALREADY_REGISTERED",
        status: 400,
        message: "Username already exists"
    },
    INVALID_INPUT: {
        code: "INVALID_INPUT",
        status: 400,
        message: "Invalid input in request."
    },
    INVALID_LOGIN: {
        code: "INVALID_LOGIN",
        status: 401,
        message: "Login credentials do not match any registered user."
    },
    UNAUTHORIZED: {
        code: "UNAUTHORIZED",
        status: 401,
        message: "Unauthorized access."
    },
    INTERNAL: {
        code: "INTERNAL",
        status: 500,
        message: "Internal server error."
    },
    USER_NOT_FOUND: {
        code: "USER_NOT_FOUND",
        status: 400,
        message: "User not found."
    },
    RESET_PASSWORD_LINK_ERROR:{
        code : "RESET_PASSWORD_LINK_ERROR",
        status : 400,
        message : "reset password link error"
    }
};