import React, { useState } from "react";
import type { Todo } from "../interfaces/todo.interface";
import TodoWindown from "./TodoWindown";
// import { Todo } from "../interfaces/todo.interface";

interface TodoCardProps {
  todo: Todo;
  fetchTodo: () => void
}

const TodoCard = ({ todo , fetchTodo} : TodoCardProps) => {
    const [isOpenModal, setIsOpenModal] = useState(false)



    const closeModal = ()=> {
        setIsOpenModal(false)
    }
  console.log("todo card: ", todo.isComplete);
  return (
    <div className="flex items-center justify-between space border p-4 bg-blue-300 rounded-md hover:bg-blue-400 mb-3" onClick={() => {setIsOpenModal(true)}}>
      <div>
        <input type="checkbox" className="mr-3" checked={todo.isComplete} />
        {todo.text}
      </div>
      <h1 className="text-2xl">{todo.isImportant ? "⭐" : ""}</h1>
      {isOpenModal && <TodoWindown todo={todo} closeModal={closeModal} fetchTodo={fetchTodo}/>}
    </div>

  );
};

export default TodoCard;
