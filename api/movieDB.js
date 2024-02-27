import axios from "axios";
import { token } from "../constants";

// endpoints
const BASE_URL = "https://api.themoviedb.org/3";
const trendingMoviesEndpoint = `${BASE_URL}/trending/movie/day`;
const upcomingMovesEndpoint = `${BASE_URL}/movie/upcoming`;
const topRatedMovesEndpoint = `${BASE_URL}/movie/top_rated`;
const searchEndpoint = `${BASE_URL}/search/movie`;

// dynamic endpoints
const movieDetailsEndpoint = (id) => `${BASE_URL}/movie/${id}`;
const movieCreditsEndpoint = (id) => `${BASE_URL}/movie/${id}/credits`;
const similarMoviesEndpoint = (id) => `${BASE_URL}/movie/${id}/similar`;
const personDetailsEndpoint = (id) => `${BASE_URL}/person/${id}`;
const personMoviesEndpoint = (id) => `${BASE_URL}/person/${id}/movie_credits`;

export const image500 = (path) =>
  path ? `https://image.tmdb.org/t/p/w500/${path}` : null;

export const image342 = (path) =>
  path ? `https://image.tmdb.org/t/p/w342/${path}` : null;

export const image185 = (path) =>
  path ? `https://image.tmdb.org/t/p/w185/${path}` : null;

export const fallbackMoviePoster =
  "https://eapp.org/wp-content/uploads/2018/05/poster_placeholder.jpg";

const apiCall = async (endpoint, params) => {
  const options = {
    method: "GET",
    url: endpoint,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    params: params ? params : {},
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (err) {
    console.log(err);
    return {};
  }
};

export const fetchTrendingMovies = () => {
  return apiCall(trendingMoviesEndpoint);
};
export const fetchUpcomingMovies = () => {
  return apiCall(upcomingMovesEndpoint);
};
export const fetchTopRatedMovies = () => {
  return apiCall(topRatedMovesEndpoint);
};

export const fetchMovieDetails = (id) => {
  return apiCall(movieDetailsEndpoint(id));
};

export const fetchMovieCredits = (id) => {
  return apiCall(movieCreditsEndpoint(id));
};

export const fetchSimilarMovies = (id) => {
  return apiCall(similarMoviesEndpoint(id));
};

export const fetchPersonDetails = (id) => {
  return apiCall(personDetailsEndpoint(id));
};

export const fetchPersonMovies = (id) => {
  return apiCall(personMoviesEndpoint(id));
};

export const fetchSearchMovies = (params) => {
  return apiCall(searchEndpoint, params);
};
