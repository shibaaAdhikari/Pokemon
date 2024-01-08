import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar/Navbar';
import Cards from '../Components/Cards/Cards'; // Assuming your Cards component is in the correct path

const Homepage = () => {
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace 'https://pokeapi.co/api/v2/contest-type/berry_flavor/1' with the actual API endpoint you want to use
        const response = await fetch('https://pokeapi.co/api/v2/contest-type/berry_flavor/1');
        const data = await response.json();
        console.log(data);

        // Assuming the API response contains an array of Pokemon data
        setPokemonData(data.pokemon); // Adjust the property accordingly based on the API response structure
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures the effect runs only once on component mount

  return (
    <div>
      <Navbar />

      {/* Map over the fetched Pokemon data and render Cards component for each */}
      {pokemonData.map((pokemon) => (
        <Cards
          key={pokemon.id} // Make sure each Card has a unique key
          name={pokemon.name}
          type={pokemon.type}
          description={pokemon.description}
          // Add any other props you need to pass to Cards component
        />
      ))}
    </div>
  );
};

export default Homepage;
