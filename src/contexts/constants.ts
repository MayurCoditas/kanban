import { IState } from "./interfaces";

export const INITIAL_STATE: IState = {
  boards: [
    {
      name: "Platform Launch",
      columns: ["Doing", "Planning", "Done"],
      tasks: [
        {
          name: "Task1",
          description: "This is Description",
          subTasks: [
            {
              name: "this is subtask",
              status: false,
              id: 8,
            },
            {
              name: "this is subtask",
              status: false,
              id: 13,
            },
            {
              name: "this is subtask",
              status: false,
              id: 16,
            },
          ],
          column: "Doing",
        },
        {
          name: "Task2",
          description: "This is Description",
          subTasks: [
            {
              name: "this is subtask",
              status: false,
              id: 3,
            },
          ],
          column: "Planning",
        },
        {
          name: "Task3",
          description: "This is Description",
          subTasks: [
            {
              name: "this is subtask",
              status: false,
              id: 1,
            },
          ],
          column: "Done",
        },
      ],
    },
    {
      name: "Board2",
      columns: ["Doing", "Planning", "Done"],
      tasks: [
        {
          name: "Task4",
          description: "This is Description",
          subTasks: [
            {
              name: "this is subtask",
              status: false,
              id: 2,
            },
          ],
          column: "Doing",
        },
      ],
    },
  ],
  currentBoard: null,
  dispatch: () => {},
};
