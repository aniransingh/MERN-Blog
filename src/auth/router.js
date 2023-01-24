const express = require("express");
const authRouter = express.Router();

const { register, login, reset } = require("./controllers");
const {commonLogin} = require("./middleware");

authRouter.post("/register", register);
authRouter.post("/login", commonLogin, login);
authRouter.post("/reset", commonLogin, reset);

module.exports = authRouter;
