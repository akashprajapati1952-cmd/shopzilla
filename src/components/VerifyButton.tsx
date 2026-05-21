import { useFormikContext } from 'formik';
import { useEffect, useState, type Dispatch, type JSX, type SetStateAction } from 'react';

export default function VerifyButton({onButtonClick, isDisabled, setIsDisabled,children}: {onButtonClick: (values: any)=>void; isDisabled: boolean, setIsDisabled: Dispatch<SetStateAction<boolean>> ; children:JSX.Element}) {
  
  const { values } = useFormikContext<{
    full_name?: string,
    email: string,
    password: string,
    confirm_password: string
  }>();
 

  return (
    <button
      type='button'
      disabled={isDisabled}
      className=' p-1 border rounded-md bg-blue-700 disabled:bg-blue-300'
      onClick={() =>{
      console.log('clicked')
      setIsDisabled(true)
      onButtonClick(values)} }
    >
      {children}
    </button>
  );
}