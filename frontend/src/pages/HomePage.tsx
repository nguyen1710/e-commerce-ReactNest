import React, { useEffect, useState } from "react";
import TodoCard from "../components/TodoCard";
import { useAuth } from "../hooks/AuthProvider";
import { axiosInstance } from "../lib/axios";
import axios from "axios";
import Loading from "../components/Loading";
import type { Todo } from "../interfaces/todo.interface";
import TodoWindown from "../components/TodoWindown";
const HomePage = () => {
  const { accessTokenState, username } = useAuth();
  const [todos, setTodos] = useState<Todo[]>([]); // ⬅️ gắn type Todo[]
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newTodo, setNewTodo] = useState("");

  
  const fetchTodos = async () => {
      setLoading(true); // bắt đầu load
      axiosInstance
      .get("/todo/getAllTodo", {
          headers: { Authorization: `Bearer ${accessTokenState}` },
        })
        .then((res) => {
            // console.log("Todos:", res.data.todos);
            setTodos(res.data.todos); // ✅ lấy đúng todos
        })
        .catch((err) => {
            console.error("Error fetching todos:", err);
            setError(err);
        })
        .finally(() => setLoading(false));
    };
    
    useEffect(() => {
      fetchTodos()
    }, [accessTokenState]);
  const handleAddTodo = () => {
    axiosInstance
      .post(
        "/todo/add",
        { text: newTodo },
        {
          headers: {
            Authorization: `Bearer ${accessTokenState}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data.todo);
        setTodos((prev) => [...prev, res.data.todo]);
      })
      .catch((err) => console.error(err));
  };
  return (
    <div>
      {loading && <Loading />}

      <h1 className="text-3xl mb-5">Xin chào: {username} </h1>
      <div className="flex mb-4">
        <label
          htmlFor="todo"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Việc cần làm:
        </label>
        <input
          type="text"
          id="todo"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="John"
          required
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button
          className="p-3 ml-2 bg-green-400 cursor-pointer rounded-lg hover:bg-green-600"
          onClick={handleAddTodo}
        >
          Thêm
        </button>
      </div>

      {todos.map((todo) => (
        <TodoCard key={todo.id} todo={todo} fetchTodo={fetchTodos}/>
    ))}

    </div>

  );
};

export default HomePage;
