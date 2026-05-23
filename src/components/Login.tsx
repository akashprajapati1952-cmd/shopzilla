import {useState, useEffect} from 'react';
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Input from './Input.js'
import {setAxiosErrorAction} from '../reducers/userDetails.js'
import { connect, type ConnectedProps} from 'react-redux';
import type { State } from '../store.js';
import { userSelector } from '../selectors/user.js';

import { userLoginAction } from '../actions/action.js';

interface LoginProps {}
type Props=LoginProps & redux_props

function Login({user,setAlert, loadUser}: Props) {
  const navigate=useNavigate();
  console.log('Login rendered');

  useEffect(()=>{
    if(user.userEmail){
      navigate(-1)
    }
  },[user])


  function handleSubmition(values: {email: string, password: string}) {
    setAlert({code:"warning", message:"fetching details, please wait...",status: 201})
    loadUser(values,()=>navigate(-1))
  };
  
  
  const schema=Yup.object().shape({
    email: Yup.string().email().required() ,
    password : Yup.string().min(6).max(12).required()
    
  })


  return <Formik initialValues={{email: "", password: "" } }
    onSubmit={handleSubmition }
    validationSchema={schema }
    >
    <Form className="grow flex flex-col p-10 justify-center items-center bg-[url('/login_bg.jpg')]">
      <div className="flex flex-col overflow-y-auto gap-4 border border-blue-700 rounded-lg py-5 px-5">
        <h1 className="font-extrabold text-white text-center text-xl mb-5">Login with SHOPZILLA</h1>
        <Input 
          label="Enter your email"
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          
        />
        
        <Input 
          label="Enter your password"
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          
        />
        
        <Link to="/forgetPassword" className="text-blue-700">Forget Password?</Link>
        <button type="submit"   className="bg-blue-700 border rounded-md p-1 disabled:bg-blue-300">Login</button>
        <p className="text-white">Don't have an Account? <Link to="/signup"className="text-blue-700">Sign up</Link> </p>

      </div>
   
    </Form>
      
    
    
  </Formik>
  
  
};
const mapStateToProps=(state:State)=>({
    user: userSelector(state)
})
const mapDispatchToProps={
  loadUser: userLoginAction,
  setAlert: setAxiosErrorAction
}
const connectedComp=connect(mapStateToProps,mapDispatchToProps)
type redux_props= ConnectedProps<typeof connectedComp>
export default connectedComp(Login);