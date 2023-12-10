const mongoose = require('mongoose');

const dbConnection = async () => {
	try {
		await mongoose.connect(process.env.DB_CNN); //DB_CNN proteje mi ruta de Mongo
		console.log('conectado a la base de datos');
	} catch (error) {
		console.log('Problemas con la conexión a la base de datos');
	}
};

module.exports = { dbConnection };
