export type Todo = {
  id: string;
  text: string;
  done: boolean;
  date: string;
  folderId: string;
};

export type DateAndMode = { selectedDate: string; isShowAll: boolean };

export type TodoFolder = {
  id: string;
  name: string;
  createdAt: string;
};
