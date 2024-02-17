import React, { useState, useEffect } from 'react';
import HeaderTop from '../Components/HeaderTop';
import Sidebar from '../Components/Sidebar';
import Card from '../Components/Card';

export default function Home() {
    const [pokemonList, setPokemonList] = useState([]);
    const [filteredPokemonList, setFilteredPokemonList] = useState([]);
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

    useEffect(() => {
        console.log(pokemonList);
    }, [pokemonList]);

    const handleCardClick = (id) => {
        console.log("Pokemon ID:", id);
    };

    const handleSearchInputChange = (value) => {
        const filteredList = pokemonList.filter(pokemon => pokemon.name.toLowerCase().includes(value.toLowerCase())).slice(0, 50);
        setFilteredPokemonList(filteredList);
    };

    const handleDropdownInputChange = (option) => {
        setSelectedOption(option);
    }

    // const handleSidebarLogs = (logs) => {
    //     if (logs.length === 0 || logs[0] === null) {
    //         setFilteredPokemonList(pokemonList.slice(0, 50));
    //         return;
    //     }
    
    //     const [type] = logs;
        
    //     const filteredList = pokemonList.filter(pokemon => {
    //         if (type === "" || type.toLowerCase() === "type") {
    //             return true;
    //         }
            
    //         if (pokemon.types && pokemon.types.length > 0 && pokemon.types[0].type && pokemon.types[0].type.name.toLowerCase() === type.toLowerCase()) {
    //             return true;
    //         }
    //         return false;
    //     }).slice(0, 50);
        
    //     setFilteredPokemonList(filteredList);
    // };

    useEffect(() => {
        if (selectedOption) {
            let sortedList = [...pokemonList];
    
            if (selectedOption === "ID (Asc)") {
                sortedList.sort((a, b) => a.id - b.id); 
            } else if (selectedOption === "ID (Desc)") {
                sortedList.sort((a, b) => b.id - a.id); 
            } else if (selectedOption === "Name (Asc)") {
                sortedList.sort((a, b) => a.name.localeCompare(b.name)); 
            } else if (selectedOption === "Name (Desc)") {
                sortedList.sort((a, b) => b.name.localeCompare(a.name)); 
            }
    
            setFilteredPokemonList(sortedList.slice(0, 50));
        }
    }, [selectedOption, pokemonList]); 
    

    return (
        <>
            <HeaderTop searchInput={true} 
                onSearchInputChange={handleSearchInputChange}
                onDropdownInputChange={handleDropdownInputChange}
                 />
            <div className="flex flex-row justify-between">
                {/* <Sidebar blank={false} onLogs={handleSidebarLogs} /> */}
                <Sidebar></Sidebar>
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
