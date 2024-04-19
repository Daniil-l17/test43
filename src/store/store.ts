import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ITodo, ITodoStore } from '../types/ITodo';

export const useBearStore = create(
  persist<ITodoStore>(
    set => ({
      todo: [
        { title: 'Сделать тестовое задание', complited: true, id: 'id323ds' },
        {
          title: 'Попасть на собеседование',
          complited: false,
          id: 'id3d23ddddds',
        },
      ],
      menuActive: 'All',
      addTodo: (obj: ITodo) => set(state => ({ todo: [obj, ...state.todo] })),
      updateTodo: (id: string) =>
        set(state => ({
          todo: state.todo.map(item =>
            item.id === id ? { ...item, complited: !item.complited } : item,
          ),
        })),
      ClearComplited: () =>
        set(state => ({ todo: state.todo.filter(item => !item.complited) })),
      activeMenu: (title: 'All' | 'Active' | 'Completed') =>
        set(state => ({ menuActive: (state.menuActive = title) })),
    }),

    {
      name: 'storage-todo',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
