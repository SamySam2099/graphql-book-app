const mongoose = require('mongoose')
const Schema = mongoose.Schema

const authorSchema = new Schema({
	// mongodb will create a new id for each item
	name: String,
	age: Number,
})

module.exports = mongoose.model('Author', authorSchema)
