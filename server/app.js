require('dotenv').config()

const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema/schema')
const cors = require('cors')

const app = express()
const PORT = 4000

//allow cross-origin request
app.use(cors())

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
)

app.listen(PORT, () => {
  console.log(`now listening for requests on port ${PORT}`)
})
