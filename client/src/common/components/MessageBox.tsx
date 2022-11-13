import React from 'react'
import styled from 'styled-components';

const MessageBox = (props :any) => {
  return (
    <StyledMessageBox>{props.contents}</StyledMessageBox>
  )
}


const StyledMessageBox = styled.div`
   color:white;
   background-color:black;
   border: 2px solid white;
   border-radius: 25px;
   padding: 5px;
`;

export default MessageBox