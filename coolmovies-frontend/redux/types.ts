import { ApolloClient, NormalizedCacheObject } from "@apollo/client";

export type CreateStoreOptions = {
  epicDependencies?: EpicDependencies;
};

export type EpicDependencies = {
  client: ApolloClient<NormalizedCacheObject>;
};

export type UserType = {
  id: string;
  name: string;
  nodeId: string;
};

export type Review = {
  body: string;
  id: string;
  movieId: string;
  rating: number;
  title: string;
  userByUserReviewerId: {
    id: string;
    name: string;
  };
};

export type MovieType = {
  id: string;
  imgUrl: string;
  movieDirectorId: string;
  userCreatorId: string;
  title: string;
  releaseDate: string;
  nodeId: string;
  userByUserCreatorId?: UserType;
  movieDirectorByMovieDirectorId?: {
    name: string;
    age: string;
  };
  movieReviewsByMovieId: {
    nodes: Review[];
  };
};

export type MovieDetail = {
  movieById: MovieType;
};

export type MoviesResponse = { allMovies: { nodes: MovieType[] } };
export interface MovieDetailResponse {
  movieById: MovieType;
}

export type UserResponse = { currentUser: UserType };
export interface AppState {
  fetchData?: MoviesResponse;
  movieDetail?: MovieType;
  currentUser?: UserResponse["currentUser"];
  error?: string;
  movieReviewError?: string;
}
