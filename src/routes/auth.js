const express = require('express');
const { crearUsuario, loginUsuario } = require('../controllers/auth.controllers');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');

//va a ser el nombre del router que definamos
const routerAuth = express.Router();

routerAuth.post(
	'/crearUsuario',
	[
		check('name', 'El nombre es obligatorio').not().isEmpty(),
		check('email', 'El email no es valido').not().isEmpty().isEmail(),
		check('password', 'la contraseña debe ser mayor a 5 caracteres').isLength({
			min: 5,
		}),

		validarCampos,
	],
	crearUsuario
);

routerAuth.post(
	'/login',
	[
		check('email', 'El email no es valido').not().isEmpty().isEmail(),
		check('password', 'la contraseña debe ser mayor a 5 caracteres').isLength({
			min: 5,
		}),
		validarCampos,
	],

	loginUsuario
);

module.exports = routerAuth;
