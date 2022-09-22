export interface IBoardName {
  board: IBoard;
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
