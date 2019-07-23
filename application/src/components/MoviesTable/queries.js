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

export const filterMovies = gql`
  query filterMovies($name: String) {
    filterMovies(name: $name){
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
`