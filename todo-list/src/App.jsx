

import React, { useState } from 'react';
import './index.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState('');

  // Ajout d'un nouvel élément
  const handleAdd = () => {
    if (inputText.trim() === '') return;
    const newTodo = {
      id: Date.now(),
      text: inputText,
      completed: false,
      editing: false,
    };
    setTodos([...todos, newTodo]);
    setInputText('');
  };

  // Bascule du statut "complété"
  const toggleComplete = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  // Suppression d'un élément
  const handleDelete = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  // Passage en mode édition lors du clic sur le texte
  const handleEdit = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, editing: true } : todo
    );
    setTodos(updatedTodos);
  };

  // Sauvegarde de la modification d’un élément
  const handleUpdate = (id, newText) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, text: newText, editing: false };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <div className="container">
      <h1>To-Do List</h1>
      <div className="input-section">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ajouter un élément..."
        />
        <button onClick={handleAdd}>Ajouter</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
            />
            {todo.editing ? (
              <input
                type="text"
                value={todo.text}
                onChange={(e) =>
                  setTodos(
                    todos.map((item) =>
                      item.id === todo.id ? { ...item, text: e.target.value } : item
                    )
                  )
                }
                onBlur={() => handleUpdate(todo.id, todo.text)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleUpdate(todo.id, todo.text);
                  }
                }}
                autoFocus
              />
            ) : (
              <span
                onClick={() => handleEdit(todo.id)}
                className={`todo-text ${todo.completed ? 'completed' : ''}`}
              >
                {todo.text}
              </span>
            )}
            <button className="delete-button" onClick={() => handleDelete(todo.id)}>
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;