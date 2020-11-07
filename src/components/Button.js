import React from 'react';
import '../css/Button.css';

/**
 * generic button component the renders on basis of styles and functionalities passed in prop
 */
const Button = ({ handleClick, children, customStyle }) => {
  return (<button
    className={customStyle ? customStyle : "ButtonStyle"}
    onClick={handleClick}>{children}
  </button>)
};

export default Button;