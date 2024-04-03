import {motion} from "framer-motion";
import styled from "styled-components";
import {makeImagePath} from "../utils";
import {useHistory} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {ITvProps} from "../api";
import TvSliderPop from "./TvSliderPop";

const SlideWrap = styled.div`
  position: relative;
  margin: 60px 60px 0;
  padding: 0 60px;
`;
const Title = styled.p`
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
  width: 100%;
`;

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
    cursor: pointer;
  }

  svg {
    width: 30px;
    height: 30px;
    fill: #fff;
  }
  
  .prev{
    left: 0;
  }
  
  .next{
    right: 0;
  }
`;

const offset = 6;

function TvSlider({data, name}:ITvProps) {
    const history = useHistory();
    const [index, setIndex] = useState(0);
    const [back, setBack] = useState(false);
    
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
    
    const onBoxClicked = (tvId:number) => {
        history.push(`/tv/${name}/${tvId}`);
    }
    
    const slideRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if(slideRef.current === null) return;
        slideRef.current.style.transition = "all 0.5s";
        slideRef.current.style.transform = `translateX(-${index}00%)`;
    }, [index]);
    
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
                            .map(tv => (
                                <Slide
                                    className="list"
                                    layoutId={tv.id + name}
                                    key={tv.id + name}
                                    onClick={() => onBoxClicked(tv.id)}
                                >
                                    <ImgCon>
                                        <img src={makeImagePath(tv.poster_path, "w500")} alt=""/>
                                    </ImgCon>
                                    <InfoCon>
                                        <h4>{tv.name}</h4>
                                        <p>{tv.first_air_date}</p>
                                    </InfoCon>
                                </Slide>
                            ))}
                    </Row>
                </SlideCon>
                <BtnCon>
                    <button onClick={decreaseIndex} className="prev">
                        <svg viewBox="0 0 16 16" width="16" height="16">
                            <path d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                        </svg>
                    </button>
                    <button onClick={increaseIndex} className="next">
                        <svg viewBox="0 0 16 16" width="16" height="16">
                            <path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </button>
                </BtnCon>
            </SlideWrap>
            
            <TvSliderPop data={data} name={name}/>
        </>
    )
}

export default TvSlider;