const User = require('../model/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
	const { name, email, password } = req.body;

	try {
		//validar si el email del usuario existe en la base de datos, chequea 
		let user = await User.findOne({ email });

		if (user) {
			return res.status(400).json({
				msg: 'El email que intenta registrase ya existe',
			});
		}

		user = new User(req.body); // comienza la acción de un nuevo usuario para crearse

		//encriptar contraseña
		const salt = bcrypt.genSaltSync(10);
		user.password = bcrypt.hashSync(password, salt);

		//guardar usuario en DB
		await user.save();

		//generar Token
		const payload = {
			name: user.name,
			id: user._id,
		};

		const token = jwt.sign(payload, process.env.SECRET_JWT, {
			expiresIn: '30d',
		});

		res.status(201).json({
			msg: 'Usuario Registrado',
			token,
		});
	} catch (error) {
		res.status(500).json({
			msg: 'Hable con el administrador',
		});
	}
};

const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;

		//validacion si existe el usuario
		let user = await User.findOne({ email });

		//si el usuario no existe
		if (!user) {
			return res.status(400).json({
				msg: 'El Email o la contraseña es incorrectas',
			});
		}

		//confirmar contraseñas
		const validatePassword = bcrypt.compareSync(password, user.password);

		if (!validatePassword) {
			res.status(400).json({
				msg: 'El email o la contraseña es incorrectos',
			});
		}

		//generar Token
		const payload = {
			name: user.name,
			id: user._id,
		};

		const token = jwt.sign(payload, process.env.SECRET_JWT, {
			expiresIn: '7h',
		});

		res.status(200).json({
			msg: 'Usuario logueado',
			token,
		});
	} catch (error) {
		res.status(500).json({
			msg: 'Hable con el administrador',
		});
	}
};

module.exports = {
	createUser,
	loginUser,
};
