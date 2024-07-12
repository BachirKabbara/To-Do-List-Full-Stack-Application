import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeTask, updateTask } from '../../features/tasks/tasksSlice'; 
import ToDoCreate from './ToDoCreate';
import './ToDoList.css';

const ToDoList = () => {
  const user = useSelector((state) => state.user.currentUser);
  const tasks = useSelector((state) => state.tasks.tasks.filter(task => task.userEmail === user.email));
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 9;

  const sortedTasks = tasks.sort((a, b) => {
    if (a.completed && !b.completed) return 1;
    if (!a.completed && b.completed) return -1;

    const priorityOrder = { Low: 3, Medium: 2, High: 1 };
    switch (user.taskView) {
      case 'Date':
        return new Date(a.dueDate) - new Date(b.dueDate);
      case 'Category':
        return a.category.localeCompare(b.category);
      case 'Priority':
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      case 'CreationDate':
        return new Date(a.createdAt) - new Date(b.createdAt);
      case 'Title':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  const handleRemoveTask = (e, id) => {
    dispatch(removeTask(id));
  };

  const handleCompleteTask = (e, task) => {
    dispatch(updateTask({ ...task, completed: !task.completed }));
  };

  const getBackgroundColorBack = ( task) => {
    if (task.completed) return '#669900';
    switch (task.priority) {
      case 'High':
        return '#CC0000'; 
      case 'Medium':
        return '#CC6600'; 
      case 'Low':
        return '#99CC33'; 
      default:
        return '#f5f3f3'; 
    }
  };

  const getBackgroundColorFront = (task) => {
    if (task.completed) return '#669900';
    return 'linear-gradient(to right, #FF4B2B, #FF416C)'; 
  };

  // Pagination logic
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = sortedTasks.slice(indexOfFirstTask, indexOfLastTask);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(sortedTasks.length / tasksPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  return (
    <div className="todo-list">
      <h1>{user.name}'s To-Do List</h1>
      <div className="todo-list__container">
        <div className="todo-list__create">
          <ToDoCreate />
        </div>
        <div className="todo-list__cards">
          {currentTasks.map(task => (
            <div key={task.id} className='todo-list__task-box' >
              <div className='todo-list__item-card' onClick={(e) => handleCompleteTask(e, task)}>
                <div className='todo-list__front' style={{ background: getBackgroundColorFront(task) }}>
                  <h2 className='heading'>{task.title}</h2>
                </div>
                <div className='todo-list__back' style={{ backgroundColor: getBackgroundColorBack(task) }}>
                  <div className='btn-div'>
                    <a href="#" id="new-btn" onClick={(e) =>  handleRemoveTask(e, task.id) }>
                      <svg viewBox="0 0 448 512" id="new-svgIcon"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg>
                    </a>
                  </div>
                  <p style={{
                    fontSize: '14px',
                    fontWeight: 100,
                    lineHeight: '7px',
                    letterSpacing: '0.1px',
                    marginbottom: '6px'
                  }}>Priority: {task.priority}</p>
                  <p style={{
                    fontSize: '14px',
                    fontWeight: 100,
                    lineHeight: '7px',
                    letterSpacing: '0.1px',
                    marginbottom: '6px'
                  }}>Category: {task.category}</p>
                  <p style={{
                    fontSize: '14px',
                    fontWeight: 100,
                    lineHeight: '7px',
                    letterSpacing: '0.1px',
                    marginbottom: '6px'
                  }}>Due Date: {task.dueDate}</p>
                  <p style={{
                    fontSize: '14px',
                    fontWeight: 100,
                    lineHeight: '7px',
                    letterSpacing: '0.1px',
                    marginbottom  :'3px'
                  }}>Created At: {task.createdAt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="todo-list__pagination">
        {pageNumbers.map(number => (
          <button key={number} id={number} onClick={handleClick} className={currentPage === number ? 'todo-list__active' : ''}>
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ToDoList;
