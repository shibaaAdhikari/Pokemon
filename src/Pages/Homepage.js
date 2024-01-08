import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar/Navbar';
import Cards from '../Components/Cards/Cards';

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
      <Navbar setSearchTerm={setSearchTerm} setShowAllPokemon={setShowAllPokemon} />
      <div className='flex justify-end pt-4 mx-14'>
      {showAllPokemon ? (
          <h3 onClick={handleHideClick} className='underline cursor-pointer text-yellow-700'>Hide </h3>
        ) : (
          <h3 onClick={handleShowAllClick} className='underline cursor-pointer text-yellow-700'>Show All</h3>
        )}
      </div>
      <div className='flex flex-wrap justify-evenly m-5 p-5'>
        {filteredPokemon.slice(0, numberOfCardsToShow).map((pokemon) => (
          <Cards key={pokemon.name} name={pokemon.name} image={pokemon.url} />
        ))}
      </div>
    </div>
  );
};

export default Homepage;
