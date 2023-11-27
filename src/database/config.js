const mongoose = require('mongoose');

const dbConnection = async () => {
	try {
		await mongoose.connect(process.env.DB_CNN);

		console.log('conectado a la base de datos');
	} catch (error) {
		console.log('Prolemas con la conexion a la base de datos');
	}
};

module.exports = { dbConnection };
