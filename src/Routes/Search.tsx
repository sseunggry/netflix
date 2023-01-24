import {useLocation} from "react-router-dom";
import {useQuery} from "react-query";
import {getSearch, IGetMoviesResult} from "../api";
import styled from "styled-components";
import {makeImagePath} from "../utils";

const Wrapper = styled.div`
  padding: 65px 60px 0;
`;

const ListCon = styled.div`
  padding-top: 40px;
`;

const Title = styled.p`
  font-size: 40px;
  font-weight: 500;
  color: #fff;
`;

const List = styled.ul`
  display: flex;
  align-items: flex-start;
  width: fit-content;
`;

const Item = styled.li`
  width: 200px;
  
  img{
    width: 100%;
    height: 300px;
  };
  
  + li{margin-left: 20px;}
`;

const TextWrap = styled.div`
  p {
    margin: 20px 0 10px;
    font-size: 18px;
    font-weight: 500;
  }
  
  span{
    overflow: hidden;
    display: -webkit-box;
    white-space: normal;
    text-overflow: ellipsis;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  
`;

function Search() {
    const location = useLocation();
    const keyword = new URLSearchParams(location.search).get("keyword");
    const {data : movieData, isLoading: movieLoading} = useQuery<IGetMoviesResult>(
      ["search", "movie", keyword], () => getSearch(keyword || '', "movie")
    );
    const {data : tvData, isLoading: tvLoading} = useQuery<IGetMoviesResult>(
      ["search", "tv", keyword], () => getSearch(keyword || '', "tv")
    );
    
    /*
    const searchData = useQueries<IGetResult[]>([
        {
            queryKey: ["movie", keyword],
            queryFn : getSearch
        },
        {
            queryKey: ["tv", keyword],
            queryFn : getSearchTv
        }
    ]);
    */
    
    return (
        <div>
            {movieLoading || tvLoading ? <p>Loading...</p> : (
                <Wrapper>
                    {/*
                    <ListCon>
                        {["movie", "tv"].map((value) => (
                            <>
                                <Title>{value}</Title>
                                <List>
                                    {movieData?.results.map(data => (
                                        <Item key={data.id}>
                                            <img src={makeImagePath(data.poster_path, "w500")} alt=""/>
                                            <TextWrap>
                                                <p>{data.title}</p>
                                                <span>{data.overview}</span>
                                            </TextWrap>
                                        </Item>
                                    ))}
                                </List>
                            </>
                        ))}
                    </ListCon>
                    */}
                    <ListCon>
                        <Title>Movies</Title>
                        <List>
                            {movieData?.results.map(movie => (
                                <Item key={movie.id}>
                                    <img src={makeImagePath(movie.poster_path, "w500")} alt=""/>
                                    <TextWrap>
                                        <p>{movie.title}</p>
                                        <span>{movie.overview}</span>
                                    </TextWrap>
                                </Item>
                            ))}
                        </List>
                    </ListCon>
                    <ListCon>
                        <Title>Tv</Title>
                        <List>
                            {tvData?.results.map(movie => (
                                <Item key={movie.id}>
                                    <img src={makeImagePath(movie.poster_path, "w500")} alt=""/>
                                    <TextWrap>
                                        <p>{movie.name}</p>
                                        {/*<span>{movie.overview}</span>*/}
                                    </TextWrap>
                                </Item>
                            ))}
                        </List>
                    </ListCon>


            
                </Wrapper>
            )}
        </div>
    );
}

export default Search;