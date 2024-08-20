import { gql } from "@apollo/client";

export const LIST_ALL_MOVIES_QUERY = gql`
  query AllMovies {
    allMovies {
      nodes {
        id
        imgUrl
        movieDirectorId
        userCreatorId
        title
        releaseDate
        nodeId
        userByUserCreatorId {
          id
          name
          nodeId
        }
      }
    }
  }
`;

export const MOVIE_DETAIL_QUERY = gql`
  query GetMovieDetails($id: UUID!) {
    movieById(id: $id) {
      id
      imgUrl
      title
      releaseDate
      movieDirectorByMovieDirectorId {
        name
        age
      }
      movieReviewsByMovieId {
        nodes {
          id
          movieId
          nodeId
          title
          body
          rating
          userByUserReviewerId {
            id
            name
          }
        }
      }
    }
  }
`;

export const CURRENT_USER_QUERY = gql`
  query GetCurrentUser {
    currentUser {
      id
      name
    }
  }
`;
