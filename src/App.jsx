import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


function App() {

  // input text
  const [todo, setTodo] = useState("");

  // initializing empty array
  const [todos, setTodos] = useState([]);

  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, [])

  const toggleFinished = (e) => {
    setShowFinished(!showFinished);
  }


  // save to local storage
  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }


  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLS();

  }
  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  }

  // delete btn
  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  }

  const handleChange = (e) => {
    setTodo(e.target.value);
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;

    let index = todos.findIndex(item => {
      return item.id === id;
    });

    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS();

  }


  return (
    <>
      <Navbar />
      <div className="md:container md:mx-auto mx-3 max-w-[1280px] my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-1/2">
        <h1 className='font-bold text-center text-xl'>iTask  - Manage your todos at one place</h1>
        <div className="addTodo my-3">
          <h2 className="text-lg font-bold">Add a Todo</h2>
          <div className='flex'>
            <input onChange={handleChange} value={todo} type="text" className='w-full my-2 rounded-full pl-4  py-1' />
            <button onClick={handleAdd} disabled={todo.length <= 3} className=' cursor-pointer bg-violet-500 hover:bg-violet-700 disabled:bg-violet-500 transition-all rounded-full p-4 py-0 mx-2 text-white'>Save</button>
          </div>
        </div>

        <input onChange={toggleFinished} type="checkbox" checked={showFinished} /> Show Finished
        <h2 className='font-semibold'>Yours Todos</h2>

        <div className="todos">
          {todos.length === 0 && <><div className='m-5'>No todos to display.</div></>}
          {todos.map(item => {
            return ((showFinished || !item.isCompleted) &&
              <>
                <div key={item.id} className="todo flex   justify-between my-3">
                  <div className='flex gap-10'>
                    <input name={item.id} type="checkbox" checked={item.isCompleted} onChange={handleCheckbox} />
                    <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
                  </div>
                  <div className="buttons h-full flex">
                    <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-green-500 hover:bg-green-700 transition-all p-3 py-1 text-white rounded-md mx-1'><FaEdit /></button>
                    <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-red-500 hover:bg-red-700 transition-all p-3 py-1 text-white rounded-md mx-1'><MdDelete /></button>
                  </div>
                </div>
              </>
            )

          })}

        </div>
      </div>
    </>
  )
}

export default App
