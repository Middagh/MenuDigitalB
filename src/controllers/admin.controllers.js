const Product = require('../model/product-model');
const User = require('../model/user-model');

//trae a los usuarios registrados del db
const getUser = async (req, res) => {
	try {
		const user = await User.find(); //busca al usuario

		res.status(200).json({
			msg: 'usuarios enviados',
			user, //envia efectivamente los usuarios
		});
	} catch (error) {
		res.status(500).json({
			msg: 'Hable con el administrador',
		});
	}
};
// eliminar producto
const deleteUser = async (req, res) => {
	try {
		const deletedUser = await User.findByIdAndDelete(req.params.id); // Utiliza User en lugar de Product

		if (!deletedUser) {
			return res.status(400).json({
				msg: 'No existe un usuario con este ID',
			});
		}

		res.status(200).json({
			msg: 'Usuario eliminado',
		});
	} catch (error) {
		res.status(500).json({
			msg: 'Hable con el administrador',
		});
	}
};

//creación del producto
const createProduct = async (req, res) => {
		try {
			const product = new Product(req.body);

			//guardar producto en DB
			await product.save();

			res.status(201).json({
				msg: 'Producto Creado',

			});
		} catch (error) {
			res.status(500).json({
				msg: 'Hable con el administrador',
			});
		}
	};
	// carga de todos los productos
	const getProduct = async (req, res) => {
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
	// eliminar producto
	const deleteProduct = async (req, res) => {
		try {
			const deleteProduct = await Product.findById(req.params.id); //findbyid busca lo que quiero eliminar

			if (!deleteProduct) {
				return res.status(400).json({
					msg: 'no existe un producto con este ID',
				});
			}

			await Product.findByIdAndDelete(req.params.id); //función que efectivamente elimina

			res.status(200).json({
				msg: 'producto Eliminado',
			});
		} catch (error) {
			res.status(500).json({
				msg: 'Hable con el administrador',
			});
		}
	};

	//modificar producto
	const editProduct = async (req, res) => {
		try {
			const editProduct = await Product.findById(req.body._id);

			if (!editProduct) {
				return res.status(400).json({
					msg: 'no existe un producto con este ID para editar',
				});
			}

			await Product.findByIdAndUpdate(req.body._id, req.body); //sintaxis con la que se hacen los cambios

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
		getUser,
		deleteUser,
		createProduct,
		getProduct,
		deleteProduct,
		editProduct,
	};
