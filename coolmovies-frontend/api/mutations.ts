import { gql } from "@apollo/client";

export const CREATE_MOVIE_REVIEW_MUTATION = gql`
  mutation CreateMovieReview(
    $title: String!
    $movieId: UUID!
    $userReviewerId: UUID!
    $body: String!
    $rating: Int!
  ) {
    createMovieReview(
      input: {
        movieReview: {
          title: $title
          movieId: $movieId
          userReviewerId: $userReviewerId
          body: $body
          rating: $rating
        }
      }
    ) {
      movieReview {
        id
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
`;

export const UPDATE_MOVIE_REVIEW_MUTATION = gql`
  mutation UpdateMovieReviewById(
    $id: UUID!
    $movieReviewPatch: MovieReviewPatch!
  ) {
    updateMovieReviewById(
      input: { id: $id, movieReviewPatch: $movieReviewPatch }
    ) {
      movieReview {
        id
        title
        body
        rating
        userReviewerId
        movieId
      }
    }
  }
`;
