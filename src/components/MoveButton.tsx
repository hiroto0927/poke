import { MouseEventHandler } from "react";

type PropsMoveButton = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
};

export default function MoveButton(props: PropsMoveButton) {
  return (
    <button
      className="p-[13px] pr-8 pl-8 bg-cyan-300 border-none"
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
