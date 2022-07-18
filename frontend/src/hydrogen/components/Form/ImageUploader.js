import React from "react";

const ImageUploader = (props) => {
  const {
    label,
    value,
    onChange,
    multi,
    disabled,
    placeholder,
    className,
    style,
  } = props;

  return (
    <div className={`${className}`}>
    </div>
  )
}

ImageUploader.defaultProps = {

}

ImageUploader.propTypes = {
  
}

export default ImageUploader;