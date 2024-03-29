// api.js
const fetchData = async () => {
    try {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon");
      const data = await response.json();
  
      // Enhance the data by adding name, type, and image URL
      const enhancedData = await Promise.all(
        data.results.map(async (pokemon) => {
          const pokemonDetailsResponse = await fetch(pokemon.url);
          const pokemonDetails = await pokemonDetailsResponse.json();
  
          const imageUrl =
            pokemonDetails.sprites.versions["generation-ii"].crystal.front_default;
  
          return {
            name: pokemon.name,
            type: pokemonDetails.types[0].type.name,
            imageUrl,
          };
        })
      );
  
      return enhancedData;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };
  
  export { fetchData };
  