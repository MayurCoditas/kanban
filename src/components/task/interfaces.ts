export interface ITaskProp {
  task: ITask;
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
export interface IBoard {
  name: string;
  columns: string[];
  tasks: ITask[];
}