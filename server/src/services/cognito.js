const AWS = require("aws-sdk");

const config = {
  region: process.env.POOL_REGION,
};

const cognitoIdentity = new AWS.CognitoIdentityServiceProvider(config);

module.exports = { cognitoIdentity };
