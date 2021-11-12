import React, { useEffect, useState } from "react";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import Todo from "./components/Todo";
import Typeography from "@material-ui/core/Typography";
const LOCAL_STORAGE_KEY = "react-todo-list-todos";
function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const storagetodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

    if (storagetodos) {
      setTodos(storagetodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function addTodo(todo) {
    setTodos([todo, ...todos]);
  }

  function toggleComplete(id) {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
      })
    );
  }

  function removeTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  return (
    <div className="App">
     
        <Typeography variant="h1" style={{padding:16}}>React ToDo</Typeography>
        <TodoForm addTodo={addTodo}></TodoForm>
        <TodoList
          todos={todos}
          toggleComplete={toggleComplete}
          removeTodo={removeTodo}
        />
      
    </div>
  );
}

export default App;
