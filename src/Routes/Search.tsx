import {useHistory, useLocation} from "react-router-dom";
import {useQuery} from "react-query";
import {getSearch, IGetDataResult, IGetMoviesResult} from "../api";
import styled from "styled-components";
import {useState} from "react";
import SearchSlider from "../Components/SearchSlider";

const Wrapper = styled.div`
  overflow-x: hidden;
  padding: 65px 0 0;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Search() {
    const history = useHistory();
    const [index, setIndex] = useState(0);
    
    const location = useLocation();
    const keyword = new URLSearchParams(location.search).get("keyword");
    const {data : movieData, isLoading: movieLoading} = useQuery<IGetDataResult>(
        ["search", "movie", keyword], () => getSearch(keyword || '', "movie")
    );
    const {data : tvData, isLoading: tvLoading} = useQuery<IGetDataResult>(
        ["search", "tv", keyword], () => getSearch(keyword || '', "tv")
    );
    
    return (
        <Wrapper>
            {movieLoading || tvLoading ? <Loader>Loading...</Loader> : (
                <>
                    <SearchSlider data={movieData!} name="movie"/>
                    <SearchSlider data={tvData!} name="tv"/>
                </>
            )}
        </Wrapper>
    );
}

export default Search;