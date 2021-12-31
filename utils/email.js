const aws = require("aws-sdk");
const _ = require("lodash");

const sesSource = process.env.sesSource;
const config = {
    accessKeyId:process.env.accessId,
    secretAccessKey:process.env.accessSecret,
    region
};
aws.config = config;

const ses = new aws.SES();

module.exports = async emailParams => {
    const params = {
        Source: sesSource,
        Template: emailParams.template
    };

    if(_.isArray(emailParams.to) && _.isArray(emailParams.data)){
        params["Destinations"] = _.zipWith(emailParams.to,emailParams.data,(t,d)=>({ToAddress:[t],ReplacementTemplateData:JSON.stringify(d)}));
        return ses.sendBulkTemplatedEmail(params).promise();
    }

    else if(!_.isArray(emailParams.data)){
        params["Destination"]={
            ToAddresses: _.isArray(emailParams.destination) ? emailParams.destination : [emailParams.destination]
        };
        params["TemplateData"] = JSON.stringify(emailParams.data);
    }

    const response =await ses.sendTemplatedEmail(params).promise();
    return response;   
};