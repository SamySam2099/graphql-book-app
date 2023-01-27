const graphql = require('graphql')
const _ = require('lodash')
const mongoose = require('mongoose')
const Book = require('../models/book')
const Author = require('../models/author')

// connect to mongodb atlas database
const { MONGO_DB_USERNAME, MONGO_DB_PASSWORD } = process.env
const uri = `mongodb+srv://${MONGO_DB_USERNAME}:${MONGO_DB_PASSWORD}@graphql-sam.uju4o2i.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(uri, { useNewUrlParser: true })
mongoose.connection
	.once('open', () => {
		console.log('connected to db')
	})
	.on('error', (error) => {
		console.log(error.message)
	})

const {
	GraphQLObjectType,
	GraphQLSchema,
	GraphQLString,
	GraphQLID,
	GraphQLInt,
	GraphQLList,
} = graphql

const BookType = new GraphQLObjectType({
	name: 'Book',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		genre: { type: GraphQLString },
		author: {
			type: AuthorType,
			resolve(parent, args) {
				//return _.find(authors, { id: parent.authorID })
			},
		},
	}),
})

const AuthorType = new GraphQLObjectType({
	name: 'Author',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		age: { type: GraphQLInt },
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				//return _.filter(books, { authorID: parent.id })
			},
		},
	}),
})

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		book: {
			type: BookType,
			args: {
				id: {
					type: GraphQLID,
				},
			},
			resolve(parent, args) {
				// code to get data from db/other source
				//return _.find(books, { id: args.id })
			},
		},
		author: {
			type: AuthorType,
			args: {
				id: {
					type: GraphQLID,
				},
			},
			resolve(parent, args) {
				// code to get data from db/other source
				//return _.find(authors, { id: args.id })
			},
		},
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				//return books
			},
		},
		authors: {
			type: new GraphQLList(AuthorType),
			resolve(parent, args) {
				//return authors
			},
		},
	},
})

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addAuthor: {
			type: AuthorType,
			args: {
				name: { type: GraphQLString },
				age: { type: GraphQLInt },
			},
			resolve(parent, args) {
				let author = new Author({
					name: args.name,
					age: args.age,
				})
				return author.save()
			},
		},

		addBook: {
			type: BookType,
			args: {
				name: { type: GraphQLString },
				genre: { type: GraphQLString },
				authorID: { type: GraphQLID },
			},
			resolve(parent, args) {
				let book = new Book({
					name: args.name,
					genre: args.genre,
					authorID: args.authorID,
				})
				return book.save()
			},
		},
	},
})

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation,
})
