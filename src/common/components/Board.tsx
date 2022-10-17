import React from 'react'
import styled from 'styled-components';
import { FlexBox } from 'common/styledComponents/Style';

const Board = (props :any) => {
  
    //relative absolute 적용해서 canvas가리기
    return (
    <FlexBox>
        <StyledBoard>{props.score}</StyledBoard> 
    </FlexBox>
    //<div>props.score</div>
    //<div>props.id</div>
    //<div>props.rank</div>
  )
}

//width(canvas와 동일)는 관리하기 쉽도록, 나중에 연동
const StyledBoard = styled.button`
   color:white;
   width: 1000px; 
   background-color:black;
   border: 2px solid white;
   border-radius: 25px;
   padding: 5px;
`;

// const FlexBox = styled.div`
//     display: flex;
//     flex-wrap: wrap;
//     justify-content:center;

//     .flex-1{
//         flex: 1;
//     }
// `

export default Board