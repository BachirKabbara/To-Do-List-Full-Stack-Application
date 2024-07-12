import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Login from './components/Auth/Login';
import Profile from './components/Auth/Profile';
import ToDoList from './components/ToDo/ToDoList';
import Home from './components/Layout/Home';
import EditProfile from './components/Auth/EditProfile';
import PrivateRoute from './components/PrivateRoute';
import './styles/App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/edit-profile" element={<PrivateRoute><EditProfile /></PrivateRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/todos" element={<PrivateRoute><ToDoList /></PrivateRoute>} />
          {/* Add other routes as needed */}
        </Routes>
        <Footer />
      </div>
    </Provider>
  );
}

export default App;
