const _ = require("lodash");
const mongoose = require("mongoose");

const REGEX_EMAIL= /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

module.exports = {

    nonEmptyOrBlank: data => {
        return data.length > 0 && !/^\s+$/.test(data)
            ? null
            : "Should not be empty or blank.";
    },

    email: data => {
        return REGEX_EMAIL.test(data) ? null : "Should be a valid email";
    }
};
