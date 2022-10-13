import React from 'react'
import styled from 'styled-components';

const Button = (props : any) => {
  return (
    <StyledButton onClick={props.onClick}>{props.name}</StyledButton>
  )
}

const StyledButton = styled.button`
   color:white;
   background-color:black;
   border: 2px solid white;
   border-radius: 25px;
   padding: 5px;
`;

export default Button