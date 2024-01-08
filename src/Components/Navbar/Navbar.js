import React from 'react';
import PropTypes from 'prop-types';
import logo from '../../Assessts/logo.png';

const Navbar = ({ setSearchTerm }) => {
  const handleSearchChange = (event) => {
    console.log('Event:', event);
    setSearchTerm(event.target.value);
  };
    
  return (
    <div className='flex justify-between bg-black p-5'>
      <div>
        <img src={logo} alt='logo' className='w-20' />
      </div>
      <div className='flex items-center order-2'>
        <input
          type='search'
          placeholder='Search for Pokemon'
          className='p-2 pl-10 rounded-tl-md rounded-bl-md'
          onChange={handleSearchChange}
        />
        <button
        type='button'
          className='p-2 bg-yellow-400 text-white rounded-r-md cursor-pointer'
        >
          search
        </button>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  setSearchTerm: PropTypes.func.isRequired,
};

export default Navbar;
