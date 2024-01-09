const { Schema, model } = require('mongoose');

const userSchema = Schema({
	name: {
		type: String,
		required: true,
	},

	email: {
		type: String,
		required: true,
		unique: true,
	},

	password: {
		type: String,
		required: true,
	},

	rol: {
		type: String,
		default: 'user',
	},
	
	status: {
        type: String,
        default: 'active',
    },
});

module.exports = model('User', userSchema);

