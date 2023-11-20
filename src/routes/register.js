const express = require("express");
const { accountCreation } = require("../controllers/register.controllers");
const { validateFields } = require("../middlewares/validateFields");
const { check } = require("express-validator");
const { validarJWT } = require("../middlewares/validarJWT");

const routerRegister = express.Router();

routerRegister.post(
  "/register",
  [
    validarJWT,
    check("firstName", "Nombre inválido.").not().isEmpty().isLength({
      min: 2,
      max: 24,
    }),
    check("lastName", "Apellido inválido.").not().isEmpty().isLength({
      min: 2,
      max: 24,
    }),
    check("phone", "Número de teléfono inválido.").not().isEmpty().isLength({
      min: 9,
      max: 10,
    }),
    check("email", "E-mail no válido.").not().isEmpty().isEmail().isLength({
      max: 35,
    }),
    check("password", "Contraseña inválida").not().isEmpty().isLength({
      min: 5,
      max: 20,
    }),

    validateFields,
  ],
  accountCreation
);

module.exports = routerRegister;
