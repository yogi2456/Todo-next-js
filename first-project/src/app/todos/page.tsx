"use client";

import { useState, useEffect } from "react"
import axios from "axios"

export default function Todos() {

    const [inputText, setInputText] = useState("")
    const [todos, setTodos] = useState([])
    const [editMode, setEditMode] = useState(false)
    const [editTodoInfo, setEditTodoInfo] = useState({
        id: "",
        desc: "",
        completed: false
    })
    
    useEffect(() => {
        axios.get("/api/todos").then((resp) => {
            console.log(resp);
            setTodos(resp.data.todos);
        });
    }, []);

    async function addTodo () {
        const data = {
            desc: inputText,
        };

        const resp = await axios.post("/api/todos", data);
        setTodos([])
        console.log(resp)
        // setTodos((prevTodos) => [
        //     ...prevTodos,
        //     {desc: inputText, completed: false},
        // ]);
    }

    async function clearTodos() {
        const resp = await axios.delete("/api/todos");
        console.log(resp.data);
        setTodos([]);
    }

    async function deleteTodo(todo: any) {
        const id = todo.id

        const resp = await axios.delete(`/api/todos/${id}`)
        console.log(resp.data);
    }

    async function editTodo(todo: any) {
        setEditMode(true)
        setEditTodoInfo({
            id: todo.id,
            desc: todo.desc,
            completed: todo.completed,
        });
    }

    async function updateTodo() {
        const data = {
            desc: editTodoInfo.desc,
            completed: editTodoInfo.completed
        }
        const resp = await axios.put(`/api/todos/${editTodoInfo.id}`, data)
        console.log(resp);
        setEditMode(false)
    }

   

    if(editMode) {
        return(
            <div className="flex flex-col items-center gap-8 pt-8 bg-violet-200 pb-32">
                <div className="text-2xl">Edit Todo</div>
                <div className="flex gap-4">
                    <div className="text-lg">Edit desc:</div>
                    <input className="rounded-md shadow-md text-lg pl-2" type="text" placeholder="Edit new desc" value={editTodoInfo.desc} onChange={(e) => setEditTodoInfo({...editTodoInfo, desc: e.target.value })}/>
                </div>
                <div className="flex gap-4">
                    <div className="text-lg">Edit Completed</div>
                    <input type="checkbox" checked={editTodoInfo.completed} onChange={(e) => setEditTodoInfo({...editTodoInfo, completed:!editTodoInfo.completed})}/>
                </div>
                <button onClick={updateTodo} className="text-xl shadow-md bg-blue-600 text-white hover:bg-blue-500 rounded-md px-3 py-">
                    Submit
                </button>
            </div>
        )
    }

  return (
    <div className="flex flex-col items-center gap-8 pt-8 bg-violet-200 pb-32">
      <div className="text-2xl">Todo List Next</div>
      <div className="flex gap-2">
        <input
         className="text-xl rounded-md shadow-md pl-2" 
         type="text" 
         placeholder="Enter Todo" 
         value={inputText} 
         onChange={(e) => setInputText(e.target.value)}
        />
        <button onClick={addTodo} className="text-xl shadow-md bg-blue-600 text-white hover:bg-blue-500 rounded-md px-3 py-1">Add</button>
        <button onClick={clearTodos} className="text-xl shadow-md bg-gray-600 text-white hover:bg-grayr-500 rounded-md px-3 py-1">Clear</button>
      </div>
      <div className="w-5/6 flex flex-col gap-2">
        {todos.map((todo, index) => {
            return (
                <div className="bg-violet-600 flex justify-between items-center p-2 rounded-lg shadow-md">
                    <div className="flex gap-2">
                        <input type="checkbox" checked={todo.Completed}/>
                        <div className="text-lg text-white">{todo.desc}</div>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={() => editTodo(todo)} className="text-xl shadow-md bg-green-600 text-white hover:bg-green-500 rounded-md px-1">
                            Edit
                        </button>
                        <button onClick={() => deleteTodo(todo)} className="text-xl shadow-md bg-red-600 text-white hover:bg-red-500 rounded-md px-1">
                            Delete
                        </button>
                    </div>
                </div>
            )
        })}
      </div>
    </div>
  )
}



