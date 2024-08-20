import { Grid } from "@mui/material";
import type { NextPage } from "next";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector, appActions } from "../redux";
import Movie from "../components/Movie";
import { MovieType } from "../redux/types";

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.appState);
  const { fetchData } = state;
  useEffect(() => {
    dispatch(appActions.fetch());
  }, [dispatch]);

  const movies = fetchData?.allMovies?.nodes;

  return (
    <div>
      <div className="container mx-auto mt-10">
        <Grid container spacing={3}>
          {movies?.map((movie: MovieType) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
              <Movie
                imgUrl={movie.imgUrl}
                id={movie.id}
                title={movie.title}
                releaseDate={movie.releaseDate}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default Home;
