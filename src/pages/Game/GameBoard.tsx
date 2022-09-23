import React, { useRef, useEffect, useState } from 'react';
import StartButton from './StartButton';
import Timer from './Timer';
import Score from './Score';
import imgMosquito from './images/mosquito1.png';

// useEffect를 2개 만들고 첫번째 useEffect에서 useState로 arrX를 채운다
interface CanvasProps {
    width: number;
    height: number;
}

const GameBoard = ({ width, height }: CanvasProps) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    
    let mosquitoImage = new Image(); //나중에 배열로 바꿔서, 여러 그림 넣기
    mosquitoImage.src = imgMosquito;
    let mosquitoWidth = 84; //그림 크기 
    let mosquitoHeight = 84;
    let x : number = Math.floor(Math.random()*(width-mosquitoWidth)); //모기 시작 위치 랜덤으로 구현  0과 800에서 시작. 800에서 시작이면, 그림이 넘어감.
    let y : number = Math.floor(Math.random()*(height-mosquitoHeight));
    let directionX = Math.floor(Math.random()*2-1)>=0?1:-1; //모기 비행 방향
    let directionY = Math.floor(Math.random()*2-1)>=0?1:-1;  
    let dx = directionX*(Math.floor(Math.random()*10)); //모기 비행 속도
    let dy = directionY*(Math.floor(Math.random()*10)); 
    
    let arrX : number[];
    let arrY : number[];
    
    let mosquitoNumber : number = 5; //원하는 모기수 설정
    let mosquitoes =[]

    const draw = (x:number,y:number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext('2d');
        if (!context) return;
        context.drawImage(mosquitoImage, x, y);   //문제는 새로운 x,y값을 어떻게 넣는 가이다.
    }

    const coordinate = () => { //반목문 + 모기마리수 파라미터
        const canvas = canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext('2d');
        if (!context) return;
        context.clearRect(0, 0, width, height);
        if (y + dy >= height - mosquitoHeight || y + dy < -1 ) {
            dy *= -1;
        }else if(x + dx >= width - mosquitoWidth || x + dx < -1){
            dx *= -1;
        } 
        x += dx;
        y += dy;
        //문제는 새로운 x,y값을 어떻게 넣는 가 이다.
        draw(x,y);
      
    }

    useEffect(() => {
        setInterval(coordinate, 1000 / 60); 
    }, [x,y])

    //1.로그인을 해야만, 게임을 할 수 있게 할 것
    //2.랜덤으로 움직이는 모기 30마리로 시작할 것
    //3.모기를 클릭하면, 모기의 눈이 X로 변할 것.
    //4.시간이 계속 증가하다가, 모기 30마리를 다잡으면, 시간이 멈출 것
    //5.시간이 멈추면, 등수 등록할 것(아이디, 걸린 시간)
    //6.게임 시작버튼 만들 것
    //6-1.게임을 시작하면 '시작버튼'이 '재시작'이 될 것
    //6-2.'재시작'하면 재시작할 것
    //6-3.시작버튼 누르면 모기가 움직이기 시작함
    //7.게임이 멈추면, 게임오버 이미지와, 게임 등수(아이디, 걸린 시간)가 출력될 것
    //8. 게임시작하면, 마우스 포인터를 '모기채'로 바꿀 것



    return (
        <div className='canvasBox'>
            <canvas ref={canvasRef} height={height} width={width} className="canvas" />
            <StartButton />
            <div>
                <Score />
                <Timer />
            </div>
        </div>
    );
}

GameBoard.defaultProps = {
    width: 800,
    height: 600
};

export default GameBoard;



