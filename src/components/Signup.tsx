import {Form, Formik} from 'formik';
import * as Yup from 'yup';
import {Link, useNavigate} from 'react-router-dom';
import Input from './Input.js';
import { connect, type ConnectedProps } from 'react-redux';
import type { State } from '../store.js';
import { sendOtpForSignup, verifyEmail } from '../actions/action.js';
import { setAxiosErrorAction } from '../reducers/userDetails.js';
import { usernameSelector } from '../selectors/user.js';
import VerifyButton from './VerifyButton.js';
import { useEffect, useState } from 'react';
import CountDown from './CountDown'

interface SignupProps {}
type Props=SignupProps & Redux_Props

function Signup({setAlert, user, sendSignupOtp,verifyEmail}: Props){
  const navigate=useNavigate();
  const [otp, setOtp]=useState<string>('')
  const [isSent, setIsSent]=useState(false)
  const [isFirst, setIsFirst]=useState(true)

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

  console.log('signup rendered');

  function handleSubmition(values: {full_name: string, email: string, password: string, confirm_password: string}){
    setAlert({code:"warning", message:"Creating your account, please wait...",status: 201})
    handleVerifyEmail(values)
    setOtp('')
  }
  if(user){navigate('/');}

  function handleEmailSend(values: any){
      sendSignupOtp(values.email)
      if(isFirst){
        setIsFirst(false)

      }

  }
    
  function handleVerifyEmail(values: any){
      verifyEmail({name:values.full_name, password:values.password,otp:otp,signupToken:localStorage.getItem("signupToken")!})
  }

      
  const schema=Yup.object().shape({
    full_name: Yup.string().max(20).required(),
    email: Yup.string().email().required() ,
    password : Yup.string().min(6).max(12).required(),
    confirm_password: Yup.string().required().oneOf([Yup.ref('password')], 'Password and confirm password should be same! ')
    
  })
  
  
  
  return <Formik 
    initialValues ={ {
      full_name:"",
      email: "",
      password: "",
      confirm_password:""
    }}
    onSubmit={handleSubmition }
    validationSchema = {schema}
   
  >
    <Form className="grow flex flex-col overflow-y-auto p-10 bg-blue-500 justify-center items-center bg-[url('/login_bg.jpg')]">
      <div className="flex flex-col gap-4  border  border-blue-700 rounded-lg  py-5 px-5">
        <h1 className="font-extrabold text-center text-xl mb-5 text-white">Sign Up with SHOPZILLA</h1>
        <Input
          name="full_name"
          id="full_name"
          type="text"
          label="Enter your full name"
          placeholder="Enter your full name"
          
        />

        
 
          <Input
            
            name="email"
            id="email"
            type="email"
            label="Enter your email"
            placeholder="Enter your email"
          />
          <label htmlFor='otp' className='sr-only'>Enter OTP</label>
          {isSent && <input type='number' placeholder='Enter otp here' id='otp'  className='border focus:bg-green-300 text-sm rounded-md p-1 text-white focus:text-black' value={otp} onChange={(event)=>{setOtp(event.target.value)}}/>}
          <VerifyButton onButtonClick={handleEmailSend} isDisabled={isSent} setIsDisabled={setIsSent}><>{isFirst ? "Send OTP" : <div className='flex gap-1.5 justify-center'>Resend OTP {isSent && <CountDown/>}</div>}</></VerifyButton>
          
        <Input
          name="password"
          id="password"
          type="password"
          label="Enter your password"
          placeholder="Create a password"
          
        />
      
        <Input
          name="confirm_password"
          id="confirm_password"
          type="password"
          label="Re-Enter your password"
          placeholder="Re-Enter your password"
          
        />
      
        <button type="submit" className=" p-1 border rounded-md bg-blue-700 disabled:bg-blue-300">Sign up</button>
        <p className="text-white">Already have an Account? <Link to="/login" className="text-blue-700">Login</Link> </p>
      </div>
     
    </Form>
  </Formik>
  
  
};
const mapStateToProps=(state: State)=>({
    user:usernameSelector(state)
})

const mapDispatchToProps={
    setAlert: setAxiosErrorAction,
    sendSignupOtp:sendOtpForSignup,
    verifyEmail
}
const connectedComp=connect(mapStateToProps, mapDispatchToProps)
type Redux_Props=ConnectedProps<typeof connectedComp>
export default connectedComp(Signup);