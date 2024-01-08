import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar/Navbar";
import Cards from "../Components/Cards/Cards";
import Pokemon from "../Assessts/pokemon.avif";
import { fetchData } from "../API/api";

const Homepage = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAllPokemon, setShowAllPokemon] = useState(false);
  const CACHE_KEY = 'pokemonDataCache';
  const CACHE_EXPIRATION = 60 * 60 * 1000;

  const handleSearchChange = (value) => {
    if (value.length >= 1 || value === "") {
      setSearchTerm(value);
    }
  };

useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        // Check if cached data exists and is not expired
        const cachedData = localStorage.getItem(CACHE_KEY);
        const isCacheValid =
          cachedData && Date.now() - JSON.parse(cachedData).timestamp < CACHE_EXPIRATION;

        if (isCacheValid) {
          setPokemonData(JSON.parse(cachedData).data);
        } else {
          const enhancedData = await fetchData();
          setPokemonData(enhancedData);

          // Cache the data with timestamp
          localStorage.setItem(CACHE_KEY, JSON.stringify({ data: enhancedData, timestamp: Date.now() }));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataFromApi();
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
      <Navbar
        setSearchTerm={handleSearchChange}
        setShowAllPokemon={setShowAllPokemon}
      />
      <div className="flex justify-end pt-4 mx-14">
        {showAllPokemon ? (
          <h3
            onClick={handleHideClick}
            className="underline cursor-pointer text-yellow-700"
          >
            Hide
          </h3>
        ) : (
          <h3
            onClick={handleShowAllClick}
            className="underline cursor-pointer text-yellow-700"
          >
            Show All
          </h3>
        )}
      </div>
      <div className="flex flex-wrap justify-evenly m-5 p-5">
        {filteredPokemon.length === 0 ? (
          <div className="flex flex-col items-center">
            <h1 className="text-red-600 font-bold text-center w-80">
              "Oops! It seems like this Pokemon hasn't made its debut in our
              card collection yet. Why not explore other fascinating Pokemon?"
            </h1>
            <img
              src={Pokemon}
              alt="pokemon"
              className="h-40 w-40 m-5"
              style={{ borderRadius: "50%" }}
            />
          </div>
        ) : (
          filteredPokemon
            .slice(0, numberOfCardsToShow)
            .map((pokemon) => (
              <Cards
                key={pokemon.name}
                name={pokemon.name}
                image={pokemon.imageUrl}
                type={pokemon.type}
              />
            ))
        )}
      </div>
    </div>
  );
};

export default Homepage;
