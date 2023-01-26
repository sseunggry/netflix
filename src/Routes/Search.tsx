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
        // <>
        //     {movieLoading || tvLoading ? <p>Loading...</p> : (
        //         <Wrapper>
        //             <SlideWrap>
        //                 <Title>Movies</Title>
        //                 <SlideCon>
        //                     <Row>
        //                         {SearchSlider?.results.slice(1).map(movie => (
        //                             <Slide
        //                                 className="list"
        //                                 // layoutId={movie.id}
        //                                 onClick={() => onBoxClicked(movie.id)}
        //                                 key={movie.id}
        //                             >
        //                                 <ImgCon>
        //                                     <img src={makeImagePath(movie.poster_path, "w500")} alt=""/>
        //                                 </ImgCon>
        //                                 <InfoCon>
        //                                     <h4>{movie.title}</h4>
        //                                     <p>{movie.overview}</p>
        //                                 </InfoCon>
        //                             </Slide>
        //                         ))}
        //                     </Row>
        //                 </SlideCon>
        //             </SlideWrap>
        //             <ListCon>
        //                 <Title>Tv</Title>
        //                 <List>
        //                     {tvData?.results.map(movie => (
        //                         <Item key={movie.id}>
        //                             <img src={makeImagePath(movie.poster_path, "w500")} alt=""/>
        //                             <TextWrap>
        //                                 <p>{movie.name}</p>
        //                             </TextWrap>
        //                         </Item>
        //                     ))}
        //                 </List>
        //             </ListCon>
        //         </Wrapper>
        //     )}
        // </>
    );
}

export default Search;