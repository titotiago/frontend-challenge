import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AppState,
  MoviesResponse,
  MovieType,
  Review,
  UserResponse,
} from "../../types";

const initialState: AppState = {
  fetchData: undefined,
  movieDetail: undefined,
  error: undefined,
};

export const slice = createSlice({
  initialState,
  name: "appState",
  reducers: {
    fetch: () => {},
    fetchMovieDetails: (state, action: PayloadAction<{ nodeId: string }>) => {
      state.movieDetail = undefined;
      state.error = undefined;
    },
    clearData: (state) => {
      state.fetchData = undefined;
      state.movieDetail = undefined;
    },
    loaded: (state, action: PayloadAction<{ data: MoviesResponse }>) => {
      state.fetchData = action.payload.data;
    },
    movieDetailsLoaded: (
      state,
      action: PayloadAction<{ movieById: MovieType }>
    ) => {
      state.movieDetail = action.payload.movieById;
    },
    loadError: (state) => {
      state.error = "Error Fetching :(";
    },
    movieDetailsLoadError: (state) => {
      state.error = "Error Fetching Movie Details :(";
    },
    fetchCurrentUser: (state) => {},
    setCurrentUser: (state, action: PayloadAction<UserResponse>) => {
      state.currentUser = action.payload.currentUser;
    },
    createMovieReview: (
      state,
      action: PayloadAction<{
        title: string;
        movieId: string;
        userReviewerId: string;
        body: string;
        rating: number;
      }>
    ) => {},
    createMovieReviewSuccess: (
      state,
      action: PayloadAction<{
        review: Review;
      }>
    ) => {
      if (state.movieDetail) {
        state.movieDetail.movieReviewsByMovieId.nodes = [
          ...state.movieDetail.movieReviewsByMovieId.nodes,
          action.payload.review,
        ];
      }
    },
    createMovieReviewFailure: (
      state,
      action: PayloadAction<{ error: string }>
    ) => {
      state.movieReviewError = action.payload.error;
    },
    updateMovieReview: (
      state,
      action: PayloadAction<{
        id: string;
        movieReviewPatch: {
          id?: string;
          title: string;
          body: string;
          rating: number;
          movieId?: string;
          userReviewerId?: string;
        };
      }>
    ) => {},
    updateMovieReviewSuccess: (
      state,
      action: PayloadAction<{
        review: Review;
      }>
    ) => {
      if (state.movieDetail) {
        const index = state.movieDetail.movieReviewsByMovieId.nodes.findIndex(
          (r) => r.id === action.payload.review.id
        );
        if (index !== -1) {
          state.movieDetail.movieReviewsByMovieId.nodes[index] = {
            ...state.movieDetail.movieReviewsByMovieId.nodes[index],
            ...action.payload.review,
          };
        }
      }
    },
    updateMovieReviewFailure: (
      state,
      action: PayloadAction<{ error: string }>
    ) => {
      state.movieReviewError = action.payload.error;
    },
  },
});

export const { actions } = slice;
export type SliceAction = typeof actions;
export default slice.reducer;
