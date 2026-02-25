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

export type TodoFolderDB = {
  name: string;
  userId: string;
  id: string;
  createdAt: Date;
};
