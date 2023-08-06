/*
  To-Do List 타입
*/

export interface IData {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}

export interface IProps {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  change: boolean;
  setChange: React.Dispatch<React.SetStateAction<boolean>>;
  edit: number;
  setEdit: React.Dispatch<React.SetStateAction<number>>;
  data: IData[];
}
