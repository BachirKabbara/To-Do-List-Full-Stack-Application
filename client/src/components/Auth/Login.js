import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, setUser } from '../../features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import PasswordInput from './PasswordInput';
import './Login.css'; 

const Login = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const users = useSelector((state) => state.user.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    setIsRightPanelActive(true);
  };

  const handleSignInClick = () => {
    setIsRightPanelActive(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (isRightPanelActive) {
      setSignupData({ ...signupData, [name]: value });
    } else {
      setLoginData({ ...loginData, [name]: value });
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find(user => user.email === loginData.email && user.password === loginData.password);
    if (user) {
      dispatch(setUser(user));
      navigate('/');
    } else {
      setError('Invalid credentials');
    }
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar;
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (!validatePassword(signupData.password)) {
      setError('Password must be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and special characters.');
      return;
    }

    const userExists = users.find(user => user.email === signupData.email);
    if (userExists) {
      setError('User already exists');
      return;
    }

    const newUser = {
      name: signupData.name,
      email: signupData.email,
      password: signupData.password,
      profilePicture: './profile.png',
      taskView: 'Date'
    };
    dispatch(addUser(newUser));
    dispatch(setUser(newUser));
    navigate('/');
  };

  return (
    <div className="login">
      <div className={`login__container ${isRightPanelActive ? 'login__right-panel-active' : ''}`} id="login__container">
        <div className="login__form-container login__sign-up-container">
          <form onSubmit={handleSignup}>
            <h1>Create Account</h1>
            <input type="text" placeholder="Name" name="name" value={signupData.name} onChange={handleInputChange} />
            <input type="email" placeholder="Email" name="email" value={signupData.email} onChange={handleInputChange} />
            <PasswordInput
              placeholder="Password"
              name="password"
              value={signupData.password}
              onChange={handleInputChange}
            />
            {error && <p className="login__error">{error}</p>}
            <button className='profile-edit-btn'>Sign Up</button>
          </form>
        </div>
        <div className="login__form-container login__sign-in-container">
          <form onSubmit={handleLogin}>
            <h1>Sign in</h1>
            <input type="email" placeholder="Email" name="email" value={loginData.email} onChange={handleInputChange} />
            <PasswordInput
              placeholder="Password"
              name="password"
              value={loginData.password}
              onChange={handleInputChange}
            />
            {error && <p className="login__error">{error}</p>}
            <button className='profile-edit-btn'>Sign In</button>
          </form>
        </div>
        <div className="login__overlay-container">
          <div className="login__overlay">
            <div className="login__overlay-panel login__overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep track of your To-Do list please login!</p>
              <button className="login__ghost" id="signIn" onClick={handleSignInClick}>Sign In</button>
            </div>
            <div className="login__overlay-panel login__overlay-right">
              <h1>Hello!</h1>
              <p>Join and start your organizing you life today! </p>
              <button className="login__ghost" id="signUp" onClick={handleSignUpClick}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
