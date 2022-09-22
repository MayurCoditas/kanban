import { Actions } from "./actions";
import { Dispatch } from "react";

export interface IState {
  boards: IBoard[];
  currentBoard: IBoard | null;
  dispatch: Dispatch<IAction>;
}

export interface IBoard {
  name: string;
  columns: string[];
  tasks: ITask[];
}

export interface ITask {
  name: string;
  description: string;
  column: string;
  subTasks: ISubTask[];
}

export interface ISubTask {
  name: string;
  status: boolean;
  id: number;
}

export type IAction = ISetCurrentBoard | IUpdateBoard;

export interface ISetCurrentBoard {
  type: Actions.setCurrentBoard;
  payload: IBoard;
}

export interface IUpdateBoard {
  type: Actions.updateBoard;
  payload: IBoard[];
}
