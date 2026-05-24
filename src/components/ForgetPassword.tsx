import React, {useEffect, useState} from 'react';
import {Formik, Form, type FormikHelpers} from 'formik';
import * as Yup from 'yup';
import {Link} from 'react-router-dom';
import Input from './Input';
import type { State } from '../store';
import { setAxiosErrorAction } from '../reducers/userDetails';
import { sendOtpForResetPassword ,verifyOtpForPassword} from '../actions/action';
import { connect, type ConnectedProps } from 'react-redux';
import VerifyButton from './VerifyButton';
import CountDown from './CountDown';
import { userEmailSelector } from '../selectors/user.js';

function ForgetPassword({sendOtp, verifyOtp,user, setAlert}:Redux_Props){
  console.log('ForgetPassword rendered');
  const [isFirst, setIsFirst]= useState(true);
  const [otp, setOtp]=useState<string>('')
  const [isSent, setIsSent]=useState(false)

  useEffect(()=>{
      const timer=setTimeout(()=>{
        if(isSent === true){
          setIsSent(false)
          setOtp('')
        }
      },60*1000)
  
      return () => {
        if (timer) {
          clearTimeout(timer);
        }
      };
    },[isSent])
  if(user){
    navigate("/")
  }

  function handleSubmition(values:{email: string; password: string; confirm_password: string}, actions: FormikHelpers<any>){
    setAlert({code:"warning", message:"Verifying OTP, please wait!",status: 201})
    verifyOtp({otp, newPassword: values.password,email: values.email})
    setOtp('')
    actions.resetForm()

  }

  function handleSendOtp(values: any){
      sendOtp(values.email)
      if(isFirst){
        setIsFirst(false)
      }
  }

  const schema=Yup.object().shape({
    email: Yup.string().email().required() ,
    password : Yup.string().min(6).max(12).required(),
    confirm_password: Yup.string().required()
  })
  
  
  return <Formik
    initialValues={{
      email:"",
      password:"",
      confirm_password:""
    }}
    validationSchema={schema}
    onSubmit={handleSubmition}
  >
    <Form className="grow flex flex-col p-10 overflow-auto justify-center items-center bg-[url('/login_bg.jpg')]">
      <div className="flex flex-col gap-4 border border-blue-700 rounded-lg  py-5 px-5 ">
        <h1 className="font-extrabold text-center text-white text-xl">Create new password</h1>

        <Input 
          id='email'
          placeholder='Enter your email'
          label='Enter your email'
          name='email'
          type='email'></Input>
        {isSent && <input type='number' placeholder='Enter otp here' id='otp'  className='border focus:bg-green-300 text-sm rounded-md p-1 text-white focus:text-black' value={otp} onChange={(event)=>{setOtp(event.target.value)}}/>}
        <VerifyButton onButtonClick={handleSendOtp} isDisabled={isSent} setIsDisabled={setIsSent}><>{isFirst ? "Send OTP" : <div className='flex gap-1.5 justify-center'>Resend OTP {isSent && <CountDown/>}</div>}</></VerifyButton>

        <Input 
          id='password'
          placeholder='Create a new password'
          label='Create new passwod'
          name='password'
          type='password'></Input>

        <Input 
          id='confirm_password'
          placeholder='Re-enter your password'
          label='Re-enter your password'
          name='confirm_password'
          type='password'></Input>
       
      
        <button type="submit"  className=" p-1 border rounded-md bg-blue-700 disabled:bg-blue-300">Request change password</button>
        <p className='text-white'>Don't have an Account? <Link to="/signup" className="text-blue-700">Sign up</Link> </p>
        <p className='text-white'>Already have an Account? <Link to="/" className="text-blue-700">Login</Link> </p>
      </div>
      
    </Form>
  </Formik>
  
  
};
const mapStateToProps=(state: State)=>({
  user:userEmailSelector(state)
})

const mapDispatchToProps={
    setAlert: setAxiosErrorAction,
    sendOtp:sendOtpForResetPassword,
    verifyOtp:verifyOtpForPassword
}
const connectedComp=connect(mapStateToProps, mapDispatchToProps)
type Redux_Props=ConnectedProps<typeof connectedComp>
export default connectedComp(ForgetPassword);