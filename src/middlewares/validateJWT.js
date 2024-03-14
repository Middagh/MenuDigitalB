const jwt = require('jsonwebtoken');

const validateJWT = (req, res, next) => {
	//x-token headers
	const token = req.header('x-token'); // el nombre x-token es a imaginacion de uno

	if (!token) {
		return res.status(401).json({
			msg: 'no hay token en la petición',
		});
	}

	try {
		const payload = jwt.verify(token, process.env.SECRET_JWT); // jwt.verify verifica mi token
		console.log(payload);
	} catch (error) {    
		 console.log('Token no válido:', error.message);
		return res.status(401).json({ // 401 es cuando el user no esta autorizado
			msg: 'token no válido',
		});
	}

	next();
};

module.exports = { validateJWT };
