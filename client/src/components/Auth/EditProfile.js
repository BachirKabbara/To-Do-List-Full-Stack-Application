import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import PasswordInput from './PasswordInput';
import { updateUser } from '../../features/user/userSlice';
import './EditProfile.css';

const EditProfile = () => {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    oldPassword: '',
    password: '',
    confirmPassword: '',
    profilePicture: user.profilePicture,
    taskView: user.taskView || 'Date'
  });
  const [file, setFile] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      setFile(file);
      setFormData((prev) => ({ ...prev, profilePicture: URL.createObjectURL(file) }));
    } else {
      alert("Only JPG and PNG files are allowed.");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRemoveImage = () => {
    setFile(null);
    setFormData(prev => ({ ...prev, profilePicture: '' }));
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password) {
      if (formData.oldPassword !== user.password) {
        setError('Old password is incorrect.');
        return;
      }
      if (!validatePassword(formData.password)) {
        setError('New password must be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and special characters.');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('New password and confirm password do not match.');
        return;
      }
    }

    const updateData = {
      ...formData,
      profilePicture: file ? URL.createObjectURL(file) : formData.profilePicture,
      password: formData.password ? formData.password : user.password
    };

    try {
      dispatch(updateUser(updateData));
      navigate("/profile");
    } catch (error) {
      alert('Failed to update profile.');
    }
  };

  return (
    <div className="edit-profile__card">
      <div className="edit-profile__bg">
        <form onSubmit={handleSubmit} className="edit-profile__form" encType="multipart/form-data">
          <div {...getRootProps({ className: 'edit-profile__dropzone' })}>
            <input {...getInputProps()} />
            {
              isDragActive ?
                <p>Drop the files here ...</p> :
                <p>Drag 'n' drop your new profile picture here, or click to select a file!</p>
            }
            {formData.profilePicture && (
              <>
                <img src={formData.profilePicture} alt="Profile Preview" className="edit-profile__profile-preview" />
                <button type="button" className="edit-profile__remove-button" onClick={handleRemoveImage}>Remove</button>
              </>
            )}
          </div>
          
          <label>
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
          </label>
          <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
          </label>
          <label>
            Old Password:
            <PasswordInput
              placeholder="Enter old password"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleInputChange}
            />
          </label>
          <label>
            New Password:
            <PasswordInput
              placeholder="Enter new password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Confirm New Password:
            <PasswordInput
              placeholder="Confirm new password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
          </label>
          {error && <p className="edit-profile__error">{error}</p>}
          <label>
            Task View:
            <select name="taskView" value={formData.taskView} onChange={handleInputChange}>
              <option value="Date">Due Date</option>
              <option value="Category">Category</option>
              <option value="Priority">Priority</option>
              <option value="CreationDate">Creation Date</option>
              <option value="Title">Title</option>
            </select>
          </label>
          
          <button type="submit" className="editProfile-edit-button">Save Changes</button>
        </form>
      </div>
      <div className="edit-profile__blob"></div>
    </div>
  );
};

export default EditProfile;
