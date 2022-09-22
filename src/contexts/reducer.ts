import { Actions } from "./actions";
import { IAction, IState } from "./interfaces";

export const reducer: (state: IState, action: IAction) => IState = (
  state,
  action
) => {
  switch (action.type) {
    case Actions.updateBoard:
      return { ...state, boards: action.payload };
    case Actions.setCurrentBoard:
      return { ...state, currentBoard: action.payload };
    default:
      return state;
  }
};
