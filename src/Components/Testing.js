import React, { useState, useEffect} from 'react';
import Button from './Button.js'
import Search from './Search.js'
import Dropdown from './Dropdown.js' 
import Number from './Number.js'
import Card from './Card.js'

function Testing() {

  const [searchInput, setSearchInput] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [numberInput, setNumberInput] = useState("");
  const [formKey, setFormKey] = useState(10);
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
    setFormKey(formKey + 1);
    setSelectedOption(null);
    setNumberInput(0);
  };

  const handleCardClick = (id) => {
    console.log("Pokemon ID:", id);
};

  const optionsArray = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

  return (
    <>
      <Button name="🔍" onClick={handleSearch} />
      <Search setSearchInput={setSearchInput} /> 
      
      {/* eslint-disable-next-line no-script-url */}
      <form key={formKey} action="javascript:void(0)" method="post">
        <Dropdown key={formKey} options={optionsArray} onSelect={handleOptionSelect} />
        <p>Selected option: {selectedOption}</p>
        <Button name="Submit Number" onClick={handleNumberSubmit} />
        <Number name="Min" onNumberChange={handleNumberChange} />
        <Button name="Reset" color="red" onClick={handleReset} />
      </form>

      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 xl:grid-cols-5">
          {pokemonList.map((pokemon) => (
            <Card key={pokemon.id} name={pokemon.name} sprite={pokemon.sprite} onClick={() => handleCardClick(pokemon.id)} />
          ))}
        </div>
      </div>
      
      
      
      
    </>
    
    );
}

export default Testing;
