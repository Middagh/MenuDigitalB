const express = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateFields');
const {getUser, createProduct, getProduct, deleteProduct, editProduct,} = require('../controllers/admin.controllers');
const { validateJWT } = require('../middlewares/validateJWT');

//va a ser el nombre del router que definamos
const routerAdmin = express.Router();

routerAdmin.get('/getuser', getUser);  //con esto traemos los usuarios de la DB para que este logeado el admin

routerAdmin.post(
	'/newproduct',
	[
		check('name', 'El nombre es obligatorio').not().isEmpty(),
		check('price', 'Por favor ingrese un valor').not().isEmpty(),
		check('description', 'la descripcion no es válida').isLength({
			min: 10,
		}),

		validateFields, //almacena errores 
	],
	createProduct
);

routerAdmin.get('/getproduct', getProduct);

routerAdmin.delete('/delete/:id', deleteProduct);

routerAdmin.put('/edit', editProduct); 

module.exports = routerAdmin;

