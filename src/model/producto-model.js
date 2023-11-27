const { Schema, model } = require('mongoose');

const productoSchema = Schema({
	name: {
		type: String,
		required: true,
	},

	precio: {
		type: Number,
		required: true,
	},

	descripcion: {
		type: String,
		required: true,
	},
});

module.exports = model('Productos', productoSchema);
