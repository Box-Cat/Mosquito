import React, { useRef, useEffect } from 'react';
import StartButton from './StartButton';
import Timer from './Timer';
import Score from './Score';
import imgMosquito from './images/mosquito1.png';

interface CanvasProps {
    width: number;
    height: number;
}

const GameBoard = ({ width, height }: CanvasProps) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    //let x : number = Math.floor(Math.random()*(800-92)); 
    //let y : number = Math.floor(Math.random()*(600-90));

    const genMosquito = () => {
        let mosquitoImage = new Image();
        mosquitoImage.src = imgMosquito;
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext('2d');
        if (!context) return;

        let mosquitoImage = new Image();
        mosquitoImage.src = imgMosquito;
        //let x = width/2;
        //let y = height/2;
        let mosquitoWidth = 84; //그림 크기
        let mosquitoHeight = 84;
        let x = Math.floor(Math.random()*(width-mosquitoWidth)); //모기 시작 위치 랜덤으로 구현  0과 800에서 시작. 800에서 시작이면, 그림이 넘어감.
        let y = Math.floor(Math.random()*(height-mosquitoHeight));
        var dz = Math.floor(Math.random()*2-1); //모기 시작 방향 랜덤으로 구현
        var dx = dz>=0?2:-2; 
        var dy = dz>=0?2:-2;

        const mosquitoNumber : number = 5; //원하는 모기수 설정
        const draw = () => { //반목문 + 모기마리수 파라미터
            context.clearRect(0, 0, width, height);

            if (y + dy >= height - mosquitoHeight || y + dy < -1 ) {
                dy *= -1;
            }else if(x + dx >= width - mosquitoWidth || x + dx < -1){
                dx *= -1;
            } 

            x += dx;
            y += dy;


            ////모기의 랜덤 이동 구현///
            let i:number = 0;
            while(i<mosquitoNumber){
                context.drawImage(mosquitoImage, x, y); //겹쳐서 안 보이는 듯
                i++;
            }
            console.log("dz",dz); //랜덤 위치를 추가하고, 바닥을 기는 모기가 캔버스 밖을 나감            
            console.log("x",x); //랜덤 위치를 추가하고, 바닥을 기는 모기가 캔버스 밖을 나감            
            console.log("y",y);            
          

        }

        // const init = () => { // 그려질 공의 개체를 설정하는 함수 
        //     for(let i=0; i<ballNumber; i++){
        //       //balls[i] = new Ball(canvas.width*0.5, canvas.height*0.5)

        //      }
        //   }
        // function createBalls(){
        //     const interval = setInterval(function(){
        //         let e = new Enemy()
        //         e.init()
        //     },1000)
        // }


        setInterval(draw, 1000 / 60);
    }, [])
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



