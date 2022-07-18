import React from "react";
import RDatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import fr from 'date-fns/locale/fr';
import moment from "moment";
import * as PT from "prop-types";

registerLocale('fr', fr)

const TimePicker = (props) => {
  const {
    value,
    onChange,
    className,
    style,
    disabled,
    label,
    invalid,
    placeholder,//TODO
    minTime,
    maxTime,
  } = props;

  const _onChange = (e) => {
    if (onChange && !disabled) onChange(e);
  }

  return (
    <div className={`${className} mb-2`} style={{minWidth: 200, ...style}}>
      {label ? 
        <span className="block text-gray-600 mb-1">{label}</span>
      : <></>}
      {disabled ? 
        <span className={`flex items-center h-9 w-full px-2 rounded bg-gray-300 ` + 
          `${value ? "text-gray-700" : "text-gray-500"}`}>
          {value ? moment(value).format("L") : placeholder}
        </span>
      :
        <RDatePicker
          selected={value}
          onChange={_onChange}
          className={`h-9 w-full px-2 rounded ` + 
                    `${invalid ? "border-red-400" : "border-gray-200"} border`}
          dateFormat="p"
          locale="fr"
          showTimeSelect
          showTimeSelectOnly
          minTime={minTime}
          maxTime={maxTime}
        />
      }
      {invalid ? 
        <span className="block text-red-500">{invalid}</span>
      : <></>}
    </div>
  )
}

TimePicker.defaultProps = {
  className: "",
  style: {},
  value: new Date(),
  onChange: () => {},
}

TimePicker.propTypes = {
  value: PT.any,
  onChange: PT.func,
  className: PT.string,
  style: PT.object,
  disabled: PT.bool,
  label: PT.string,
  invalid: PT.oneOfType([PT.bool, PT.string]),
  placeholder: PT.string,
  //minTime: PT.dateFormat,
  //maxTime: PT.dateFormat
}

export default TimePicker;