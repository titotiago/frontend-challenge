import { gql } from "@apollo/client";
import { Epic, StateObservable } from "redux-observable";
import { Observable } from "rxjs";
import { filter, switchMap } from "rxjs/operators";
import { RootState } from "../../store";
import { EpicDependencies } from "../../types";
import { actions, SliceAction } from "./slice";
import {
  CURRENT_USER_QUERY,
  LIST_ALL_MOVIES_QUERY,
  MOVIE_DETAIL_QUERY,
} from "../../../api/queries";
import {
  CREATE_MOVIE_REVIEW_MUTATION,
  UPDATE_MOVIE_REVIEW_MUTATION,
} from "../../../api/mutations";

export const fetchMoviesEpic: Epic = (
  action$: Observable<SliceAction["fetch"]>,
  state$: StateObservable<RootState>,
  { client }: EpicDependencies
) =>
  action$.pipe(
    filter(actions.fetch.match),
    switchMap(async () => {
      try {
        const result = await client.query({
          query: LIST_ALL_MOVIES_QUERY,
        });
        return actions.loaded({ data: result.data });
      } catch (err) {
        return actions.loadError();
      }
    })
  );

export const fetchMovieDetailsEpic: Epic = (
  action$: Observable<SliceAction["fetchMovieDetails"]>,
  state$: StateObservable<RootState>,
  { client }: EpicDependencies
) =>
  action$.pipe(
    filter(actions.fetchMovieDetails.match),
    switchMap(async (action) => {
      const { nodeId } = action.payload;
      try {
        const result = await client.query({
          query: MOVIE_DETAIL_QUERY,
          variables: { id: nodeId },
        });
        return actions.movieDetailsLoaded(result.data);
      } catch (err) {
        return actions.loadError();
      }
    })
  );

export const fetchCurrentUserEpic: Epic = (
  action$: Observable<SliceAction["fetchCurrentUser"]>,
  state$: StateObservable<RootState>,
  { client }: EpicDependencies
) =>
  action$.pipe(
    filter(actions.fetchCurrentUser.match),
    switchMap(async () => {
      try {
        const result = await client.query({
          query: CURRENT_USER_QUERY,
        });
        return actions.setCurrentUser({ currentUser: result.data.currentUser });
      } catch (err) {
        return actions.loadError();
      }
    })
  );

export const createMovieReviewEpic: Epic = (
  action$: Observable<SliceAction["createMovieReview"]>,
  state$: StateObservable<RootState>,
  { client }: EpicDependencies
) =>
  action$.pipe(
    filter(actions.createMovieReview.match),
    switchMap(async (action) => {
      try {
        const { title, movieId, userReviewerId, body, rating } = action.payload;
        const result = await client.mutate({
          mutation: CREATE_MOVIE_REVIEW_MUTATION,
          variables: {
            title,
            movieId,
            userReviewerId,
            body,
            rating,
          },
        });

        const newReview = result.data.createMovieReview.movieReview;

        return actions.createMovieReviewSuccess({
          review: newReview,
        });
      } catch (err: any) {
        return actions.createMovieReviewFailure({ error: err.message });
      }
    })
  );

export const updateMovieReviewEpic: Epic = (
  action$: Observable<SliceAction["updateMovieReview"]>,
  state$: StateObservable<RootState>,
  { client }: EpicDependencies
) =>
  action$.pipe(
    filter(actions.updateMovieReview.match),
    switchMap(async (action) => {
      try {
        const { id, movieReviewPatch } = action.payload;
        const result = await client.mutate({
          mutation: UPDATE_MOVIE_REVIEW_MUTATION,
          variables: {
            id,
            movieReviewPatch,
          },
        });

        const updatedReview = result.data.updateMovieReviewById.movieReview;

        return actions.updateMovieReviewSuccess({
          review: updatedReview,
        });
      } catch (err: any) {
        return actions.updateMovieReviewFailure({ error: err.message });
      }
    })
  );
