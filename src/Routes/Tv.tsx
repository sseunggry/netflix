import styled from "styled-components";
import {makeImagePath} from "../utils";
import {getTvAiring, getTvLatest, getTvPopular, getTvTopRated, IGetDataResult, IGetTvResult} from "../api";
import {useQuery} from "react-query";
import TvSlider from "../Components/TvSlider";

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

function Tv() {
    const useMultipleQuery = () => {
        const airing = useQuery<IGetTvResult>(["airing"], getTvAiring);
        const latest = useQuery<IGetTvResult>(["latest"], getTvLatest);
        const topRated = useQuery<IGetTvResult>(["topRated"], getTvTopRated);
        const popular = useQuery<IGetTvResult>(["popular"], getTvPopular);
        
        return [airing, latest, topRated, popular];
    }
    
    const [
        {isLoading: airingLoading, data: airingData},
        {isLoading: latestLoading, data: latestData},
        {isLoading: topRatedLoading, data: topRatedData},
        {isLoading: popularLoading, data: popularData},
    ] = useMultipleQuery();
    
    return (
        <Wrapper>
            {airingLoading ? <Loader>Loading...</Loader> : (
                <>
                    <Banner bgphoto={makeImagePath(popularData?.results[0].backdrop_path || "")}>
                        <Title>{popularData?.results[0].name}</Title>
                        <Overview>{popularData?.results[0].original_name}</Overview>
                    </Banner>
            
                    <TvSlider data={airingData!} name="nowPlay"/>
                    <TvSlider data={topRatedData!} name="topRated"/>
                    <TvSlider data={popularData!} name="upComing"/>
                </>
            )}
        </Wrapper>
    );
}

export default Tv;