import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../features/user/userSlice';
import './Header.css';

const Header = () => {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <header className="header">
      <h1 className="header-title">To Do List Application</h1>
      <nav className="header-nav">
        {!user && (
          <Link to="/login" className="nav-link">
            <i className="fas fa-sign-in-alt"></i> Login
          </Link>
        )}
        {user && (
          <>
            <Link to="/" className="nav-link" onClick={handleLogout}>
              <i className="fas fa-sign-in-alt"></i> Logout
            </Link>
            <Link to="/profile" className="nav-link">
              <i className="fas fa-user"></i> Profile
            </Link>
            <Link to="/todos" className="nav-link">
              <i className="fas fa-list"></i> ToDo List
            </Link>
          </>
        )}
        <Link to="/" className="nav-link">
          <i className="fas fa-home"></i> Home
        </Link>
      </nav>
    </header>
  );
};

export default Header;
