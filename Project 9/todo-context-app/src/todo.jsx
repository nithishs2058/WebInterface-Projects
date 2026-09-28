import { createContext, useContext, useState } from "react";

export const TodoContext = createContext(null);

export function TodoForm() {
  const { addTodo } = useContext(TodoContext); // <-- consume
  const [text, setText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!text.trim()) return;
    addTodo(text);
    setText("");
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="What needs to be done?"
        aria-label="New task"
      />
      <button type="submit" className="btn btn-add">
        Add Task
      </button>
    </form>
  );
}

// A single task row with Complete and Delete buttons
function TodoItem({ todo }) {
  const { toggleTodo, deleteTodo } = useContext(TodoContext); // <-- consume

  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <span className="todo-text">{todo.text}</span>
      <div className="todo-actions">
        <button
          type="button"
          className="btn btn-complete"
          onClick={() => toggleTodo(todo.id)}
        >
          {todo.completed ? "Undo" : "Complete"}
        </button>
        <button
          type="button"
          className="btn btn-delete"
          onClick={() => deleteTodo(todo.id)}
        >
          Delete
        </button>
      </div>
    </li>
  );
}

// The list of tasks + a small summary line
export function TodoList() {
  const { todos } = useContext(TodoContext); // <-- consume

  if (todos.length === 0) {
    return <p className="empty">No tasks yet. Add your first one above.</p>;
  }

  const doneCount = todos.filter((todo) => todo.completed).length;

  return (
    <>
      <p className="summary">
        {doneCount} of {todos.length} completed
      </p>
      <ul className="todo-list">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </>
  );
}
