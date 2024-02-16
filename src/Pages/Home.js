import React, { useState, useEffect } from 'react';
import HeaderTop from '../Components/HeaderTop';
import Sidebar from '../Components/Sidebar';
import Card from '../Components/Card';

export default function Home() {
    const [pokemonList, setPokemonList] = useState([]);
    const [filteredPokemonList, setFilteredPokemonList] = useState([]);

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon?limit=50&offset=0`)
            .then((res) => res.json())
            .then(async (data) => {
                const pokemonArray = await Promise.all(data.results.map(async (pokemon) => {
                    const response = await fetch(pokemon.url);
                    const pokemonData = await response.json();
                    return {
                        id: pokemonData.id,
                        name: pokemonData.name,
                        sprite: pokemonData.sprites.front_default, 
                    };
                }));
                setPokemonList(pokemonArray);
                setFilteredPokemonList(pokemonArray);
            });
    }, []);

    useEffect(() => {
        console.log(pokemonList);
    }, [pokemonList]);

    const handleCardClick = (id) => {
        console.log("Pokemon ID:", id);
    };

    const handleSearchInputChange = (value) => {
        console.log("Search input:", value);
        const filteredList = pokemonList.filter(pokemon => pokemon.name.toLowerCase().includes(value.toLowerCase()));
        setFilteredPokemonList(filteredList);
    };

    return (
        <>
            <HeaderTop searchInput={true} onSearchInputChange={handleSearchInputChange} />
            <div className="flex flex-row justify-between">
                <Sidebar blank={false} />
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
