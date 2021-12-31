const email = require("../utils/email");
const sendResetLink = async (template, to, substitutions)=> {
    await email({
        template:template,
        destination: to,
        data:substitutions
    });
    return ; 
};
module.exports = {
    sendResetLink
};