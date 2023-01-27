const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new Schema({
	// mongodb will create a new id for each item
	name: String,
	genre: String,
	authorID: String,
})

module.exports = mongoose.model('Book', bookSchema)
