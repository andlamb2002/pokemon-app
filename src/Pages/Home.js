import React, { useState, useEffect } from 'react';
import HeaderTop from '../Components/HeaderTop';
import Sidebar from '../Components/Sidebar';
import Card from '../Components/Card';

export default function Home() {
    const [pokemonList, setPokemonList] = useState([]);
    const [filteredPokemonList, setFilteredPokemonList] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [selectedOption, setSelectedOption] = useState("");
    const [filterArray, setFilterArray] = useState([]);

    const limit = 40;
    const offset = 0;

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

    const handleEnterPress = (value) => {
        setSearchInput(value);
    };

    const handleDropdownInputChange = (option) => {
        setSelectedOption(option);
    }

    const handleSidebarLogs = (logs) => {
        setFilterArray(logs);
    };

    useEffect(() => {
        console.log("Effect");
        const pokemonListCopy = [...pokemonList];
        let filterList = pokemonListCopy.filter(pokemon => pokemon.name.toLowerCase().includes(searchInput.toLowerCase()));

            const [type, minHp, maxHp, minAtk, maxAtk, minDef, maxDef, minSpd, maxSpd] = filterArray;
    
            filterList = filterList.filter(pokemon => {
                if (type && type.toLowerCase() !== "type") {
                    const pokemonType = pokemon.types && pokemon.types.length > 0 &&
                        pokemon.types[0].type && pokemon.types[0].type.name.toLowerCase();
                    if (pokemonType !== type.toLowerCase()) return false;
                }
    
                const hpStat = pokemon.stats.find(stat => stat.stat.name === "hp").base_stat;
                if ((minHp && hpStat < minHp) || (maxHp && hpStat > maxHp)) return false;
    
                const atkStat = pokemon.stats.find(stat => stat.stat.name === "attack").base_stat;
                if ((minAtk && atkStat < minAtk) || (maxAtk && atkStat > maxAtk)) return false;
    
                const defStat = pokemon.stats.find(stat => stat.stat.name === "defense").base_stat;
                if ((minDef && defStat < minDef) || (maxDef && defStat > maxDef)) return false;
    
                const spdStat = pokemon.stats.find(stat => stat.stat.name === "speed").base_stat;
                if ((minSpd && spdStat < minSpd) || (maxSpd && spdStat > maxSpd)) return false;
    
                return true;
            });

        if (selectedOption === "ID (Asc)") {
            filterList.sort((a, b) => a.id - b.id); 
        } else if (selectedOption === "ID (Desc)") {
            filterList.sort((a, b) => b.id - a.id); 
        } else if (selectedOption === "Name (Asc)") {
            filterList.sort((a, b) => a.name.localeCompare(b.name)); 
        } else if (selectedOption === "Name (Desc)") {
            filterList.sort((a, b) => b.name.localeCompare(a.name)); 
        }

        setFilteredPokemonList(filterList.slice(offset, limit));
        
    }, [searchInput, selectedOption, filterArray, pokemonList, offset, limit]); 
    

    return (
        <>
            <HeaderTop searchInput={true} 
                onSearchInputChange={handleSearchInputChange}
                onDropdownInputChange={handleDropdownInputChange}
                onEnterPress={handleEnterPress}
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
