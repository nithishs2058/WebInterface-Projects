import { useState } from "react";
import { TodoContext, TodoForm, TodoList } from "./todo.jsx";

export default function App() {
  // State lives here, using useState
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn createContext()", completed: true },
    { id: 2, text: "Wrap the app in a Provider", completed: false },
    { id: 3, text: "Read data with useContext()", completed: false },
  ]);

  // Functions that change the state
  const addTodo = (text) => {
    setTodos((prev) => [
      ...prev,
      { id: Date.now(), text: text.trim(), completed: false },
    ]);
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  /* ----------------------------------------------------------------
     STEP 2 — PROVIDE the context
     TodoContext.Provider makes `value` available to every component
     inside it, however deeply nested. (Created in todo.jsx, consumed
     with useContext() in TodoForm, TodoList and TodoItem.)
  ----------------------------------------------------------------- */
  return (
    <TodoContext.Provider value={{ todos, addTodo, toggleTodo, deleteTodo }}>
      <main className="app">
        <section className="card">
          <h1>To-Do List</h1>
          <TodoForm />
          <TodoList />
        </section>
      </main>
    </TodoContext.Provider>
  );
}
