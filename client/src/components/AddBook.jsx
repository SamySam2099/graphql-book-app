import { useMutation, useQuery } from '@apollo/client'
import { GET_AUTHORS, ADD_BOOK, GET_BOOKS } from '../graphql-queries/queries'
import { useState } from 'react'

const AddBook = () => {
  const [name, setName] = useState('')
  const [genre, setGenre] = useState('')
  const [authorID, setAuthorID] = useState('')

  const { loading, error, data } = useQuery(GET_AUTHORS)
  const [addBook, { newData }] = useMutation(ADD_BOOK)

  const displayAuthors = () => {
    if (loading) {
      return <option disabled>Loading Authors...</option>
    }
    return data.authors.map(author => (
      <option key={author.id} value={author.id}>
        {author.name}
      </option>
    ))
  }

  const submitForm = e => {
    e.preventDefault()
    addBook({
      variables: {
        name,
        genre,
        authorID,
      },
      refetchQueries: [{ query: GET_BOOKS }],
    })
  }
  return (
    <form id='add-book' onSubmit={submitForm}>
      <div className='field'>
        <label>Book name:</label>
        <input type='text' onChange={e => setName(e.target.value)} />
      </div>

      <div className='field'>
        <label>Genre:</label>
        <input type='text' onChange={e => setGenre(e.target.value)} />
      </div>

      <div className='field'>
        <label>Author:</label>
        <select onChange={e => setAuthorID(e.target.value)}>
          <option>Select author</option>
          {displayAuthors()}
        </select>
      </div>

      <button>+</button>
    </form>
  )
}
export default AddBook
