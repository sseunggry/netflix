import styled from "styled-components";
import {makeImagePath} from "../utils";
import {useQuery} from "react-query";
import {getMovies, IGetMoviesResult} from "../api";

const ListCon = styled.div`
  padding: 40px 60px 0;
`;

const SubTitle = styled.p`
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
    height: 40px;
    font-size: 18px;
    font-weight: 500;
    overflow: hidden;
    display: -webkit-box;
    white-space: normal;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
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

interface IPropsType {
    title: string,
    dataName: string;
}

function ListWrap({title, dataName} :IPropsType) {
    const {data: popular, isLoading: popularLoading} = useQuery<IGetMoviesResult>(
        ["movies", "popular"], () => getMovies("popular")
    );
    
    const {data: best, isLoading: bestLoading} = useQuery<IGetMoviesResult>(
        ["movies", "best"], () => getMovies("top_rated")
    );
    
    const {data: upcoming, isLoading: upcomingLoading} = useQuery<IGetMoviesResult>(
        ["movies", "upcoming"], () => getMovies("upcoming")
    );

    return (
        <ListCon>
            <SubTitle>{title}</SubTitle>
            <List>
                {(dataName === "upcoming" ? upcoming : dataName === "best" ? best : popular)?.results.map(movie => (
                    <Item key={movie.id}>
                        <img src={makeImagePath(movie.poster_path, "w500")} alt=""/>
                        <TextWrap>
                            <p>{movie.title}</p>
                            <span>{movie.overview}</span>
                            {dataName === "best" ? <span>&#127775;{movie.vote_average}</span> : null}
                        </TextWrap>
                    </Item>
                ))}
            </List>
        </ListCon>
    );
}

export default ListWrap;