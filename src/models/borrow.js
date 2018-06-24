const mongoose = require('mongoose');
const { Schema } = mongoose;

const Book = require('./book');
const book = mongoose.model('Book');
const User = require('./user');
const user = mongoose.model('User');

const state_opt = ["current","expired"];

const borrow_schema = new Schema({	
   user_id: { 
		type: Schema.ObjectId, 
		ref: "user", 
		required: true 
	},
	book_id: { 
		type: Schema.ObjectId, 
		ref: "book", 
		required: true 
	},
	date_borrowed: {
		type: Date,
		default: Date.now
	},
	date_due: Date,
	state: {
		type: String,
		default: 'current',
		enum:{
			values: state_opt,
			message:"Wrong choice"
		}
	}
});

const Borrow = mongoose.model("Borrow",borrow_schema);

module.exports = Borrow;