const express = require("express");
const { loginUser } = require("../controllers/login.controllers");
const { validateFields } = require("../middlewares/validateFields");
const { check } = require("express-validator");

const routerLogin = express.Router();

routerLogin.post(
  "/login",
  [
    check("email", "E-mail o contraseña invalida")
      .not()
      .isEmpty()
      .isEmail()
      .isLength({
        mix: 35,
      }),
    check("password", "E-mail o contraseña invalida").not().isEmpty().isLength({
      min: 5,
      max: 20,
    }),

    ,
  ],
  loginUser
);

module.exports = routerLogin;
