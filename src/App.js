import React, { useState, useEffect } from 'react';
import HeaderTop from './Components/HeaderTop'
import Sidebar from './Components/Sidebar';
import Card from './Components/Card';

function App() {

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
              <Card key={pokemon.id} name={pokemon.name} sprite={pokemon.sprite} onClick={() => handleCardClick(pokemon.id)} />
            ))}
          </div>
        </div>
        <Sidebar></Sidebar>
      </div>
      {/* <Testing></Testing> */}
    </>
    
    );
}

export default App;







// import { BrowserRouter } from "react-router-dom";
// import { Routes, Route } from "react-router";
// import About from './About'
// import Home from './Home'
// import './App.css';
// import { useEffect, useState } from "react";
// import { Link } from 'react-router-dom'

// function App() {

//   const [pokemonsData, setPokemonsData] = useState([]);
//   const [inputSearch, setInputSearch] = useState([]);
//   const [filteredPokemon, setFilteredPokemon] = useState([]);

//   useEffect(() => {
//     fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=300")
//       .then((res) => res.json())
//       .then((data) => {
//         const results = data.results.map((pokemonDetails, index) => {
//           // console.log(res.results.pokemonData)
//           return { ...pokemonDetails, index: index + 1 };
//         });
//         setPokemonsData({ ...data, results })
//       });

//   }, []);

//   useEffect(() => {
//     if (!inputSearch) {
//       setFilteredPokemon([]);
//       return;
//     }

//     setFilteredPokemon(() =>
//       pokemonsData.results?.filter((pokemon) => pokemon.name.includes(inputSearch))
//     );
//   }, [pokemonsData.results, inputSearch]);

//   return (
//     <BrowserRouter>
//       <div className="p-14">
//         <div className="flex flex-col items-center">
//           <Link to="/">
//             <header className="text-4xl text-yellow-700">Pokemon Picker</header>
//           </Link>
//         </div>
//         <div className="w-full flex justify-center">
//           <input
//             onChange={(e) => setInputSearch(e.target.value)}
//             placeholder="Enter Pokemon here"
//             type="text"
//             className="mt-10 p-2 border-blue-500 border-2"
//           />
//         </div>
//       </div>

//       <Routes>
//         <Route path="/about/:pokemonId" element={<About />}>
//         </Route>
//         {filteredPokemon &&
//           <Route path="/" element=
//             {<Home pokemonProp={filteredPokemon} />}>
//           </Route>
//         }
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
