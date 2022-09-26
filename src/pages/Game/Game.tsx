import React,  { useEffect, useRef } from 'react';
import imgMosquito from './images/mosquito1.png';
import StartButton from './StartButton';
import Timer from './Timer';
import Score from './Score';
//★
//1.tsx로 먼저 변경 --> 작동 확인
//2.변수명 mosquito로 변경


const Game = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const width : number = 1000;
    const height: number = 800;
 const onStart = () =>{ 
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = width;
    canvas.height = height;
    let mosquitoImage = new Image(); 
    mosquitoImage.src = imgMosquito;
    
   
    class Mosquito{ 
        x: number;
        y: number;
        mosquitoWidth: number; 
        mosquitoHeight: number;
        directionX: number;
        directionY: number;
        dx: number;
        dy: number;
        
      constructor(){ 
        this.mosquitoWidth = 84;
        this.mosquitoHeight = 84;
        this.x = Math.floor(Math.random()*(width-this.mosquitoWidth)); //모기 시작 X좌표
        this.y = Math.floor(Math.random()*(height-this.mosquitoHeight)); //모기 시작 Y좌표
        this.directionX = Math.floor(Math.random()*2-1)>=0?1:-1; //모기 비행 방향
        this.directionY = Math.floor(Math.random()*2-1)>=0?1:-1;  
        this.dx = this.directionX*(Math.random()*0.5); //모기 비행 속도
        this.dy = this.directionY*(Math.random()*0.5); 
      }
      update(){ 
        this.y += this.dy; 
        this.x += this.dx; 
        if (this.y + this.dy >= height - this.mosquitoHeight || this.y + this.dy < -1 ) {
          this.dy *= -1;
        }else if(this.x + this.dx >= width - this.mosquitoWidth || this.x + this.dx < -1){
          this.dx *= -1;
        } 
      }
      draw(){ 
        if (!ctx) return;
         ctx.drawImage(mosquitoImage, this.x, this.y); 
      }
    }

    let Mosquitos : any =[]
    const mosquitoNumber = 30 
    const init = () => { 
      for(let i=0; i<mosquitoNumber; i++){
        Mosquitos[i] = new Mosquito();
       }
    }

    function animate(){ 
      if (!canvas) return;  
      if (!ctx) return;
      ctx.fillStyle = "rgb(211,211,211)"; //캔버스 배경 색깔
      ctx.fillRect(0,0,width,height);
      for(let i=0; i<mosquitoNumber; i++){
        Mosquitos[i].update();
        Mosquitos[i].draw();
      }
      setInterval(animate, 1000/60); 
    }
    init(); 
    animate(); 
    }

    useEffect(() => {onStart()},[])


    //1.로그인을 해야만, 게임을 할 수 있게 할 것
    //3.모기를 클릭하면, 모기의 눈이 X로 변할 것.
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
};

export default Game;