import React, { useState } from 'react';
// import Test from './Test.js'
// import Test2 from './Test2.js'
import Button from './Components/Button.js'
import Search from './Components/Search.js'
import Dropdown from './Components/Dropdown.js' 
import Number from './Components/Number.js'

function App() {

  const [searchInput, setSearchInput] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [numberInput, setNumberInput] = useState("");

  const handleSearch = () => {
    console.log("Search input:", searchInput);
  };

  const handleOptionSelect = (option) => {
      setSelectedOption(option);
      console.log("Selected option:", option);
  };

  const handleNumberChange = (value) => {
    setNumberInput(value);
  };

  const handleNumberSubmit = () => {
    console.log("Number input:", numberInput);
  };

  const handleReset = () => {
    setSearchInput("");
    setSelectedOption(null);
    setNumberInput(0);
  };

  const optionsArray = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

  return (
    <>
      {/* <Test></Test>
      <Test2></Test2> */}
      <Button name="🔍" onClick={handleSearch} />
      <Search setSearchInput={setSearchInput} /> 
      <Dropdown options={optionsArray} onSelect={handleOptionSelect} />
      <p>Selected option: {selectedOption}</p>
      <Button name="Submit Number" onClick={handleNumberSubmit} />
      <Number onNumberChange={handleNumberChange} />
      <Button name="Reset" color="red" onClick={handleReset} />
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
