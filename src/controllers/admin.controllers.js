const Product = require('../model/product-model');
const User = require('../model/user-model');

const uploadUser = async (req, res) => {
	try {
		const user = await User.find();

		res.status(200).json({
			msg: 'usuarios enviados',
			user,
		});
	} catch (error) {
		res.status(500).json({
			msg: 'Hable con el administrador',
		});
	}
};

const createProduct = async (req, res) => {
	try {
		const product = new Product(req.body);

		//guardar usuario en DB
		await product.save();

		res.status(201).json({
			msg: 'Producto Creado',
			product,
		});
	} catch (error) {
		res.status(500).json({
			msg: 'Hable con el administrador',
		});
	}
};

const uploadProduct = async (req, res) => {
	try {
		const product = await Product.find();

		res.status(200).json({
			msg: 'productos enviados',
			product,
		});
	} catch (error) {
		res.status(500).json({
			msg: 'Hable con el administrador',
		});
	}
};

const deleteProduct = async (req, res) => {
	try {
		const deleteProduct = await Product.findById(req.params.id);

		if (!deleteProduct) {
			return res.status(400).json({
				msg: 'no existe un producto con este ID',
			});
		}

		await Product.findByIdAndDelete(req.params.id);

		res.status(200).json({
			msg: 'producto Eliminado',
		});
	} catch (error) {
		res.status(500).json({
			msg: 'Hable con el administrador',
		});
	}
};

const editProduct = async (req, res) => {
	try {
		const editProduct = await Product.findById(req.body._id);

		if (!editProduct) {
			return res.status(400).json({
				msg: 'no existe un producto con este ID para editar',
			});
		}

		await Product.findByIdAndUpdate(req.body._id, req.body);

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
	uploadUser,
	createProduct,
	uploadProduct,
	deleteProduct,
	editProduct,
};
