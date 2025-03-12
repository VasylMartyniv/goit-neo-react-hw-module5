import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const BASE_IMG_URL = "https://image.tmdb.org/t/p/w500/";
const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ODcyNzUzNjJiNDViYWU5ZmNhODBkOTExM2E0MzcwYSIsIm5iZiI6MTc0MTgxMTg0NC4xOTgwMDAyLCJzdWIiOiI2N2QxZjA4NDY2ODkyYmFkNjI4MTgyNGEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.AZzhbEChVwi7T63jaJS_R83dRL449f9ZnYmR86xvZC4";

axios.defaults.baseURL = BASE_URL;

const headers = {
  Authorization: `Bearer ${API_KEY}`,
};

const options = {
  headers: headers,
};

export async function fetchTending() {
  try {
    const response = await axios.get("/trending/movie/day", options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchMovieDetails(movieId) {
  try {
    const response = await axios.get(
      `/movie/${movieId}?language=en-US`,
      options,
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchCast(movieId) {
  try {
    const response = await axios.get(
      `/movie/${movieId}/credits?language=en-US`,
      options,
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchReviews(movieId) {
  try {
    const response = await axios.get(
      `/movie/${movieId}/reviews?language=en-US`,
      options,
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function findMovies(query) {
  try {
    const response = await axios.get(`/search/movie`, {
      params: {
        include_adult: false,
        language: "en-US",
        page: 1,
        query: query,
      },
      headers: headers,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export function getImgURL(id) {
  return BASE_IMG_URL + id;
}
