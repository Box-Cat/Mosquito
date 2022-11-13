import React from 'react'

interface propsType {
    text:string;
}

const Display = ({text}:propsType) => {
  return (
    <div>
      {text}
    </div>
  );
}

export default Display