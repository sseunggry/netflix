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
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 60px;
  height: 800px;
  text-align: center;
  // background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${props => props.bgphoto});
  background-image: url(${props => props.bgphoto});
  background-size: cover;

  &::after{
    content: '';
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
`;
const TxtBox = styled.div`
  position: relative;
  z-index: 1;
`;
const SubTit = styled.p`
  font-size: 32px;
  font-weight: 500;
`;
const Title = styled.h2`
  margin: 20px 0 40px;
  font-size: 60px;
  font-weight: 700;
`;
const Overview = styled.p`
  overflow: hidden;
  display: -webkit-box;
  margin: 0 auto;
  width: 60%;
  height: 46px;
  font-size: 16px;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.6;
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

    console.log(nowPlayData);
    
    return (
        <Wrapper>
            {nowPlayLoading ? <Loader>Loading...</Loader> : (
              <>
                <Banner bgphoto={makeImagePath(nowPlayData?.results[0].backdrop_path || "")}>
                    <TxtBox>
                      <SubTit>{nowPlayData?.results[0].original_title}</SubTit>
                      <Title>{nowPlayData?.results[0].title}</Title>
                      <Overview>{nowPlayData?.results[0].overview}</Overview>
                    </TxtBox>
                </Banner>
                <MovieSlider data={nowPlayData!} name="nowPlay"/>
              </>
            )}
            {topRatedLoading ? <Loader>Loading...</Loader> : <MovieSlider data={topRatedData!} name="topRated"/>}
            {upComingLoading ? <Loader>Loading...</Loader> : <MovieSlider data={upComingData!} name="upComing"/>}
        </Wrapper>
    );
}

export default Home;