
import React, { useState, useEffect } from 'react';
import './index.css';

function App() {
  // Chargement initial des tâches depuis le localStorage
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [inputText, setInputText] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'

  // Sauvegarde des tâches à chaque modification
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Ajouter un élément
  const handleAdd = () => {
    if (inputText.trim() === '') return;
    const newTodo = {
      id: Date.now(),
      text: inputText,
      completed: false,
      editing: false
    };
    setTodos([...todos, newTodo]);
    setInputText('');
  };

  // Bascule du statut "complété"
  const toggleComplete = (id) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  // Passage en mode édition
  const handleEdit = (id) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, editing: true } : todo
    );
    setTodos(updatedTodos);
  };

  // Sauvegarde de la modification et sortie du mode édition
  const handleUpdate = (id, newText) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, text: newText, editing: false } : todo
    );
    setTodos(updatedTodos);
  };

  // Suppression d'un élément
  const handleDelete = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  // Supprimer toutes les tâches complétées
  const clearCompleted = () => {
    const updatedTodos = todos.filter(todo => !todo.completed);
    setTodos(updatedTodos);
  };

  // Application du filtre
  const filteredTodos = todos.filter(todo => {
    if (filter === 'all') return true;
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className="container">
      <h1>To‑Do List</h1>
      <div className="input-section">
        <input
          type="text"
          placeholder="Ajouter un élément..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button onClick={handleAdd} title="Ajouter tâche">
          {/* Icône SVG d'ajout */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm3-7a.5.5 0 0 1-.5.5H8v2.5a.5.5 0 0 1-1 0V8H4.5a.5.5 0 0 1 0-1H7V4.5a.5.5 0 0 1 1 0V7h2.5a.5.5 0 0 1 .5.5z"/>
          </svg>
        </button>
      </div>
      
      <div className="filter-section">
        <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>
          Tout
        </button>
        <button onClick={() => setFilter('active')} className={filter === 'active' ? 'active' : ''}>
          Actives
        </button>
        <button onClick={() => setFilter('completed')} className={filter === 'completed' ? 'active' : ''}>
          Complétées
        </button>
      </div>
      
      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
            />
            {todo.editing ? (
              <input
                className="edit-input"
                type="text"
                value={todo.text}
                onChange={(e) =>
                  setTodos(
                    todos.map(item =>
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
                className={`todo-text ${todo.completed ? 'completed' : ''}`}
                onClick={() => handleEdit(todo.id)}
                title="Cliquez pour éditer"
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

      {todos.length > 0 && (
        <div className="footer">
          <span>
            {todos.filter(todo => !todo.completed).length} tâche(s) restante(s)
          </span>
          <button onClick={clearCompleted}>
            Supprimer les tâches terminées
          </button>
        </div>
      )}
    </div>
  );
}

export default App;