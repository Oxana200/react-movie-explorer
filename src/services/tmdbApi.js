import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NzEwOWFiNTE3OWE1ODdhZDViN2YxYmE1YjZiMTJkZCIsIm5iZiI6MTc0NTAwMTA0My42NDksInN1YiI6IjY4MDI5YTUzZjM5YzczMDEyNWQ5YTkxZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6RnInBshTLR1Fbrp9qyimUfNs7F_7NiBFhDL_Fv5r74';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: API_TOKEN,
    },
});

export async function fetchTrendingMovies() {
    const response = await axiosInstance.get('/trending/movie/day');
    return response.data;
}

export async function fetchMoviesByQuery(query) {
    const response = await axiosInstance.get('/search/movie', {
        params: {
            query,
            include_adult: false,
            language: 'en-US',
            page: 1,
        },
    });
    return response.data;
}

export async function fetchMovieDetails(movieId) {
    const response = await axiosInstance.get(`/movie/${movieId}`, {
        params: {
            language: 'en-US',
        },
    });
    return response.data;
}

export async function fetchMovieCredits(movieId) {
    const response = await axiosInstance.get(`/movie/${movieId}/credits`, {
        params: {
            language: 'en-US',
        },
    });
    return response.data;
}

export async function fetchMovieReviews(movieId) {
    const response = await axiosInstance.get(`/movie/${movieId}/reviews`, {
        params: {
            language: 'en-US',
        },
    });
    return response.data;
}
