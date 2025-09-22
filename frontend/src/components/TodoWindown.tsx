import React, { useEffect, useState } from "react";
import type { Todo } from "../interfaces/todo.interface";
import { useAuth } from "../hooks/AuthProvider";

interface TodoWindownProps {
  closeModal: () => void;
  todo: Todo;
  fetchTodo: () => void
}

const TodoWindown = ({ closeModal, todo , fetchTodo}: TodoWindownProps) => {
  const [todoForm, setTodoForm] = useState<Todo>(todo);
const {accessTokenState} = useAuth()
  useEffect(() => {
    setTodoForm(todo);
  }, [todo]);
  console.log(todoForm);


    const handleSave = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/todo/update/${todoForm.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessTokenState}`, // nếu có auth
            },
            body: JSON.stringify(todoForm),
          }
        );

        const data = await response.json();
        console.log("Updated todo:", data);
        closeModal();
        fetchTodo()
      } catch (error) {
        console.error("Error updating todo:", error);
      }
    };
  
  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
      <div className=" bg-white rounded-xl flex-col">
        <div className="p-8 ">
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
              value={todoForm.text}
              onChange={(e) =>
                setTodoForm((prev) => ({
                  ...prev,
                  text: e.target.value,
                }))
              }
            />
          </div>
          <div className="flex flex-col">
            <div className="flex-row">
              <input
                type="checkbox"
                className="mr-3"
                checked={todoForm.isComplete}
                onChange={(e) =>
                  setTodoForm((prev) => ({
                    ...prev,
                    isComplete: e.target.checked,
                  }))
                }
              />{" "}
              Is Complete?
            </div>
            <div className="flex-row">
              <input
                type="checkbox"
                className="mr-3"
                checked={todoForm.isImportant}
                onChange={(e) =>
                  setTodoForm((prev) => ({
                    ...prev,
                    isImportant: e.target.checked,
                  }))
                }
              />{" "}
              Is Imprtant?
            </div>
          </div>

          <div className="flex justify-end p-4 border-t mt-4">
            <button
              className="p-3 ml-2 bg-green-400 cursor-pointer rounded-lg hover:bg-green-600"
                onClick={handleSave}
            >
              Lưu thay đổi
            </button>

            <button
              className="p-3 ml-2 bg-red-400 cursor-pointer rounded-lg hover:bg-red-600"
              onClick={(e) => {
                e.stopPropagation();
                closeModal();
              }}
            >
              Thoát
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoWindown;
