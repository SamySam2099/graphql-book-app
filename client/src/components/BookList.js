import { gql, useQuery } from '@apollo/client'

const GET_BOOKS = gql`
  query GetBooksQuery {
    books {
      name
      id
    }
  }
`

const BookList = () => {
  const { loading, error, data } = useQuery(GET_BOOKS)
  const displayData = data =>
    data.books.map(book => <li key={book.id}>{book.name}</li>)

  if (loading) return <p>Loading ...</p>

  if (error) return <p>Error : {error.message}</p>

  return (
    <div>
      <ul id='book-list'>{data && displayData(data)}</ul>
    </div>
  )
}
export default BookList
