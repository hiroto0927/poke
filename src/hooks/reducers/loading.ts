import { useReducer } from "react";

type Loading = {
  loading: boolean;
};

type ActionLoading =
  | {
      type: "startLoad";
    }
  | { type: "endLoad" };

const reducer = (_state: Loading, action: ActionLoading): Loading => {
  switch (action.type) {
    case "startLoad":
      return { loading: true };
    case "endLoad":
      return { loading: false };
  }
};

export const defaultLoadingContext: ReturnType<typeof useLoadingReducer> = {
  state: {
    loading: false,
  },
  dispatch: () => {},
};

export function useLoadingReducer(initialState: boolean) {
  const [state, dispatch] = useReducer(reducer, { loading: initialState });

  return { state, dispatch };
}
