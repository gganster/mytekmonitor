import React, {useEffect} from "react";
import {TwitterPicker} from "react-color";

const ColorPicker = (props) => {
  const {
    value,
    onChange,
    label,
    invalid,
    disabled,
    placeholder,
    className,
    style,
  } = props;

  const _onChange = () => {

  }

  return (
    <div className={`mb-3 ${className}`} style={style}>
      {label ? <span className="block text-gray-600 mb-1">{label}</span> : null}
      
      <TwitterPicker />
    </div>
  )
}

export default ColorPicker;