import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState, createContext } from "react";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import { getAllPokemon, getPokemon, pokeData } from "../lib/pokemon";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState<never[]>();
  const [nextUrl, setNextUrl] = useState<RequestInfo | URL>("");
  const [prevUrl, setPrevUrl] = useState<RequestInfo | URL>("");

  const loadPokemon = async (data: { url: any }[]) => {
    let _pokemonData = await Promise.all(
      data.map((pokemon: { url: any }) => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord as never;
      })
    );
    setPokemonData(_pokemonData);
  };

  console.log(pokemonData);

  useEffect(() => {
    const fetchPokemonData = async () => {
      // 全てのポケモンデータを取得
      let res = await getAllPokemon(initialURL);
      // 各ポケモンの詳細なデータを取得
      loadPokemon(res.results);
      // console.log(res);
      setPrevUrl(res.previous);
      setNextUrl(res.next);
      setLoading(false);
    };

    fetchPokemonData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="">
        {loading ? (
          <h1>ロード中</h1>
        ) : (
          <div className=" text-center bg-yellow-500">
            <div className=" text-center grid grid-cols-3 gap-[10px] ">
              {pokemonData?.map((pokemon, i) => {
                return <Card key={i} pokemon={pokemon} />;
              })}
            </div>
            <div className=" p-[30px] flex justify-center justify-items-center gap-5 ">
              <button
                className="p-[13px] pr-8 pl-8 bg-cyan-300 border-none"
                onClick={async () => {
                  if (!prevUrl) return;
                  setLoading(true);
                  let data = await getAllPokemon(prevUrl);
                  await loadPokemon(data.results);
                  setNextUrl(data.next);
                  setPrevUrl(data.previous);
                  console.log(prevUrl);
                  setLoading(false);
                }}
              >
                前へ
              </button>
              <button
                className="p-[13px] pr-8 pl-8 bg-cyan-300 border-none"
                onClick={async () => {
                  setLoading(true);
                  let data = await getAllPokemon(nextUrl);
                  console.log(data);
                  await loadPokemon(data.results);
                  setNextUrl(data.next);
                  setPrevUrl(data.previous);
                  setLoading(false);
                }}
              >
                次へ
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
