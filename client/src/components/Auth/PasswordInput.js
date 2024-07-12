import React, { useState } from 'react';
import './PasswordInput.css';

const PasswordInput = ({ value, onChange, name, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="password-input">
      <input
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        name={name}
        placeholder={placeholder}
      />
      <i
        className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
        onMouseDown={() => setShowPassword(true)}
        onMouseUp={() => setShowPassword(false)}
        onMouseLeave={() => setShowPassword(false)}
      ></i>
    </div>
  );
};

export default PasswordInput;
