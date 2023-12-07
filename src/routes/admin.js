const express = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateFields');
const {
	uploadUser,
	createProduct,
	uploadProduct,
	deleteProduct,
	editProduct,
} = require('../controllers/admin.controllers');
const { validateJWT } = require('../middlewares/validateJWT');
const { validateFields } = require('../middlewares/validateFields');

//va a ser el nombre del router que definamos
const routerAdmin = express.Router();

routerAdmin.get('/uploaduser', validateJWT, uploadUser);

routerAdmin.post(
	'/new',
	[
		validateJWT,

		check('name', 'El nombre es obligatorio').not().isEmpty(),
		check('precio', 'Por favor ingrese un valor').not().isEmpty(),
		check('descripcion', 'la descripcion no es valida').isLength({
			min: 10,
		}),

		validateFields,
	],
	createProduct
);

routerAdmin.get('/uploadproduct', validateJWT, uploadProduct);

routerAdmin.delete('/delete/:id', validateJWT, deleteProduct);

routerAdmin.put('/edit', validateJWT, editProduct);

module.exports = routerAdmin;

