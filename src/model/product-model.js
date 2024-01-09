const { Schema, model } = require('mongoose');

const productSchema = Schema({
	name: {
		type: String,
		required: true,
	},

	price: {
		type: Number,
		required: true,
	},

	description: {
		type: String,
		required: true,
	},
});

module.exports = model('Product', productSchema);
