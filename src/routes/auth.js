const express = require('express');
const { createUser, loginUser } = require('../controllers/auth.controllers');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateFields');

//va a ser el nombre del router que definamos
const routerAuth = express.Router();

routerAuth.post(
	'/createuser',
	[
		check('name', 'El nombre es obligatorio').not().isEmpty(),
		check('email', 'El email no es valido').not().isEmpty().isEmail(),
		check('password', 'la contraseña debe ser mayor a 5 caracteres').isLength({
			min: 5,
		}),

		validateFields,
	],
	createUser
);

routerAuth.post(
	'/login',
	[
		check('email', 'El email no es valido').not().isEmpty().isEmail(),
		check('password', 'la contraseña debe ser mayor a 5 caracteres').isLength({
			min: 5,
		}),
		validateFields,
	],

	loginUser
);


module.exports = routerAuth;
