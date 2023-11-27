const express = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');
const {
	cargarUsuarios,
	crearProducto,
	cargarProductos,
	eliminarProducto,
	editarProducto,
} = require('../controllers/admin.controllers');
const { validarJWT } = require('../middlewares/validarJWT');

//va a ser el nombre del router que definamos
const routerAdmin = express.Router();

routerAdmin.get('/cargarUsuario', validarJWT, cargarUsuarios);

routerAdmin.post(
	'/new',
	[
		validarJWT,

		check('name', 'El nombre es obligatorio').not().isEmpty(),
		check('precio', 'Por favor ingrese un valor').not().isEmpty(),
		check('descripcion', 'la descripcion no es valida').isLength({
			min: 10,
		}),

		validarCampos,
	],
	crearProducto
);

routerAdmin.get('/cargarProducto', validarJWT, cargarProductos);

routerAdmin.delete('/eliminar/:id', validarJWT, eliminarProducto);

routerAdmin.put('/editar', validarJWT, editarProducto);

module.exports = routerAdmin;

