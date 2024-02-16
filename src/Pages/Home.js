import React, { useState, useEffect } from 'react';
import HeaderTop from '../Components/HeaderTop'
import Sidebar from '../Components/Sidebar';
import Card from '../Components/Card';

export default function Home()  {

  const [pokemonList, setPokemonList] = useState([]);

  let limit = 50;
  let offset = 0;

    useEffect(() => {
      fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
      .then((res) => res.json())
        .then((data) => {
          const pokemonArray = data.results.map((pokemon) => ({
            id: pokemon.url.split("/")[6], 
            name: pokemon.name,
            sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.url.split("/")[6]}.png` // Constructing sprite URL
          }));
          setPokemonList(pokemonArray);
        });
    }, [limit, offset]);

    useEffect(() => {
      console.log(pokemonList);
    }, [pokemonList]);

    const handleCardClick = (id) => {
      console.log("Pokemon ID:", id);
    }; 

  return (
    <>
      <HeaderTop searchInput={true}></HeaderTop>
      <div className="flex flex-row justify-between">
        <Sidebar blank={false}></Sidebar>
        <div className="flex justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2">
            {pokemonList.map((pokemon) => (
              <Card key={pokemon.id} id={pokemon.id} name={pokemon.name} sprite={pokemon.sprite} onClick={() => handleCardClick(pokemon.id)} />
            ))}
          </div>
        </div>
        <Sidebar></Sidebar>
      </div>
    </>
    
    );
}





// import React from "react";
// import { Link } from "react-router-dom";

// export default function Home({ pokemonProp: results }) {
//     // console.log(results);
//     return (
//         <div className="mt-10 p-4 flex flex-wrap">
//             {results &&
//                 results.map((val) => (
//                     <div className="ml-4 text-2xl text-blue-400 " key={val.index}>
//                         <Link to={`/about/${val.index}`}>{val.name}</Link>
//                     </div>
//                 ))}
//         </div>
//     );
// }