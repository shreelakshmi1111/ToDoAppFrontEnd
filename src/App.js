import React, { useState, useEffect } from 'react';
import './App.css';
import apiService from './apiService';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const data = await apiService.getTodos();
      setTodos(data);
    } catch (error) {
      console.error('Error: Failed to fetch todos:', error);
    }
  };

  const addTodo = async () => {
    try {
      const todo = {
        taskDescription: newTodo,
        isCompleted: false
      };

      const createdTodo = await apiService.createTodo(todo);
      setTodos([...todos, createdTodo]);
      setNewTodo('');
    } catch (error) {
      console.error('Error: Failed to add todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await apiService.deleteTodo(id);
      setTodos(todos.filter((todo) => todo.rowKey !== id));
    } catch (error) {
      console.error('Error: Failed to delete todo:', error);
    }
  };

  const toggleComplete = async (id, isCompleted) => {
    try {
      // eslint-disable-next-line
      const updatedTodo = await apiService.updateTodo(id, {
        isCompleted: !isCompleted
      });
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.rowKey === id ? { ...todo, isCompleted: !isCompleted } : todo
        )
      );
    } catch (error) {
      console.error('Error: Failed to update todo:', error);
    }
  };

  return (
    <div className="App">
      <h1>My To-Do-List!</h1>
      <div className="add-todo">
        <input
          type="text"
          placeholder="Enter a new todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li
            key={todo.rowKey}
            className={todo.isCompleted ? 'completed' : ''}
          >
            <span>{todo.taskDescription}</span>
            <div className="actions">
              <button
                className="complete-btn"
                onClick={() => toggleComplete(todo.rowKey, todo.isCompleted)}
              >
                {todo.isCompleted ? 'Mark Incomplete' : 'Mark Complete'}
              </button>
              <button
                className="delete-btn"
                onClick={() => deleteTodo(todo.rowKey)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;