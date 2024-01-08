import React from 'react';
import PropTypes from "prop-types"
import logo from "../../../src/Assessts/logo.png";

const Cards = ({ name, image,type }) => {
  return (
    <div className='sm:w-60 md:w-80 lg:w-96 xl:w-80 h-80 m-5 bg-black shadow-md text-center rounded-md transition duration-300 ease-in-out transform hover:scale-105'>
      <img src={image} className='w-64 sm:w-40 md:w-72 lg:w-80 xl:w-72 h-40 m-4 rounded-md' alt={`${name} Logo`} />
      <h3 className='text-yellow-700 m-0 p-0 text-lg font-semibold'>{name}</h3>
      <h2 className='text-yellow-700'>{type}</h2>
    </div>
  );
};

Cards.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  type:PropTypes.string.isRequired,
};

export default Cards;
