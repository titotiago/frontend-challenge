import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import React, { useMemo } from "react";
import { Provider as ReduxProvider } from "react-redux";
import Head from "next/head";
import { createStore } from "../redux";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { CircularProgress, Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material";
import useThemeToggle from "../hooks/useThemeToggle";
import Navbar from "../components/Navbar";
import { ToastContainer } from "react-toastify";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "/graphql",
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { mode, toggleTheme } = useThemeToggle();

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          background: {
            default: mode === "dark" ? "#171717" : "#ffffff",
          },
          text: {
            primary: mode === "dark" ? "#ffffff" : "#171717",
          },
        },
        typography: {
          fontFamily: "Roboto, sans-serif",
        },
      }),
    [mode]
  );

  const store = useMemo(
    () => createStore({ epicDependencies: { client } }),
    []
  );

  if (!store) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Coolmovies Frontend</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <ReduxProvider store={store}>
        <ToastContainer />
        <Navbar />
        <Component {...pageProps} toggleTheme={toggleTheme} />
      </ReduxProvider>
    </ThemeProvider>
  );
};

export default MyApp;
