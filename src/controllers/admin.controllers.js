const Producto = require('../model/producto-model');
const Usuarios = require('../model/usuario-model');

const cargarUsuarios = async (req, res) => {
	try {
		const usuarios = await Usuarios.find();

		res.status(200).json({
			msg: 'usuarios enviados',
			usuarios,
		});
	} catch (error) {
		res.status(500).json({
			msg: 'Hable con el administrador',
		});
	}
};

const crearProducto = async (req, res) => {
	try {
		const producto = new Producto(req.body);

		//guardar usuario en DB
		await producto.save();

		res.status(201).json({
			msg: 'Producto Creado',
			producto,
		});
	} catch (error) {
		res.status(500).json({
			msg: 'Hable con el administrador',
		});
	}
};

const cargarProductos = async (req, res) => {
	try {
		const productos = await Producto.find();

		res.status(200).json({
			msg: 'productos enviados',
			productos,
		});
	} catch (error) {
		res.status(500).json({
			msg: 'Hable con el administrador',
		});
	}
};

const eliminarProducto = async (req, res) => {
	try {
		const productoEliminar = await Producto.findById(req.params.id);

		if (!productoEliminar) {
			return res.status(400).json({
				msg: 'no existe un producto con este ID',
			});
		}

		await Producto.findByIdAndDelete(req.params.id);

		res.status(200).json({
			msg: 'producto Eliminado',
		});
	} catch (error) {
		res.status(500).json({
			msg: 'Hable con el administrador',
		});
	}
};

const editarProducto = async (req, res) => {
	try {
		const productoEditar = await Producto.findById(req.body._id);

		if (!productoEditar) {
			return res.status(400).json({
				msg: 'no existe un producto con este ID para editar',
			});
		}

		await Producto.findByIdAndUpdate(req.body._id, req.body);

		res.status(200).json({
			msg: 'producto Editado',
		});
	} catch (error) {
		res.status(500).json({
			msg: 'Hable con el administrador',
		});
	}
};

module.exports = {
	cargarUsuarios,
	crearProducto,
	cargarProductos,
	eliminarProducto,
	editarProducto,
};
