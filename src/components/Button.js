import React from 'react';
import '../css/Button.css';

const Button = ({handleClick,children,customStyle}) => {
    return (<button 
        className ={customStyle ? customStyle : "ButtonStyle"} 
        onClick={handleClick}>{children}
        </button>)
};

export default Button;