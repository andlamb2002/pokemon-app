import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import HeaderTop from '../Components/HeaderTop'
import Sidebar from '../Components/Sidebar'
import Button from '../Components/Button'

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

    const navigate = useNavigate(); 

    const goBack = () => {
        navigate(-1);
    };

    return (
        <>
            {pokemonData && <HeaderTop name={pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}></HeaderTop>}
            <div className="flex flex-row justify-between">
                <div className="flex flex-row">
                    <Sidebar/>
                    {pokemonData && (
                        <div className="flex flex-row text-textColor text-5xl mx-4">
                            <div className="min-w-64 max-w-64 m-4">
                                <img className="w-64 h-64" src={pokemonData.sprites.front_default} alt="front-sprite" />
                                <img className="w-64 h-64" src={pokemonData.sprites.back_default} alt="back-sprite" />
                                <Button name="Back" onClick={goBack} />
                            </div>
                            <div>
                                <div className="bg-lightRed p-4 rounded">
                                    <p>ID: {pokemonData.id}</p>
                                    <div className="my-8">
                                        <p className="my-2">Types:</p>
                                        <p className="my-2">{pokemonData.types.map(type => type.type.name).join(", ")}</p>
                                    </div>
                                    <div className="my-8">
                                        <p className="my-2">❤️ HP: {pokemonData.stats.find(stat => stat.stat.name === "hp").base_stat}</p>
                                        <p className="my-2">⚔️ Attack: {pokemonData.stats.find(stat => stat.stat.name === "attack").base_stat}</p>
                                        <p className="my-2">🛡️ Defense: {pokemonData.stats.find(stat => stat.stat.name === "defense").base_stat}</p>
                                        <p className="my-2">💨 Speed: {pokemonData.stats.find(stat => stat.stat.name === "speed").base_stat}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                
                <Sidebar />
            </div>
            
        </>
    );
}

export default About