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

export interface IDataProps {
    name: string;
    data: IGetDataResult;
}

export interface IGetDataResult {
    dates?: {
        maximum: string;
        minimum: string;
    };
    page: number;
    results: [IData];
    total_pages: number;
    total_results: number;
}

interface IData {
    id: number;
    backdrop_path: string;
    poster_path: string;
    overview: string;
    title?: string;
    name?: string;
    release_date?: string;
    vote_average?: number;
    original_title?: string;
    original_name?: string;
    first_air_date?: string;
}

export function getData(kind: string, sort: string) {
    return fetch(`${BASE_PATH}/${kind}/${sort}?api_key=${API_KEY}&language=ko`).then(
        (response) => response.json()
    );
}

export function getSearch(keyword: string, category: string) {
    return fetch(`${BASE_PATH}/search/${category}?api_key=${API_KEY}&query=${keyword}&language=ko`).then(
        (response) => response.json()
    );
}