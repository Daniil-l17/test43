import { useState } from 'react';
import uniqid from 'uniqid';
import { useBearStore } from './store/store';
import { GetTodo } from './components/GetTodo/GetTodo';
import { ArrowDown } from './utils/ArrowDown';

const menu = ['All', 'Active', 'Completed'];

function App() {
  const [text, setText] = useState('');
  const { todo, addTodo, updateTodo, menuActive, activeMenu, ClearComplited } =
    useBearStore();

  const itemLength = todo.filter(item => !item.complited).length;

  const createTack = () => {
    if (todo.length) {
      const obj = {
        title: text,
        complited: false,
        id: uniqid.process(),
      };
      addTodo(obj);
      setText('');
    }
  };

  return (
    <div className="flex flex-col">
      <h1 className=" text-[#f2abab] mb-4 text-center font-extralight text-6xl">
        todos
      </h1>
      <div className="w-[600px] main  relative text-[#b8b8b8] bg-[#fefefe] ">
        <div className="flex px-2 gap-3 py-3 items-center">
          <ArrowDown />
          <input
            value={text}
            onKeyDown={e => e.key === 'Enter' && createTack()}
            onChange={e => setText(e.target.value)}
            className="!text-[#d6d6d6] text-xl italic"
            type="text"
            placeholder="What needs to be done?"
          />
        </div>
        <div className=" absolute left-0 right-0 bg-[#ebebeb] h-[2px]"></div>
        <ul className="flex  flex-col gap-2">
          {menuActive === 'Completed'
            ? todo
                .filter(item => item.complited)
                .map(item => (
                  <GetTodo item={item} updateTodo={() => updateTodo(item.id)} />
                ))
            : menuActive === 'Active'
            ? todo
                .filter(item => !item.complited)
                .map(item => (
                  <GetTodo item={item} updateTodo={() => updateTodo(item.id)} />
                ))
            : todo.map(item => (
                <GetTodo item={item} updateTodo={() => updateTodo(item.id)} />
              ))}
        </ul>
        <div className="px-2 py-3 flex justify-between items-center">
          <span>{itemLength} items left</span>
          <ul className="flex items-center gap-4">
            {menu.map(title => (
              <li
                //@ts-ignore
                onClick={() => activeMenu(title)}
                style={
                  title === menuActive ? { border: '2px solid #eddbdb' } : {}
                }
                className=" cursor-pointer px-1 rounded-md py-1"
              >
                {title}
              </li>
            ))}
          </ul>
          <h2 onClick={ClearComplited} className=" cursor-pointer">
            Clear complited
          </h2>
        </div>
      </div>
    </div>
  );
}

export default App;
