import React, { useEffect, useState } from "react";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import Todo from "./components/Todo";
import Typeography from "@material-ui/core/Typography";
import { List } from "@material-ui/core";
const LOCAL_STORAGE_KEY = "react-todo-list-todos";
function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    //const storagetodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

    getTodos();
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function addTodo(todo) {
    const url = "http://localhost:5000/api/todo";
    const rawdata = JSON.stringify({
      task: todo.task,
      completed: todo.completed,
    });
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: rawdata,
    };

    return fetch(url, params)
      .then((response) => response.json())
      .then((data) => getTodos());
  }
  function removeTodo(id) {
    const url = "http://localhost:5000/api/todo/" + id;
    const rawdata = JSON.stringify({
      id: id,
    });
    const params = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: rawdata,
    };

    return fetch(url, params).then((response) => getTodos());
  }

  function updateTodo(todo) {
    const url = "http://localhost:5000/api/todo/" + todo.id;
    const rawdata = JSON.stringify(todo);
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: rawdata,
    };

    return fetch(url, params).then((response) => getTodos());
  }
  function toggleComplete(id) {
    todos.map((todo) => {
      if (todo.id === id) {
        return updateTodo({
          ...todo,
          completed: !todo.completed,
        });
      }
    });
  }

  function getTodos() {
    const url = "http://localhost:5000/api/todo";
    const params = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    return fetch(url, params)
      .then((response) => response.json())
      .then((data) => setTodos(data));
  }

  return (
    <div className="App">
      <Typeography variant="h1" style={{ padding: 16 }}>
        React ToDo
      </Typeography>
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
