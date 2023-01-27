import { useQuery } from '@apollo/client'
import { GET_BOOK } from '../graphql-queries/queries'

const BookDetails = ({ bookID }) => {
  const { loading, data } = useQuery(GET_BOOK, {
    variables: { id: bookID },
  })
  let display
  if (loading) {
    display = <div>Loading ...</div>
  } else {
    const { name, genre, author } = data.book
    display = (
      <div>
        <h2>{name}</h2>
        <p>{genre}</p>
        <p>{author.name}</p>
        <p>All books by this author:</p>
        <ul className='other-books'>
          {author.books.map(item => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </div>
    )
  }
  return <div id='book-details'>{display}</div>
}
export default BookDetails
