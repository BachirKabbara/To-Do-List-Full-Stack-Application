import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTask } from '../../features/tasks/tasksSlice';
import './ToDoCreate.css';

const categories = ['Work', 'Personal', 'Shopping', 'Others'];

const ToDoCreate = () => {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const [taskTitle, setTaskTitle] = useState('');
  const [category, setCategory] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('');

  const handleAddTask = () => {
    if (taskTitle.trim() === '' || category === '') return;
    const newTask = {
      id: Date.now(),
      title: taskTitle,
      category,
      createdAt: new Date().toLocaleString(),
      dueDate,
      priority,
      completed: false,
      userEmail: user.email,
    };
    dispatch(addTask(newTask));
    setTaskTitle('');
    setCategory('');
    setDueDate('');
    setPriority('');
  };

  return (
      <div className="todo-create__task-input">
        <h2 className='todo-create__title'>Add a new task</h2>
        <input
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder="Enter a new task"
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>{cat}</option>
          ))}
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="">Select Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <button type="button" className="todo-create__button" onClick={handleAddTask}>
          <span className="todo-create__button-text">Add Item</span>
          <span className="todo-create__button-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" height="24" fill="none" className="svg"><line y2="19" y1="5" x2="12" x1="12"></line><line y2="12" y1="12" x2="19" x1="5"></line></svg></span>
        </button>

      </div>
  );
};

export default ToDoCreate;
