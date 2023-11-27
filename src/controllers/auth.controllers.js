const Usuarios = require('../model/usuario-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const crearUsuario = async (req, res) => {
	const { name, email, password } = req.body;

	try {
		//validar si el email del usuario existe en la base de datos
		let usuario = await Usuarios.findOne({ email });

		if (usuario) {
			return res.status(400).json({
				msg: 'El email que intenta registrase ya existe',
			});
		}

		usuario = new Usuarios(req.body);

		//encriptar contraseña
		const salt = bcrypt.genSaltSync(10);
		usuario.password = bcrypt.hashSync(password, salt);

		//guardar usuario en DB
		await usuario.save();

		//generar Token
		const payload = {
			name: usuario.name,
			id: usuario._id,
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

const loginUsuario = async (req, res) => {
	try {
		const { email, password } = req.body;

		//validacion si existe el usuario
		let usuario = await Usuarios.findOne({ email });

		//si el usuario no existe
		if (!usuario) {
			return res.status(400).json({
				msg: 'El Email o la contraseña es incorrectas',
			});
		}

		//confirmar contraseñas
		const validarPassword = bcrypt.compareSync(password, usuario.password);

		if (!validarPassword) {
			res.status(400).json({
				msg: 'El email o la contraseña es incorrectos',
			});
		}

		//generar Token
		const payload = {
			name: usuario.name,
			id: usuario._id,
		};

		const token = jwt.sign(payload, process.env.SECRET_JWT, {
			expiresIn: '30d',
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
	crearUsuario,
	loginUsuario,
};
