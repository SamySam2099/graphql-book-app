import { gql } from '@apollo/client'

export const GET_AUTHORS = gql`
  query GetAuthorsQuery {
    authors {
      name
      id
    }
  }
`

export const GET_BOOKS = gql`
  query GetBooksQuery {
    books {
      name
      id
    }
  }
`
