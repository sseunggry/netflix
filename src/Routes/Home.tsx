import {useQuery} from "react-query";
import {
    getMoviesLatest,
    getMoviesNowPlay, getMoviesTopRated, getMoviesUpComing,
    IGetMoviesResult
} from "../api";
import styled from "styled-components";
import {makeImagePath} from "../utils";
import MovieSlider from "../Components/MovieSlider";

const Wrapper = styled.div`
  overflow-x: hidden;
  background: #000;
`;
const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Banner = styled.div<{bgphoto:string}>`
  display: flex;
  height: 600px;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${props => props.bgphoto});
  background-size: cover;
`;
const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 50px;
  font-weight: 500;
`;
const Overview = styled.p`
  overflow: hidden;
  display: -webkit-box;
  width: 40%;
  height: 88px;
  font-size: 20px;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  line-height: 1.4;
`;


function Home() {
    const useMultipleQuery = () => {
        const nowPlay = useQuery<IGetMoviesResult>(["nowPlaying"], getMoviesNowPlay);
        const latest = useQuery<IGetMoviesResult>(["latest"], getMoviesLatest);
        const topRated = useQuery<IGetMoviesResult>(["topRated"], getMoviesTopRated);
        const upComing = useQuery<IGetMoviesResult>(["upComing"], getMoviesUpComing);
      
        return [nowPlay, latest, topRated, upComing];
    };
    
    const [
        {isLoading: nowPlayLoading, data: nowPlayData},
        {isLoading: latestLoading, data: latestData},
        {isLoading: topRatedLoading, data: topRatedData},
        {isLoading: upComingLoading, data: upComingData}
    ] = useMultipleQuery();
    
    return (
        <Wrapper>
            {nowPlayLoading ? <Loader>Loading...</Loader> : (
                <>
                    <Banner bgphoto={makeImagePath(nowPlayData?.results[0].backdrop_path || "")}>
                        <Title>{nowPlayData?.results[0].title}</Title>
                        <Overview>{nowPlayData?.results[0].overview}</Overview>
                    </Banner>

                    <MovieSlider data={nowPlayData!} name="nowPlay"/>
                    <MovieSlider data={topRatedData!} name="topRated"/>
                    <MovieSlider data={upComingData!} name="upComing"/>
                </>
            )}
        </Wrapper>
    );
}

export default Home;