import { createContext } from "react";
import {
  defaultLoadingContext,
  useLoadingReducer,
} from "../hooks/reducers/loading";

type PropsProvider = {
  children: JSX.Element;
};

export const LoadingContext = createContext(defaultLoadingContext);

export default function LoadingProvider(props: PropsProvider) {
  return (
    <LoadingContext.Provider value={useLoadingReducer(false)}>
      {props.children}
    </LoadingContext.Provider>
  );
}
