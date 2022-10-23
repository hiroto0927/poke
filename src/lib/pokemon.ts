import { PokeApiInitResponse, PokeApiResponse } from "../types/apiResponse";

// export type Data = RequestInfo | URL;
// export type pokeData = any[];

export const getAllPokemon = (url: string): Promise<PokeApiInitResponse> =>
  fetch(url).then((res) => res.json());

export const getPokemon = (url: string): Promise<PokeApiResponse> =>
  fetch(url).then((res) => res.json());
