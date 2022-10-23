/* eslint-disable @next/next/no-img-element */
import styles from "../styles/Home.module.css";
import { PokeApiResponse } from "../types/apiResponse";

type Props = {
  pokemon: PokeApiResponse;
};

export default function Card({ pokemon }: Props) {
  return (
    <div className=" text-center m-auto">
      <div className={styles.shadow}>
        <div className=" m-auto w-[100px] h-[100px] text-center mt-[50px] ">
          <img src={pokemon.sprites.front_default} alt="" />
        </div>

        <h3 className=" p-0 text-[24px] mb-[10px] mt-0">{pokemon.name}</h3>
        <div className="cardTypes">
          <div>タイプ</div>
          {pokemon.types.map((type: any, i: number) => {
            return (
              //keyの設定に問題あり
              <div key={i}>
                <div className=" typeName ">{type.type.name}</div>
              </div>
            );
          })}
        </div>
        <div className=" text-center">
          <div className="cardData">
            <h2 className="title">重さ:{pokemon.weight}</h2>
          </div>
          <div className="cardData">
            <p className="title">高さ:{pokemon.height}</p>
          </div>
          <div className="cardData">
            <p className="title">
              アビリティ:{pokemon.abilities[0].ability.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
