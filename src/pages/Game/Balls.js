import React,  { useEffect } from 'react';
import imgMosquito from './images/mosquito1.png';

//이 녀석의 값만 바꿔서 만들자

const Balls = () => {
 const onStart = () =>{ // 스크립트 로딩이 완료된 후부터 내용을 시작
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let mosquitoImage = new Image(); 
    mosquitoImage.src = imgMosquito;
    
    class Ball{
      constructor(x,y){ // ball의 기본 속성들을 정의
        this.x = x;
        this.y = y;
   // 시작할때 공의 색깔을 랜덤하게 설정. 이거 많이 사용하게 된다.
        this.size = 30; // 공의 반지름
        this.angle = (Math.random()*(Math.PI*2)); // 공이 출발할 각도
        this.power = 5; // 공의 세기
        this.directionX = this.power * Math.cos(this.angle); // 공이 좌우로 움직이는 값
        this.weight = this.power * Math.sin(this.angle); // 공이 상하로 움직이는 값
      }
      update(){ // 프레임마다 속성들을 변화시키는 함수
        this.y += this.weight; // y값을 계속 증가/감소 시킨다
        this.x += this.directionX; // x값을 계속 증가/감소 시킨다.
   
        if(this.y+this.size>canvas.height || this.y-this.size<0){ // 상하 바운드 처리
          this.weight *= -1; // 상하에 닿으면 방향을 전환
        }
        if(this.x>canvas.width-this.size || this.x-this.size < 0) { // 좌우 바운드 처리
          this.directionX *= -1; // 좌우에 닿으면 방향을 전환
        }
      }
      draw(){ // 넘어온 속성값대로 캔버스에 원을 그려주는 함수
        //  ctx.fillStyle= this.c;
        //  ctx.beginPath();
        //  ctx.arc(this.x, this.y, this.size, 0, Math.PI*2, true);
        //  ctx.closePath();
        //  ctx.fill();
         ctx.drawImage(mosquitoImage, this.x, this.y); 
      }
    }

    let balls =[]
  
    const init = () => { // 그려질 공의 개체를 설정하는 함수 
      for(let i=0; i<ballNumber; i++){
        balls[i] = new Ball(canvas.width*0.5, canvas.height*0.5)
       }
    }

    function animate(){ // 매 프레임마다 그림을 새로 그려주는 함수
      ctx.fillStyle='rgba(255,255,255,0.5)'; // 매 프레임마다 캔버스를 통째로 칠하는 색깔. 맨 마지막의 alpha값에 따라 공의 잔상이 남는 정도가 달라진다.
      ctx.fillRect(0,0,canvas.width,canvas.height); // 캔버스 전체를 색칠해서 내용을 지워준다
      // balls.update(); // ball1의 좌표 등을 업데이트 한다
      // balls.draw(); // 업데이트된 내용으로 ball을 새로 그린다.
      for(let i=0; i<ballNumber; i++){
        balls[i].update();
        balls[i].draw();
      }
  
      window.addEventListener('resize',function(){ // 화면 크기가 변하면 캔버스 크기도 변경해줌
        canvas.width=window.innerWidth;
        canvas.height=window.innerHeight;
      })
      requestAnimationFrame(animate);
    }
    const ballNumber = 30 //원하는 공의 갯수 설정
    init(); // 공의 초기 좌표를 설정하고,
    animate(); // 프레임마다 공을 그려준다.
    }

    useEffect(() => {onStart()},[])

  return (
      <canvas className='h-full rounded-full' id="canvas"></canvas>
  );
};

export default Balls;