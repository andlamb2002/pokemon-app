import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from "react";
import HeaderTop from '../Components/HeaderTop'
import Sidebar from '../Components/Sidebar'

function About(props) {
    let { pokemonId } = useParams();

    const [pokemonData, setPokemonData] = useState(null);

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
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
                console.log(error.message);
            });
    }, [pokemonId]);

    return (
        <>
            {pokemonData && <HeaderTop name={pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}></HeaderTop>}
            <div className="flex flex-row justify-between">
                <Sidebar/>
                {pokemonData && (
                    <div className="text-textColor text-5xl">
                        <p>ID: {pokemonData.id}</p>
                        <p>Types: {pokemonData.types.map(type => type.type.name).join(", ")}</p>
                        <p>HP: {pokemonData.stats.find(stat => stat.stat.name === "hp").base_stat}</p>
                        <p>Attack: {pokemonData.stats.find(stat => stat.stat.name === "attack").base_stat}</p>
                        <p>Defense: {pokemonData.stats.find(stat => stat.stat.name === "defense").base_stat}</p>
                        <p>Speed: {pokemonData.stats.find(stat => stat.stat.name === "speed").base_stat}</p>
                        <img className="w-64 h-64" src={pokemonData.sprites.front_default} alt="front-sprite" />
                        <img className="w-64 h-64" src={pokemonData.sprites.back_default} alt="back-sprite" />
                    </div>
                )}
                <Sidebar />
            </div>
            
        </>
    );
}

export default About