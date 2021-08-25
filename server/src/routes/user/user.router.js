const express = require("express");

const {
  signUpUser,
  confirmRegistration,
  resendCode,
  signInUser,
  forgotPassword,
  confirmForgotPassword,
  getUser,
} = require("./user.controller");

const userRouter = express.Router();

userRouter.post("/signup", signUpUser);
userRouter.post("/confirm", confirmRegistration);
userRouter.post("/resend-code", resendCode);
userRouter.post("/signin", signInUser);
userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/confirm-forgot-password", confirmForgotPassword);
userRouter.post("/", getUser);

module.exports = userRouter;
