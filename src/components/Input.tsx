import React from 'react';
import {useField} from 'formik';

interface InputProps {
  name: string;
  type: string;
  id: string;
  placeholder: string;
  label: string;
  className?: string;
}

function Input({name, type, id, placeholder, label, className}: InputProps){
  
  const [data, meta]=useField(name);
  const {value, onChange, onBlur}=data;
  const {touched, error}=meta;
  let border="border-gray-700";
  if(touched && error){
    border="border-red-500"
  }
  
  return <>
    <label htmlFor={id} className="sr-only" >{label}</label>
    <input
      className={`border focus:bg-green-300 text-sm rounded-md p-1 text-white focus:text-black ${border} ${className}`}
      value={value}
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur} >
    </input>
    {touched && error && <div className="text-red-700 text-sm">{error}</div>}
  </>
};

export default Input;