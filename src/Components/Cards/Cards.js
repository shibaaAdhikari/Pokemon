import React from 'react';
import logo from "../../../src/Assessts/logo.png";

const Cards = ({ name, type, description }) => {
  return (
    <div className='w-80 h-80 bg-white shadow-md text-center rounded-md'>
      <img src={logo} className='w-72 h-40 m-4 rounded-md' alt={`${name} Logo`} />
      <h3 className='text-purple-800 m-0 p-0 text-lg font-semibold'>{name}</h3>
      <p className='m-0 p-0 text-sm'>{type}</p>
      <p className='m-0 p-0 flex items-center'>
        {description}
      </p>
    </div>
  );
};

export default Cards;
