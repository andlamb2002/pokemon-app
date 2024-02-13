import React, { useEffect, useState } from "react";

function Test2() {
    const [pokemonData, setPokemonData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon/25")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch data");
                }
                return res.json();
            })
            .then((data) => {
                setPokemonData(data);
            })
            .catch((error) => {
                setError(error.message);
            });
    }, []);

    return (
        <>
            {error && <div>Error: {error}</div>}
            {pokemonData && (
                <div>
                    <h2>{pokemonData.name}</h2>
                    <p>ID: {pokemonData.id}</p>
                    <p>Types: {pokemonData.types.map(type => type.type.name).join(", ")}</p>
                    <p>HP: {pokemonData.stats.find(stat => stat.stat.name === "hp").base_stat}</p>
                    <p>Attack: {pokemonData.stats.find(stat => stat.stat.name === "attack").base_stat}</p>
                    <p>Defense: {pokemonData.stats.find(stat => stat.stat.name === "defense").base_stat}</p>
                    <p>Speed: {pokemonData.stats.find(stat => stat.stat.name === "speed").base_stat}</p>
                </div>
            )}
        </>
    );
}

export default Test2;
