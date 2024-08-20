export { actions as appActions } from "./slice";
export { default as appReducer } from "./slice";
import { combineEpics } from "redux-observable";
import {
  fetchMoviesEpic,
  fetchMovieDetailsEpic,
  fetchCurrentUserEpic,
  createMovieReviewEpic,
  updateMovieReviewEpic,
} from "./epics";

export const appEpics = combineEpics(
  fetchMoviesEpic,
  fetchMovieDetailsEpic,
  fetchCurrentUserEpic,
  createMovieReviewEpic,
  updateMovieReviewEpic
);
