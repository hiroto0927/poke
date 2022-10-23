import { useCallback, useEffect, useState } from "react";
import { getAllPokemon, getPokemon } from "../../lib/pokemon";
import { PokeApiResponse } from "../../types/apiResponse";

const INITIAL_URL = "https://pokeapi.co/api/v2/pokemon";

export default function usePoke() {
  const [url, setUrl] = useState(INITIAL_URL);
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState<PokeApiResponse[]>();
  const [nextUrl, setNextUrl] = useState<string | undefined>("");
  const [prevUrl, setPrevUrl] = useState<string | undefined>("");

  if (!loading) console.log({ pokemonData });

  const fetchPokemonData = async (url: string) => {
    setLoading(true);
    // 全てのポケモンデータを取得
    let res = await getAllPokemon(url);
    setPokemonData(
      await Promise.all(res.results.map((pokemon) => getPokemon(pokemon.url)))
    );
    setPrevUrl(res.previous);
    setNextUrl(res.next);
    setLoading(false);
  };

  useEffect(() => {
    if (url) {
      fetchPokemonData(url);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  const onClickMoveButton = useCallback(
    (url?: string) => {
      return () => {
        if (!url) return;
        setUrl(url);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return {
    loading,
    pokemonData,
    onClickPrev: onClickMoveButton(prevUrl),
    onClickNext: onClickMoveButton(nextUrl),
  };
}
