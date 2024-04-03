import styled from "styled-components";
import {makeImagePath} from "../utils";
import {getData, IGetTvResult} from "../api";
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
  font-weight: 700;
`;
const Date = styled.p`
  font-size: 20px;
  letter-spacing: 0.5px;
`;

function Tv() {
    const useMultipleQuery = () => {
        const airing = useQuery<IGetTvResult>(["airing"], () => getData('tv', 'airing_today'));
        const latest = useQuery<IGetTvResult>(["latest"], () => getData('tv', 'latest'));
        const topRated = useQuery<IGetTvResult>(["topRated"], () => getData('tv', 'top_rated'));
        const popular = useQuery<IGetTvResult>(["popular"], () => getData('tv', 'popular'));
        
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
                    <Banner bgphoto={makeImagePath(airingData?.results[0].backdrop_path || "")}>
                        <Title>{airingData?.results[0].name}</Title>
                        <Date>{airingData?.results[0].first_air_date.replace(/-/g, '.')}</Date>
                    </Banner>
            
                    <TvSlider data={airingData!} name="airing"/>
                </>
            )}
            {topRatedLoading ? <Loader>Loading...</Loader> : <TvSlider data={topRatedData!} name="topRated"/>}
            {popularLoading ? <Loader>Loading...</Loader> : <TvSlider data={popularData!} name="popular"/>}
        </Wrapper>
    );
}

export default Tv;