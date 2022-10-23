import { rejects } from "assert";
import { type } from "os";
import { resolve } from "path";

export type Data = RequestInfo | URL
export type pokeData = any[]

export const getAllPokemon = (url: Data) => fetch(url).then((res) => res.json())

export const getPokemon = (url:any) => fetch(url).then((res)=> res.json())
