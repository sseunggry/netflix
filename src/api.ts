export const API_KEY = "638a5ab366ad704653873a9973d1ac7d";
export const BASE_PATH = "https://api.themoviedb.org/3";

interface IMovie {
    id: number;
    backdrop_path: string;
    poster_path: string;
    overview: string;
    title?: string;
    name?: string;
    release_date?: string;
    vote_average?: number;
    original_title?: string;
}

export interface IGetMoviesResult {
    dates?: {
        maximum: string;
        minimum: string;
    };
    page: number;
    results: [IMovie];
    total_pages: number;
    total_results: number;
}

export interface IMovieProps {
    name: string;
    data: IGetMoviesResult;
}

export interface ITv {
    id: number;
    name: string;
    original_name: string;
    poster_path: string;
    vote_average: number;
    first_air_date: string;
    backdrop_path: string;
    overview: string;
}

export interface IGetTvResult {
    page: number;
    results: [ITv];
    total_pages: number;
    total_results: number;
}

export interface ITvProps{
    name: string;
    data: IGetTvResult;
}

// export interface IGetResult {
//     data: {
//         page: number;
//         results: [IMovie];
//         total_pages: number;
//         total_results: number;
//     },
//     isLoading: boolean;
// }

export function getMovies(sort: string) {
    return fetch(`${BASE_PATH}/movie/${sort}?api_key=${API_KEY}`).then(
        (response) => response.json()
    );
}

export function getMoviesNowPlay() {
    return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=ko`).then(
        (response) => response.json()
    );
}

export function getMoviesLatest() {
    return fetch(`${BASE_PATH}/movie/latest?api_key=${API_KEY}&language=ko`).then(
        (response) => response.json()
    )
}

export function getMoviesTopRated() {
    return fetch(`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}&language=ko`).then(
        (response) => response.json()
    )
}

export function getMoviesUpComing() {
    return fetch(`${BASE_PATH}/movie/upcoming?api_key=${API_KEY}&language=ko`).then(
        (response) => response.json()
    )
}

export function getSearch(keyword: string, category: string) {
    return fetch(`${BASE_PATH}/search/${category}?api_key=${API_KEY}&query=${keyword}&language=ko`).then(
        (response) => response.json()
    );
}

export function getTvLatest() {
    return fetch(`${BASE_PATH}/tv/latest?api_key=${API_KEY}&language=ko`).then(
        (response) => response.json()
    )
}

export function getTvAiring() {
    return fetch(`${BASE_PATH}/tv/airing_today?api_key=${API_KEY}&language=ko`).then(
        (response) => response.json()
    )
}

export function getTvPopular() {
    return fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}&language=ko`).then(
        (response) => response.json()
    )
}

export function getTvTopRated() {
    return fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}&language=ko`).then(
        (response) => response.json()
    )
}