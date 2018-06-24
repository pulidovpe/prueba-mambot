const mongoose = require('mongoose');
const { Schema } = mongoose;

const state_opt = ["active","inactive"];
const lang_opt = ["english","spanish","french"];

const book_schema = new Schema({	
   title: {
		type: String,
		required: true,
		maxlength: [50,"Title too long"],
		minlength: [2,"Title too short"]
	},
	author: {
		type: String,
		required: true,
		maxlength: [30,"Name too long"],
		minlength: [2,"Name too short"]
   },
	language: {
		type: String,
		enum:{
			values: lang_opt,
			message:"Wrong choice"
		}
	},
	editorial: {
		type: String,
		maxlength: [30,"Editorial name too long"],
		minlength: [3,"Editorial name too short"]
	},
	state: {
		type: String,
		enum:{
			values: state_opt,
			message:"Wrong choice"
		}
	}
});

const Book = mongoose.model("Book",book_schema);

module.exports = Book;