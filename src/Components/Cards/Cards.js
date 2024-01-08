  import React from 'react';
  import logo from "../../../src/Assessts/logo.png";

  const Cards = ({name,image}) => {
    return (
      <div className='w-80 h-80 m-5 bg-black shadow-md text-center rounded-md'>
        <img src={image} className='w-72 h-40 m-4 rounded-md' alt={`${name} Logo`} />
        <h3 className='text-yellow-800 m-0 p-0 text-lg font-semibold'>{name}</h3>
      </div>
    );
  };

  export default Cards;
