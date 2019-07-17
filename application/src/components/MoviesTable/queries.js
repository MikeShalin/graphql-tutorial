import { gql } from 'apollo-boost';

export const moviesQuery = gql`
  query MoviesQuery {
    movies {
      id
      name
      genre
      watched
      rate
      director {
        name
      }
    }
  }
`;