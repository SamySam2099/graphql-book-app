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
  query {
    books {
      name
      id
    }
  }
`

export const GET_BOOK = gql`
  query ($id: ID) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
          name
          id
        }
      }
    }
  }
`

export const ADD_BOOK = gql`
  mutation ($name: String!, $genre: String!, $authorID: ID!) {
    addBook(name: $name, genre: $genre, authorID: $authorID) {
      name
      id
    }
  }
`
