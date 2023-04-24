import React from "react";
import Card from "../Components/Card";
import PokemonStats from "../Components/PokemonStats";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const Main=()=>{
    const [pokeData,setPokeData]=useState([]);
    const [loading,setLoading]=useState(true);
    const [url,setUrl]=useState("https://pokeapi.co/api/v2/pokemon/")
    const [nextUrl,setNextUrl]=useState();
    const [prevUrl,setPrevUrl]=useState();
    const [pokeDex,setPokeDex]=useState();

    const pokemonActionDefiner=async()=>{
        setLoading(true)
        const res=await axios.get(url);
        setNextUrl(res.data.next);
        setPrevUrl(res.data.previous);
        getPokemon(res.data.results)
        setLoading(false)
    }
    const getPokemon=async(res)=>{
       res.map(async(item)=>{
          const result=await axios.get(item.url)
          setPokeData(state=>{
              state=[...state,result.data]
              state.sort((a,b)=>a.id>b.id?1:-1)
              return state;
          })
       })   
    }
    useEffect(()=>{
        pokemonActionDefiner();
    },[url])
    return(
        <>
            <div className="container">
                <div className="left-side">
                    <Card pokemon={pokeData} loading={loading} infoPokemon={poke=>setPokeDex(poke)}/>
                    
                    <div className="buttons">
                        {  prevUrl && <button onClick={()=>{
                            setPokeData([])
                           setUrl(prevUrl) 
                        }}>Previous</button>}

                        { nextUrl && <button onClick={()=>{
                            setPokeData([])
                            setUrl(nextUrl)
                        }}>Next</button>}

                    </div>
                    <a href="/about">About</a>
                </div>
                <div className="right-side">
                   <PokemonStats data={pokeDex}/>
                </div>
            </div>
        </>
    )
}
export default Main;