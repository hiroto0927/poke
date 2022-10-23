import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import MoveButton from "../components/MoveButton";
import Navbar from "../components/Navbar";
import { getAllPokemon, getPokemon } from "../lib/pokemon";
import { PokeApiResponse } from "../types/apiResponse";

const INITIAL_URL = "https://pokeapi.co/api/v2/pokemon";

const Home: NextPage = () => {
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState<PokeApiResponse[]>();
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");

  const loadPokemon = async (data: { name: string; url: string }[]) => {
    const _pokemonData = await Promise.all(
      data.map((pokemon) => getPokemon(pokemon.url))
    );
    setPokemonData(_pokemonData);
  };

  console.log({ pokemonData });

  useEffect(() => {
    const fetchPokemonData = async () => {
      // 全てのポケモンデータを取得
      let res = await getAllPokemon(INITIAL_URL);
      // 各ポケモンの詳細なデータを取得
      loadPokemon(res.results);
      // console.log(res);
      setPrevUrl(res.previous);
      setNextUrl(res.next);
      setLoading(false);
    };

    fetchPokemonData();
  }, []);

  const onClickMoveButton = (url?: string) => {
    return async () => {
      // URLの存在チェック
      if (!url) return;

      // ローディング表示
      setLoading(true);

      // データの取得 & セット
      let data = await getAllPokemon(url);
      await loadPokemon(data.results);
      setNextUrl(data.next);
      setPrevUrl(data.previous);

      // ページ表示
      setLoading(false);
    };
  };

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
              <MoveButton onClick={onClickMoveButton(prevUrl)}>前へ</MoveButton>
              <MoveButton onClick={onClickMoveButton(nextUrl)}>次へ</MoveButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
