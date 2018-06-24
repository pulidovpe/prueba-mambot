const mongoose = require('mongoose');
const { Schema } = mongoose;

const borrow_schema = new Schema({	
   user_id: {
		type: String,
      required: true
	},
	book_id: {
		type: String,
		required: true
   },
	date_borrowed: {
		type: Date,
		default: Date.now
	},
	date_due: Date
});

const Borrow = mongoose.model("Borrow",borrow_schema);

module.exports = Borrow;