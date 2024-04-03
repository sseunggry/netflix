import {useHistory, useRouteMatch} from "react-router-dom";
import {AnimatePresence, motion, useViewportScroll} from "framer-motion";
import {makeImagePath} from "../utils";
import styled from "styled-components";
import {ITvProps} from "../api";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;
const Detail = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 15px;
  z-index: 3;
  background-color: ${props => props.theme.black.lighter};
`;
const Cover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 340px;
`;
const Title = styled.div`
  color: ${(props) => props.theme.white.lighter};
  margin: 30px 0 20px;
  padding: 0 20px;
  
  &:after{
    content: '';
    display: block;
    margin-top: 20px;
    width: 100%;
    height: 2px;
    background-color: #666;
  }

  h3{
    font-size: 48px;
  }
  
  span{
    display: inline-block;
    margin-top: 4px;
    width: 100%;
    font-size: 20px;
    font-weight: 500;
  }
`;
const InfoTxt = styled.div`
  padding: 0 20px;
  
  span{
    font-weight: 500;
  }
  
  p{
    margin-top: 10px;
    line-height: 1.4;
    color: ${(props) => props.theme.white.lighter};
  }
`;

function TvSliderPop({data, name}:ITvProps){
    const history = useHistory();
    const bigTvMatch = useRouteMatch<{tvId: string}>(`/tv/${name}/:tvId`);
    const {scrollY} = useViewportScroll();
    
    const onOverlayClick = () => history.push("/tv");
    const clickedTv = bigTvMatch?.params.tvId &&
        data?.results.find((tv) => tv.id === +bigTvMatch.params.tvId);
    
    return (
        <AnimatePresence>
            {bigTvMatch ? (
                <>
                    <Overlay
                        onClick={onOverlayClick}
                        exit={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    />
                    <Detail
                        layoutId={bigTvMatch.params.tvId + name}
                        style={{ top: scrollY.get() + 100 }}
                    >
                        {clickedTv && (
                            <>
                                <Cover
                                    style={{backgroundImage: `linear-gradient(to top, #000, transparent),
                                                url(${makeImagePath(clickedTv.backdrop_path, "w500")})`}}
                                />
                                <Title>
                                    <h3>{clickedTv.name}</h3>
                                    <span>{clickedTv.original_name}</span>
                                </Title>
                                <InfoTxt>
                                    <span>평점 {clickedTv.vote_average}</span>
                                    <p>{clickedTv.overview}</p>
                                </InfoTxt>
                                
                            </>
                        )}
                    </Detail>
                </>
            ) : null}
        </AnimatePresence>
    )
}

export default TvSliderPop;