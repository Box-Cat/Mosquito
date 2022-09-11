import React,  { useRef, useEffect } from 'react';

interface CanvasProps {
    width: number;
    height: number;
}

const GameBoard = ({ width, height }: CanvasProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    //1.styled-component로 캔버스를 중앙에 보낼 것
    //2.움직이는 모기 추가할 것.
    //3.모기를 클릭하면 모기가 사라질 것
    //4.모기를 클릭하면 점수가 올라갈 것
    //5.점수판 만들 것
    //6.게임 시작화면 페이지 만들 것
    return(
        <div> 
            <canvas ref={canvasRef} height={height} width={width} className="canvas"/>
        </div>
    );
}

GameBoard.defaultProps = {
    width: 800,
    height: 600
  };

export default GameBoard;