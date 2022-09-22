import { createContext, useReducer } from "react";
import React from "react";
import { reducer } from "./reducer";
import { INITIAL_STATE } from "./constants";

export const BoardContext = createContext(INITIAL_STATE);

export const BoardContextProvider = ({
  children,
}: {
  children: React.ReactNode[];
}) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  return (
    <BoardContext.Provider
      value={{
        boards: state.boards,
        currentBoard: state.currentBoard,
        dispatch,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};
