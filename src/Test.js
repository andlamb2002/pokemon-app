import React, { useEffect, useState } from "react";

function Test() {
    const [pokemonData, setPokemonData] = useState([]);
    const [filteredPokemon, setFilteredPokemon] = useState([]);

    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon?limit=2000&offset=0")
            .then((res) => res.json())
            .then((data) => {
                setPokemonData(data.results);
            });
    }, []);

    useEffect(() => {
        const fetchPokemonDetailsAndFilter = async () => {
            const pokemonDetails = await Promise.all(
                pokemonData.map(async (pokemon) => {
                    const response = await fetch(pokemon.url);
                    return response.json();
                })
            );

            const filteredPokemon = pokemonDetails.filter(
                (pokemon) =>
                    pokemon.types.some(
                        (type) => type.type.name === "electric"
                    ) &&
                    pokemon.stats[0].base_stat >= 50
            );

            const sortedFilteredPokemon = filteredPokemon.slice().sort((a, b) => {
                return a.name.localeCompare(b.name);
            });

            setFilteredPokemon(sortedFilteredPokemon);
        };

        fetchPokemonDetailsAndFilter();
    }, [pokemonData]);

    return (
        <>
            <ul>
                {filteredPokemon.map((pokemon) => (
                    <li key={pokemon.name}>{pokemon.name}</li>
                ))}
            </ul>
        </>
    );
}

export default Test;
