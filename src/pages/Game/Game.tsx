import React, { useState, useEffect, useRef } from "react";
import imgMosquito0 from "./images/mosquito0.png";
import imgMosquito1 from "./images/mosquito1.png";
import imgMosquito2 from "./images/mosquito2.png";
import imgMosquito3 from "./images/mosquito3.png";
import '../../App.css';
import Timer from '../../common/components/Timer';

interface mosquito {
  mosquitoCount: number;
  speed: number;
  MosquitoArr: any[]
}

function Game() {
  //변수, 객체 선언
  const [seconds, setSeconds] = useState(60);
  const [count, setCount] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const width: number = 1000;
  const height: number = 700;
  const clicker: any[] = [];
  let mosquitoImgArr: any[] = [];
  let mosquitoImgArrTemp: any[] = [];
  let imgNumber = 4;

  const game = {
    req: '', score: 0
  };
  const mosquito: mosquito = {
    mosquitoCount: 10
    , speed: 1
    , MosquitoArr: []
  };


  //모기 이미지 입력
  mosquitoImgArrTemp = [imgMosquito0, imgMosquito1, imgMosquito2, imgMosquito3];
  for (let i = 0; i < imgNumber; i++) {
    mosquitoImgArr[i] = new Image();
    mosquitoImgArr[i].src = mosquitoImgArrTemp[i]
  }

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
      ctx.fillRect(0, 0, canvas.width, canvas.height);
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

        //모기 벽 튕기기
        bub.y -= bub.dy * bub.speed; //원본
        bub.x -= bub.dx * bub.speed; //원본
        //bub.y -= 0; //테스트
        //bub.x -= 0; //테스트
        if (bub.y >= height - bub.size || bub.y < 0) {
          bub.dy *= -1;
        } else if (bub.x >= width - bub.size || bub.x < 0) {
          bub.dx *= -1;
        }

        // clicker.forEach((dot) => { // 없어도 마우스 클릭 삭제 잘됨
        //   if (colCheck(bub, dot)) {
        //     let popped = mosquito.MosquitoArr.splice(index, 1);
        //     let val = Math.ceil(popped[0].size);
        //     let val1 = Math.ceil(popped[0].speed);
        //     console.log("popped", popped);
        //     console.log("val", val);
        //     console.log("val1", val1);
        //     game.score += val + (val1 * 3);
        //   }
        // })
        drawMosquito(bub.img, bub.x, bub.y);
      })

      //시간표시

      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.fillRect(0, 20, canvas.width, 40);
      ctx.beginPath();
      ctx.fillStyle = 'white';
      ctx.font = '36px serif';
      ctx.textAlign = 'center';
      let tempOutput = `SCORE : ${game.score}, ${seconds}`;
      ctx.fillText(tempOutput, canvas.width / 2, 50);

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
      let imgNum: number = Math.floor(Math.random() * imgNumber);
      mosquito.MosquitoArr.push({
        img: mosquitoImgArr[imgNum],
        x: xPos,
        y: yPos,
        size: mosquitoSize,
        speed: Math.floor(Math.random() * 5) + mosquito.speed,
        dx: directionX,
        dy: directionY
      });
    }

    function drawMosquito(img: any, xPos: number, yPos: number) {
      if (!canvas) return;
      if (!ctx) return;
      ctx.drawImage(img, xPos, yPos);
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
        if (colCheck(bub, mouseClick)) {
          mosquito.MosquitoArr.splice(index, 1);
          console.log("나니?")
          game.score += 1;
        }
      })
    })

    //마우스 원과 모기 접촉 체크
    function colCheck(a: any, b: any) {
      let hit = a.x < b.x + b.size && a.x + a.size > b.x && a.y < b.y + b.size && a.y + a.size > b.y;
      return hit;
    }

    //함수 호출
    draw();
  }

  function timer() {
    const interval = setInterval(() => {
      setSeconds(seconds =>
        seconds === 0 ? seconds = 0 : seconds - 1
      );
    }, 1000);
    return () => clearInterval(interval);
  }


  useEffect(() => {
    onStart();
    timer()
    // const interval = setInterval(() => {
    //   setSeconds(seconds =>
    //     seconds === 0 ? seconds = 0 : seconds - 1
    //   );
    // }, 1000);
    // return () => clearInterval(interval);
  }, [])

  //1.로그인을 해야만, 게임을 할 수 있게 할 것 >> 로그인 페이지 부터(redux)
  //2.시간이 멈추면, 등수 등록할 것(아이디, 걸린 시간)
  //3.게임 시작버튼 만들 것
  //4.게임을 시작하면 '시작버튼'이 '재시작'이 될 것
  //5.'재시작'하면 재시작할 것
  //6.시작버튼 누르면 모기가 움직이기 시작함
  //7.게임이 멈추면, 게임오버 이미지와, 게임 등수(아이디, 걸린 시간)가 출력될 것
  //8.게임시작하면, 마우스 포인터를 '모기채'로 바꿀 것

  return (
    <div className="canvasBox">
      <canvas
        ref={canvasRef}
        height={height}
        width={width}
        className="canvas"
      />
      <div>
        <button id="startGame">Start game</button>
        <Timer />
        SCORE: {count}
      </div>
    </div>
  );
}

export default Game;
