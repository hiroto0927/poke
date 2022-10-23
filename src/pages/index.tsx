import type { NextPage } from "next";
import Card from "../components/Card";
import MoveButton from "../components/MoveButton";
import Navbar from "../components/Navbar";
import usePoke from "../hooks/customs/usePoke";
import LoadingProvider from "../providers/loading";

const Home: NextPage = () => {
  const { loading, pokemonData, onClickPrev, onClickNext } = usePoke();

  return (
    <div>
      <LoadingProvider>
        <>
          <Navbar />
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
                <MoveButton onClick={onClickPrev}>前へ</MoveButton>
                <MoveButton onClick={onClickNext}>次へ</MoveButton>
              </div>
            </div>
          )}
        </>
      </LoadingProvider>
    </div>
  );
};

export default Home;
