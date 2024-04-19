export interface ITodoStore {
  todo: ITodo[];
  menuActive: 'All' | 'Active' | 'Completed';
  addTodo: (obj: ITodo) => void;
  updateTodo: (id: string) => void;
  activeMenu: (title: 'Active' | 'All' | 'Completed') => void;
  ClearComplited: () => void;
}

export interface ITodo {
  id: string;
  title: string;
  complited: boolean;
}
