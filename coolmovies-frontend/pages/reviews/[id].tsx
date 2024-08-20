import {
  Box,
  CircularProgress,
  Typography,
  Paper,
  Divider,
} from "@mui/material";
import type { NextPage, GetServerSideProps } from "next";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux";
import { appActions } from "../../redux";
import Image from "next/image";
import { getYearFromDate } from "../../utils/dateFormat";
import AddReviewForm from "../../components/AddReviewForm";
import { ToastContainer, toast } from "react-toastify";
import Review from "../../components/Review";

interface MovieDetailProps {
  id: string;
}

const MovieDetail: NextPage<MovieDetailProps> = ({ id }) => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.appState);
  const { movieDetail, error, movieReviewError, currentUser } = state;

  const movieReviews = movieDetail?.movieReviewsByMovieId.nodes;

  useEffect(() => {
    if (id) {
      dispatch(appActions.fetchMovieDetails({ nodeId: id }));
      dispatch(appActions.fetchCurrentUser());
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (movieReviewError) {
      toast.error(`Error: ${movieReviewError}`);
    }
  }, [movieReviewError]);

  const movie = movieDetail;

  if (!movieDetail && !error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error || !movie) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100"
      >
        <Typography variant="h6">Movie not found</Typography>
      </Box>
    );
  }

  return (
    <Box className="p-4 bg-gray-100 dark:bg-primary text-gray-800 dark:text-gray-100 rounded rounded-xl">
      <Box className="lg:flex md:block gap-4">
        <Paper className="relative lg:w-[40%] min-h-[500px] max-h-[800px] mb-4 md:w-full rounded-xl">
          <Image
            src={movie.imgUrl}
            alt={`${movie.title} poster`}
            fill
            className="rounded-xl object-cover object-top"
          />
          <Box className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-4 text-white rounded-b-xl">
            <Typography variant="h3" gutterBottom>
              {movie.title}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {getYearFromDate(movie.releaseDate)}
            </Typography>
            <Typography variant="body2">
              Directed by: {movie.movieDirectorByMovieDirectorId?.name} (Age:{" "}
              {movie.movieDirectorByMovieDirectorId?.age})
            </Typography>
          </Box>
        </Paper>
        <Box className="flex-1">
          <Typography variant="h5" gutterBottom>
            Reviews
          </Typography>

          <Divider className="mb-2 bg-gray-300 dark:bg-gray-700" />

          {movieReviews && movieReviews?.length > 0 ? (
            movieReviews.map((review) => (
              <Review
                id={review.id}
                key={review.id}
                title={review.title}
                body={review.body}
                rating={review.rating}
                reviewerName={review.userByUserReviewerId.name}
                isUserReview={
                  currentUser?.id === review.userByUserReviewerId.id
                }
                movieId={review.movieId}
              />
            ))
          ) : (
            <Typography>No reviews available</Typography>
          )}
        </Box>
      </Box>
      <AddReviewForm movieId={id} />
      <ToastContainer />
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  return {
    props: {
      id: id as string,
    },
  };
};

export default MovieDetail;
