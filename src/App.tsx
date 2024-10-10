import { useState } from 'react';
import uniqid from 'uniqid';
import { useTodoStore } from './store/store';
import { GetTodo } from './components/GetTodo/GetTodo';
import { ArrowDown } from './utils/ArrowDown';
import { menu } from './constants/consnants';

function App() {
	const [text, setText] = useState('');
	const { todo, addTodo, updateTodo, menuActive, activeMenu, ClearComplited } = useTodoStore();
	const itemComplitedlength = todo.filter(item => !item.complited).length;

	const handelCreateTack = () => {
		if (text.length) {
			const obj = {
				title: text,
				complited: false,
				id: uniqid.process()
			};
			addTodo(obj);
			setText('');
		}
	};

	const handelActiveMenu = (title: 'All' | 'Active' | 'Completed') => {
		activeMenu(title);
	};

	return (
		<div className='flex flex-col'>
			<h1 className=' text-[#f2abab] mb-4 text-center font-extralight text-6xl'>todos</h1>
			<div className='w-[600px] main  relative text-[#b8b8b8] bg-[#fefefe] '>
				<div className='flex px-2 gap-3 py-3 items-center'>
					<ArrowDown />
					<input value={text} onKeyDown={e => e.key === 'Enter' && handelCreateTack()} onChange={e => setText(e.target.value)} className=' text-xl' type='text' placeholder='What needs to be done?' />
				</div>
				<div className=' absolute left-0 right-0 bg-[#ebebeb] h-[2px]'></div>
				<ul className='flex  flex-col gap-2'>
					{menuActive === 'Completed'
						? todo.filter(item => item.complited).map(item => <GetTodo key={item.id} item={item} updateTodo={() => updateTodo(item.id)} />)
						: menuActive === 'Active'
						? todo.filter(item => !item.complited).map(item => <GetTodo key={item.id} item={item} updateTodo={() => updateTodo(item.id)} />)
						: todo.map(item => <GetTodo key={item.id} item={item} updateTodo={() => updateTodo(item.id)} />)}
				</ul>
				<div className='px-2 py-3 flex justify-between items-center'>
					<span>{itemComplitedlength} items left</span>
					<ul className='flex items-center gap-4'>
						{menu.map((title, index) => (
							<li key={index} onClick={() => handelActiveMenu(title)} style={title === menuActive ? { border: '2px solid #eddbdb' } : {}} className=' cursor-pointer px-1 rounded-md py-1'>
								{title}
							</li>
						))}
					</ul>
					<h2 onClick={ClearComplited} className=' cursor-pointer'>
						Clear complited
					</h2>
				</div>
			</div>
		</div>
	);
}

export default App;
