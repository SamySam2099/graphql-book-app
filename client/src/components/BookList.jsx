import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { GET_BOOKS } from '../graphql-queries/queries'
import BookDetails from './BookDetails'

const BookList = () => {
  const { loading, error, data } = useQuery(GET_BOOKS)
  const [selected, setSelected] = useState(null)

  const displayData = data =>
    data.books.map(book => (
      <li
        key={book.id}
        onClick={e => {
          setSelected(book.id)
        }}
      >
        {book.name}
      </li>
    ))

  if (loading) return <p>Loading ...</p>

  if (error) return <p>Error : {error.message}</p>

  return (
    <div>
      <ul id='book-list'>{data && displayData(data)}</ul>
      {selected ? (
        <BookDetails bookID={selected} />
      ) : (
        <div>No book selected...</div>
      )}
    </div>
  )
}
export default BookList
