import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar/Navbar';
import Cards from '../Components/Cards/Cards';
import Pokemon from "../Assessts/pokemon.avif"

const Homepage = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAllPokemon, setShowAllPokemon] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon');
        const data = await response.json();
        setPokemonData(data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (value) => {
    // Trigger the search only when the search term length is greater than or equal to 1
    if (value.length >= 1 || value === '') {
      setSearchTerm(value);
    }
  };

  // Filter Pokemon data based on the search term
  const filteredPokemon = pokemonData.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Determine the number of cards to display based on showAllPokemon state
  const numberOfCardsToShow = showAllPokemon ? filteredPokemon.length : 10;
  const handleShowAllClick = () => {
    setShowAllPokemon(true);
  };
  const handleHideClick = () => {
    setShowAllPokemon(false);
  };

  return (
    <div>
      <Navbar setSearchTerm={handleSearchChange} setShowAllPokemon={setShowAllPokemon} />
      <div className='flex justify-end pt-4 mx-14'>
        {showAllPokemon ? (
          <h3 onClick={handleHideClick} className='underline cursor-pointer text-yellow-700'>
            Hide
          </h3>
        ) : (
          <h3 onClick={handleShowAllClick} className='underline cursor-pointer text-yellow-700'>
            Show All
          </h3>
        )}
      </div>
      <div className='flex flex-wrap justify-evenly m-5 p-5'>
        {filteredPokemon.length === 0 ? (
            <div className='flex flex-col items-center'>
            <h1 className="text-red-600 font-bold text-center w-80">
             "Oops! It seems like this Pokemon hasn't made its debut in our card collection yet. Why not explore other fascinating Pokemon?"
            </h1>
            <img src={Pokemon} alt='pokemon' className='h-40 w-40 m-5' style={{ borderRadius: '50%' }} />
          </div>
        ) : (
          filteredPokemon.slice(0, numberOfCardsToShow).map((pokemon) => (
            <Cards key={pokemon.name} name={pokemon.name} image={pokemon.url} />
          ))
        )}
      </div>
    </div>
  );
};

export default Homepage;
