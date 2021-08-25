const { cognitoIdentity } = require("../../services/cognito");

const CLIENT_ID = process.env.CLIENT_ID;

async function signUpUser(req, res) {
  const { email, password, name } = req.body;

  let attribueList = [];

  attribueList.push({
    Name: "name",
    Value: name,
  });
  attribueList.push({
    Name: "phone_number",
    Value: "",
  });
  attribueList.push({
    Name: "picture",
    Value: "",
  });

  const params = {
    ClientId: CLIENT_ID,
    Password: password,
    Username: email,
    UserAttributes: attribueList,
  };

  try {
    const data = await cognitoIdentity.signUp(params).promise();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(404).json(error);
  }
}

async function confirmRegistration(req, res) {
  const { email, code } = req.body;
  const params = {
    ClientId: CLIENT_ID,
    ConfirmationCode: code,
    Username: email,
  };

  try {
    const data = await cognitoIdentity.confirmSignUp(params).promise();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(404).json(error);
  }
}

async function resendCode(req, res) {
  const { email } = req.body;
  const params = {
    ClientId: CLIENT_ID,
    Username: email,
  };

  try {
    await cognitoIdentity.resendConfirmationCode(params).promise();
    return res.status(200).json("SUCCESS");
  } catch (error) {
    return res.status(404).json(error);
  }
}

async function signInUser(req, res) {
  const { email, password } = req.body;
  const params = {
    AuthFlow: "USER_PASSWORD_AUTH",
    ClientId: CLIENT_ID,
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
    },
  };

  try {
    const data = await cognitoIdentity.initiateAuth(params).promise();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(404).json(error);
  }
}

async function forgotPassword(req, res) {
  const { email } = req.body;
  const params = {
    ClientId: CLIENT_ID,
    Username: email,
  };

  try {
    const data = await cognitoIdentity.forgotPassword(params).promise();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(404).json(error);
  }
}

async function confirmForgotPassword(req, res) {
  const { email, ConfirmationCode, password } = req.body;

  const params = {
    ClientId: CLIENT_ID,
    ConfirmationCode: ConfirmationCode,
    Password: password,
    Username: email,
  };

  try {
    await cognitoIdentity.confirmForgotPassword(params).promise();
    return res.status(200).json("SUCCESS");
  } catch (error) {
    return res.status(404).json(error);
  }
}

async function getUser(req, res) {
  const { accessToken } = req.body;
  const params = {
    AccessToken: accessToken,
  };

  try {
    const data = await cognitoIdentity.getUser(params).promise();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(404).json(error);
  }
}

module.exports = {
  signUpUser,
  confirmRegistration,
  resendCode,
  signInUser,
  forgotPassword,
  confirmForgotPassword,
  getUser,
};
