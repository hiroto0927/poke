import { MouseEventHandler, useContext } from "react";
import { LoadingContext } from "../providers/loading";

type PropsMoveButton = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
};

export default function MoveButton(props: PropsMoveButton) {
  const { state, dispatch } = useContext(LoadingContext);

  dispatch({ type: "startLoad" });
  dispatch({ type: "endLoad" });
  return (
    <button
      className={`p-[13px] pr-8 pl-8 ${
        state ? "bg-red-300" : "bg-cyan-300"
      } border-none`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
