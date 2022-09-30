import React from 'react'
import Button from 'react-bootstrap/Button';

//udemy의 styled-components 참고
//6.게임 시작버튼 만들 것
    //6-1.게임을 시작하면 '시작버튼'이 '재시작'이 될 것
    //6-2.'재시작'하면 재시작할 것
    //6-3.시작버튼 누르면 모기가 움직이기 시작함
const StartButton = () => {
  return (
    <div>
      <Button variant="primary">Primary</Button>{' '}
    </div>
  )
}

export default StartButton