const jwt = require('jsonwebtoken');

const validateJWT = (req, res, next) => {
	//x-token headers
	const token = req.header('x-token');

	if (!token) {
		return res.status(401).json({
			msg: 'no hay token en la peticion',
		});
	}

	try {
		const payload = jwt.verify(token, process.env.SECRET_JWT);
		console.log(payload);
	} catch (error) {
		return res.status(401).json({
			msg: 'token no valido',
		});
	}

	next();
};

module.exports = {
	validateJWT,
};
