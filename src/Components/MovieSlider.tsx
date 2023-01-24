import {AnimatePresence, motion} from "framer-motion";
import styled from "styled-components";
import {makeImagePath} from "../utils";
import {useHistory} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {IMovieProps} from "../api";
import MovieSliderPop from "./MovieSliderPop";

const SlideWrap = styled.div`
  position: relative;
  margin: 60px 60px 0;
  padding: 0 60px;
  //overflow: hidden;
  //height: calc(200px * 1.5);
`;

const Title = styled.div`
  margin-bottom: 20px;
  font-size: 40px;
  font-weight: 700;
  text-transform: uppercase;
`;
const SlideCon = styled.div`
  overflow: hidden;
`;
const Row = styled(motion.div)`
  display: flex;
  //display: grid;
  //grid-template-columns: repeat(6, 1fr);
  //gap: 20px;
  width: 100%;
`;
// <{bgphoto:string}>
// background: url(${props => props.bgphoto}) no-repeat center/cover;
const Slide = styled(motion.div)`
  flex-shrink: 0;
  width: 210px;
  height: fit-content;
  cursor: pointer;
  
  &:first-child{
    transform-origin: top left;
  }
  &:last-child{
    transform-origin: top right;
  }
  
  +.list{
    margin-left: 30px;
  }
`;
const ImgCon = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  border-radius: 20px;
  
  &:before{
    content: '';
    display: block;
    padding-top: 150%;
  }

  img{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const Info = styled(motion.div)`
  position: absolute;
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  width: 100%;
  border-radius: 0 0 20px 20px;
  bottom: 0;
  
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const InfoCon = styled.div`
  h4{
    margin: 20px 0 10px;
    line-height: 1.4;
    font-size: 20px;
    font-weight: 500;
  }
  p{
    font-size: 16px;
    font-weight: 500;
    color: #666;
  }
`;

const BtnCon = styled.div`
  button{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
    color: #fff;
  }
  
  .prev{
    left: 0;
  }
  
  .next{
    right: 0;
  }
`;

const rowVariants = {
    hidden: (back:boolean) => ({
        x: back ? -window.outerWidth - 5 : window.outerWidth + 5
    }),
    visible: {x: 0},
    exit: (back:boolean) => ({
        x: back ? window.outerWidth + 5 : -window.outerWidth - 5
    })
}

const BoxVariants = {
    normal : {scale: 1},
    hover : {zIndex: 99, scale: 1, y: -30, transition: {delay: 0.3, duration: 0.1, type: "tween"}}
}

const infoVariants = {
    hover: {opacity: 1, transition: {delay: 0.5, duration: 0.2, type: "tween"}}
}

const offset = 6;

function MovieSlider({data, name}:IMovieProps) {
    const history = useHistory();
    const [index, setIndex] = useState(0);
    const [leaving, setLeaving] = useState(false);
    const [back, setBack] = useState(false);
    const [direct, setDirect] = useState(1);
    
    const increaseIndex = () => {
        if(data) {
            setBack(false);
            
            const totalMovies = data.results.length - 1;
            const maxIndex = Math.floor(totalMovies / offset) - 1;
            setIndex(prev => prev === maxIndex ? maxIndex : prev + 1);
        }
    };
    
    const decreaseIndex = () => {
        if(data) {
            setBack(true);
            setIndex(prev => prev === 0 ? 0 : prev - 1);
        }
    }
    
    const onBoxClicked = (movieId:number) => {
        history.push(`/movies/${name}/${movieId}`);
    }
    
    const slideRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if(slideRef.current === null) return;
        slideRef.current.style.transition = "all 0.5s";
        slideRef.current.style.transform = `translateX(-${index}00%)`;
    }, [index]);
    
    // console.log(data);
    return (
        <>
            <SlideWrap>
                <Title>{name}</Title>
                <SlideCon>
                    <Row
                        custom={back}
                        key={index}
                        ref={slideRef}
                    >
                        {data?.results.slice(1)
                            // .slice(offset * index, offset * index + offset)
                            .map(movie => (
                                <Slide
                                    className="list"
                                    layoutId={movie.id + name}
                                    key={movie.id + name}
                                    onClick={() => onBoxClicked(movie.id)}
                                >
                                    <ImgCon>
                                        <img src={makeImagePath(movie.poster_path, "w500")} alt=""/>
                                    </ImgCon>
                                    <InfoCon>
                                        <h4>{movie.title}</h4>
                                        <p>{movie.release_date}</p>
                                    </InfoCon>
                                </Slide>
                            ))}
                    </Row>
                </SlideCon>
                <BtnCon>
                    <button onClick={decreaseIndex} className="prev">이전</button>
                    <button onClick={increaseIndex} className="next">이후</button>
                </BtnCon>
            </SlideWrap>
            
            <MovieSliderPop data={data} name={name}/>
        </>
    )
}

export default MovieSlider;