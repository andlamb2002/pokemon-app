import React, { useState, useEffect } from 'react';
import HeaderTop from '../Components/HeaderTop';
import Sidebar from '../Components/Sidebar';
import Card from '../Components/Card';

export default function Home() {
    const [pokemonList, setPokemonList] = useState([]);
    const [filteredPokemonList, setFilteredPokemonList] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [selectedOption, setSelectedOption] = useState("");

    let limit = 50;
    let offset = 0;

    useEffect(() => {
        console.log("Fetching data...")
        fetch(`https://pokeapi.co/api/v2/pokemon?limit=500&offset=0`) 
            .then((res) => res.json())
            .then(async (data) => {
                const pokemonArray = await Promise.all(data.results.map(async (pokemon) => {
                    const response = await fetch(pokemon.url);
                    const pokemonData = await response.json();
                    return {
                        id: pokemonData.id,
                        name: pokemonData.name,
                        sprite: pokemonData.sprites.front_default, 
                        types: pokemonData.types,
                        stats: pokemonData.stats
                    };
                }));
                setPokemonList(pokemonArray);
                setFilteredPokemonList(pokemonArray.slice(offset, limit));
            });
    }, [limit, offset]);

    const handleCardClick = (id) => {
        console.log("Pokemon ID:", id);
    };

    const handleSearchInputChange = (value) => {
        console.log("setSearchInput")
        setSearchInput(value);
    };

    const handleDropdownInputChange = (option) => {
        setSelectedOption(option);
    }

    const handleSidebarLogs = (logs) => {
        if (logs[0] === "Type" || logs[0] === null) {
            console.log("No type selected");
        }
        
        console.log(logs);
        
    };

    useEffect(() => {
        console.log("Effect");
        const pokemonListCopy = [...pokemonList];
        let searchList = pokemonListCopy.filter(pokemon => pokemon.name.toLowerCase().includes(searchInput.toLowerCase()));

        if (selectedOption === "ID (Asc)") {
            searchList.sort((a, b) => a.id - b.id); 
        } else if (selectedOption === "ID (Desc)") {
            searchList.sort((a, b) => b.id - a.id); 
        } else if (selectedOption === "Name (Asc)") {
            searchList.sort((a, b) => a.name.localeCompare(b.name)); 
        } else if (selectedOption === "Name (Desc)") {
            searchList.sort((a, b) => b.name.localeCompare(a.name)); 
        }

        setFilteredPokemonList(searchList.slice(0, 50));
        
    }, [searchInput, selectedOption, pokemonList]); 
    

    return (
        <>
            <HeaderTop searchInput={true} 
                onSearchInputChange={handleSearchInputChange}
                onDropdownInputChange={handleDropdownInputChange}
                 />
            <div className="flex flex-row justify-between">
                <Sidebar blank={false} onLogs={handleSidebarLogs} />
                <div className="flex justify-center">
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2">
                        {filteredPokemonList.map((pokemon) => (
                            <Card key={pokemon.id} id={pokemon.id} name={pokemon.name} sprite={pokemon.sprite} onClick={() => handleCardClick(pokemon.id)} />
                        ))}
                    </div>
                </div>
                <Sidebar />
            </div>
        </>
    );
}
