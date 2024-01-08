import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar/Navbar';
import Cards from '../Components/Cards/Cards';

const Homepage = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https:/pokeapi.co/api/v2/pokemon');
        const data = await response.json();
        console.log(data);
        setPokemonData(data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const filteredPokemon = pokemonData.filter((pokemon) =>
  pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
);

  return (
    <div>
      <Navbar setSearchTerm={setSearchTerm}/>
      <div className='flex flex-wrap justify-evenly m-5 p-5'>

      {filteredPokemon.map((pokemon) => (
        <Cards
          name={pokemon.name}
          image={pokemon.url}

        />
      ))}
      </div>
    </div>
  );
};

export default Homepage;

