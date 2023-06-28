import { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Input = ({ type = 'text', className = '', required = false }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const displayButtonStyle = { position: 'absolute', right: '0' };

  const HandleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const HandleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      {type == 'password' ? (
        <>
          <input
            type={showPassword ? 'text' : 'password'}
            className={className}
            required={required}
            onChange={HandleInputChange}
            value={inputValue}
          ></input>
          {inputValue != '' ? (
            showPassword ? (
              <VisibilityIcon style={displayButtonStyle} onClick={HandleTogglePasswordVisibility} />
            ) : (
              <VisibilityOffIcon style={displayButtonStyle} onClick={HandleTogglePasswordVisibility} />
            )
          ) : null}
        </>
      ) : (
        <input type={type} className={className} required={required}></input>
      )}
    </>
  );
};

export default Input;
