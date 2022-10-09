import React, { useState, useEffect, useRef } from "react";
import imgMosquito from "./images/mosquito1.png";
import imgDeath from "./images/death.png";
import '../../App.css';
interface mosquito{
  mosquitoCount: number;
  speed: number;
  MosquitoArr: any[]
}

function Game() {
  //변수, 객체 선언
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const width: number = 1000;
  const height: number = 700;
  const clicker: any[] = [];
  const game = {
    req: '',score:0
  };
  const mosquito : mosquito = {
    mosquitoCount: 10
    , speed: 1
    , MosquitoArr: []
  };

  const onStart = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.style.cursor = 'crosshair'; //마우스커서

    //함수선언
    const draw = () => {
      if (!canvas) return;
      if (!ctx) return;
      ctx.fillStyle = 'rgb(211,211,211)';
      ctx.fillRect(0,0,canvas.width,canvas.height);
      ctx.beginPath();

      if (mosquito.MosquitoArr.length < mosquito.mosquitoCount) {
        //새로운 모기 생성
        mosquitoInfoMaker();
      }

      clicker.forEach((dot, index) => {
        ctx.strokeStyle = 'black'; //마우스 원
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, 2 * Math.PI); 
        ctx.stroke();
        dot.size -= 1;
        if (dot.size < 1) {
          clicker.splice(index, 1);
        }
      })

      mosquito.MosquitoArr.forEach((bub, index) => {
      
        //모기 튕기기
        bub.y -= bub.dy*bub.speed;
        bub.x -= bub.dx*bub.speed;
        if (bub.y >= height - bub.size ||  bub.y < 0) {
          bub.dy *= -1;
        } else if ( bub.x >= width - bub.size ||  bub.x < 0) {
          bub.dx *= -1;
        }

        clicker.forEach((dot) => {
          if(colCheck(bub, dot)){
            let popped = mosquito.MosquitoArr.splice(index, 1);
            let val = Math.ceil(popped[0].size);
            let val1 = Math.ceil(popped[0].speed);
            game.score += val + (val1*3);
          }
        })
        drawMosquito(bub.x, bub.y, bub.size);
      })

      requestAnimationFrame(draw);
    }

    function mosquitoInfoMaker() {
      if (!canvas) return;
      if (!ctx) return;
      let mosquitoSize = 84
      let xPos = Math.random() * (canvas.width - mosquitoSize);
      let yPos = Math.random() * (canvas.height - mosquitoSize);
      let directionX = Math.floor(Math.random() * 2 - 1) >= 0 ? 1 : -1; //모기 비행 방향
      let directionY = Math.floor(Math.random() * 2 - 1) >= 0 ? 1 : -1;
      mosquito.MosquitoArr.push({
        x: xPos,
        y: yPos,
        size: mosquitoSize,
        speed : Math.floor(Math.random()*5)+mosquito.speed,
        dx: directionX,
        dy: directionY
      });
    }

    function drawMosquito(xPos: number, yPos: number, mosquitoSize: number) {
      if (!canvas) return;
      if (!ctx) return;

      //배경 모기 그리기
      let mosquitoImage = new Image();
      mosquitoImage.src = imgMosquito;
      ctx.drawImage(mosquitoImage, xPos, yPos);
      }

      canvas.addEventListener('click', (e) => {
        const rect = canvas.getBoundingClientRect();
        const mouseClick = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
          size: 50
        }
        clicker.push(mouseClick);
        mosquito.MosquitoArr.forEach((bub, index) => {
            if(colCheck(bub, mouseClick)){
              mosquito.MosquitoArr.splice(index, 1);
            }
        })
      })

    function colCheck(a:any, b:any) {
      let hit = a.x < b.x + b.size && a.x + a.size > b.x && a.y < b.y + b.size && a.y + a.size > b.y;
      return hit;
    }

    //함수 호출
    draw();  
  }
  

  useEffect(()=>{
    onStart();
  },[])

  //1.로그인을 해야만, 게임을 할 수 있게 할 것
  //2.모기를 클릭하면, 모기의 눈이 X로 변할 것.
  //3.시간이 멈추면, 등수 등록할 것(아이디, 걸린 시간)
  //4.게임 시작버튼 만들 것
  //5.게임을 시작하면 '시작버튼'이 '재시작'이 될 것
  //6.'재시작'하면 재시작할 것
  //7.시작버튼 누르면 모기가 움직이기 시작함
  //8.게임이 멈추면, 게임오버 이미지와, 게임 등수(아이디, 걸린 시간)가 출력될 것
  //9.게임시작하면, 마우스 포인터를 '모기채'로 바꿀 것

  return (
    <div className="canvasBox">
      <canvas
        ref={canvasRef}
        height={height}
        width={width}
        className="canvas"
      />
      <p>
         This page is working
       </p>
    </div>
  );
}

export default Game;
