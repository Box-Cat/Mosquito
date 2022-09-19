import React from "react";

//Ball.js에서 불러옴
// export default class Ball {
//     constructor(color, radius, angle, speed) {
//       this.color = color;
//       this.radius = radius;
//       this.angle = angle;
//       this.speed = speed;
//       this.x = 0;
//       this.y = 0;
//       this.dx = Math.cos(angle) * speed;
//       this.dy = Math.sin(angle) * speed;
//       this.toRight = true;
//       this.toBottom = true;
//       this.iteration = 0;
//     }
//   }

class App extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    const canvas = this.canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    this.drawBalls();
  }  

  componentDidUpdate() {
    this.drawBalls();
  }

  drawBalls() {
    const { balls } = this.props;
    const canvas = this.canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);

    balls.forEach(ball => {
      const safeDistance = ball.radius * 10;
      context.fillStyle = ball.color;
      context.beginPath();
      context.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
      context.closePath();
      context.fill();

      let rightTouch, bottomTouch, leftTouch, topTouch;
      function doBounceIfNeeded() {
        rightTouch = ball.x >= canvas.width - ball.radius; //radius는 이미지의 가로 너비로 변경
        bottomTouch = ball.y >= canvas.height - ball.radius; //radius는 이미지의 세로 너비로 변경
        leftTouch = ball.x <= ball.radius;
        topTouch = ball.y <= ball.radius;

        if (rightTouch || leftTouch) {
          ball.toRight = !ball.toRight;
        }
        if (bottomTouch || topTouch) {
          ball.toBottom = !ball.toBottom;
        }
      }

      if (ball.toRight && ball.toBottom) {
        ball.x += ball.dx;
        ball.y += ball.dy;
        ball.iteration++;
        if (
          ball.iteration >= safeDistance / ball.dy - ball.radius ||
          ball.iteration >= safeDistance / ball.dx - ball.radius
        ) {
          doBounceIfNeeded();
        }
      } else if (!ball.toRight && ball.toBottom) {
        ball.x -= ball.dx;
        ball.y += ball.dy;
        ball.iteration++;
        if (
          ball.iteration >= safeDistance / ball.dy - ball.radius ||
          ball.iteration >= safeDistance / ball.dx - ball.radius
        ) {
          doBounceIfNeeded();
        }
      } else if (!ball.toRight && !ball.toBottom) {
        ball.x -= ball.dx;
        ball.y -= ball.dy;
        ball.iteration++;
        if (
          ball.iteration >= safeDistance / ball.dy - ball.radius ||
          ball.iteration >= safeDistance / ball.dx - ball.radius
        ) {
          doBounceIfNeeded();
        }
      } else if (ball.toRight && !ball.toBottom) {
        ball.x += ball.dx;
        ball.y -= ball.dy;
        ball.iteration++;
        if (
          ball.iteration >= safeDistance / ball.dy - ball.radius ||
          ball.iteration >= safeDistance / ball.dx - ball.radius
        ) {
          doBounceIfNeeded();
        }
      }
    });
  }

  render() {
    return <canvas className="canvas" ref={this.canvasRef}></canvas>;
  }
}

export default App;