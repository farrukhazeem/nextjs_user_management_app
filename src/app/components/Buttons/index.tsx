"use client";
import React, { FC } from "react";

interface ButtonsProps {
    text: string;
    className?: string;
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
    disabled?:boolean; 
  }
    
const Buttons: FC<ButtonsProps> = ({
    text,
    className,
    type,
    onClick,
    disabled,
  }) => {
    return (
      <button
        onClick={onClick}
        type={type}
        className= {className}
        disabled={disabled}
      >
                {text}
      </button>
    );
  };
  
  export default Buttons;