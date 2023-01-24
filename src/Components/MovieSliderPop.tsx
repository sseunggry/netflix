import {useHistory, useRouteMatch} from "react-router-dom";
import {AnimatePresence, motion, useViewportScroll} from "framer-motion";
import {makeImagePath} from "../utils";
import styled from "styled-components";
import {IMovieProps} from "../api";

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
  //position: relative;
  //top: -90px;
  
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
const Overview = styled.p`
  //position: relative;
  //top: -80px;
  color: ${(props) => props.theme.white.lighter};
`;

function SliderPop({data, name}:IMovieProps){
    const history = useHistory();
    const bigMovieMatch = useRouteMatch<{movieId: string}>(`/movies/${name}/:movieId`);
    const {scrollY} = useViewportScroll();
    
    const onOverlayClick = () => history.push("/");
    const clickedMovie = bigMovieMatch?.params.movieId &&
        data?.results.find((movie) => movie.id === +bigMovieMatch.params.movieId);
    
    return (
        <AnimatePresence>
            {bigMovieMatch ? (
                <>
                    <Overlay
                        onClick={onOverlayClick}
                        exit={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    />
                    <Detail
                        layoutId={bigMovieMatch.params.movieId + name}
                        style={{ top: scrollY.get() + 100 }}
                    >
                        {clickedMovie && (
                            <>
                                <Cover
                                    style={{backgroundImage: `linear-gradient(to top, #000, transparent),
                                                url(${makeImagePath(clickedMovie.backdrop_path, "w500")})`}}
                                />
                                <Title>
                                    <h3>{clickedMovie.title}</h3>
                                    <span>{clickedMovie.original_title}</span>
                                </Title>
                                <InfoTxt>
                                    <span>평점 {clickedMovie.vote_average}</span>
                                    <p>{clickedMovie.overview}</p>
                                </InfoTxt>
                                
                            </>
                        )}
                    </Detail>
                </>
            ) : null}
        </AnimatePresence>
    )
}

export default SliderPop;