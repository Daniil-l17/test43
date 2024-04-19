import { memo } from 'react';
import { ITodo } from '../../types/ITodo';
import { Check } from '../../utils/Check';

export const GetTodo = memo(
  ({ item, updateTodo }: { item: ITodo; updateTodo: () => void }) => {
    return (
      <li
        style={{ borderBottom: '2px solid #ebebeb' }}
        className="flex py-2 last:uppercase relative px-2 items-center gap-5"
      >
        <span
          onClick={updateTodo}
          style={{
            border: `1px solid ${item.complited ? '#cbdfdb' : '#ebebeb'}`,
          }}
          className=" flex w-8 cursor-pointer justify-center items-center h-8 rounded-[50%] "
        >
          {item.complited && <Check />}
        </span>
        <h2
          className={` ${
            item.complited ? ' text-[#d6d6d6] line-through' : 'text-[#565656]'
          } text-xl normal-case font-normal`}
        >
          {item.title}
        </h2>
      </li>
    );
  },
);
