import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout, deleteUser } from '../../features/user/userSlice';
import './Profile.css';

const Profile = () => {
  const user = useSelector((state) => state.user.currentUser);
  const users = useSelector((state) => state.user.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const handleDeleteProfile = () => {
    if (window.confirm('Are you sure you want to delete your profile? This action cannot be undone.')) {
      dispatch(deleteUser());
      navigate('/');
    }
  };

  return (
    <div className="edit-profile__card">
      <div className="edit-profile__bg">
        <div className="profile-container">
          <header className="profile-header">
            <Link to="/edit-profile" className="profile-edit-btn">Edit Profile</Link>
            <button onClick={handleLogout} className="profile-edit-btn">Logout</button>
            <button onClick={handleDeleteProfile} className="profile-edit-btn">Delete Profile</button>
          </header>
          <div className="profile-info">
            <img src={user.profilePicture} alt="Profile" />
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Password: {'*'.repeat(user.password.length)}</p>
          </div>
          <div className="profile-task-settings">
            <p>Task View: {user.taskView}</p>
          </div>

          {user.email === 'bachir.m.kabbara@gmail.com' && (
            <div className="profile-users-list">
              <h2>All Registered Users</h2>
              <ul>
                {users.map((usr) => (
                  <li key={usr.email}>{usr.name} - {usr.email} - {usr.password}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="profile-blob"></div>
    </div>
  );
};

export default Profile;
