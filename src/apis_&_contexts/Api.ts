import {useState, useCallback} from 'react';
import axios from 'axios';
import type { AllData, Cart, Product, UserProfile } from '../types/index.js';

const token=localStorage.getItem("token")
const BASE_URL='https://my-project-server-6vel.onrender.com'


export async function productDetail(id: number){
  
  const res= await axios.get("https://dummyjson.com/product/"+id)
  
  return res.data as Product;
  
}

export const dataList = async (params:string) => {
    const res= await axios.get("https://dummyjson.com/products/search?" + params)
    const products= res.data as AllData;
    return products;
  }

export const saveCart= async (cart: Cart)=>{
  if(token){
    await axios.post("https://my-project-server-6vel.onrender.com/api/user/update-cart", cart, {headers:{authorization:`Bearer ${localStorage.getItem("token")}`}})
  }else{
    localStorage.setItem('mycarts',JSON.stringify(cart))
  }
    

  }

export const userLogin=async (values:{email: string; password: string})=>{
  const res= await axios.post("https://my-project-server-6vel.onrender.com/api/login", {email: values.email, password:values.password})
  localStorage.setItem("token",(res.data.token))
  
  return res.data.user as UserProfile
}

export const userRelogin= async ()=>{
  const res=await axios.get("https://my-project-server-6vel.onrender.com/api/user/profile-details",{headers:{authorization:`Bearer ${localStorage.getItem("token")}`}})
  console.log(res.data.user)
  return res.data.user as UserProfile;
}

export const getCartProducts= (cart: Cart)=>{
  const ids= Object.keys(cart);
  const products=ids.map(async function(id){
      return await productDetail(+id);
  })
  return products
}



export const sendOtp= async (email: string)=>{
  const res=await axios.post("https://my-project-server-6vel.onrender.com/api/signup/send-otp",{email})
  return res.data
}

export const verifyEmailForSignup= async (values:{name: string; otp: string; password: string; signupToken:string})=>{
  const {name, otp, password, signupToken}= values
  const res= await axios.post("https://my-project-server-6vel.onrender.com/api/signup/verify",{name,otp,password, signupToken})
  return res.data 
}

export const sendOtpForPassword= async (email: string)=>{
  const res=await axios.post("https://my-project-server-6vel.onrender.com/api/forgot-password/send-otp",{email})
  return res.data
}

export const verifyEmailForPassword= async (values:{otp: string; newPassword: string; email:string} )=>{
  const {otp, newPassword, email}= values
  const res= await axios.post("https://my-project-server-6vel.onrender.com/api/forgot-password/verify",{otp,newPassword, email})
  return res.data
}

export const updateUser= async (name: string)=>{
  const res=await axios.put(BASE_URL+"/api/user/edit-profile",{name},{headers:{authorization:`Bearer ${localStorage.getItem("token")}`}})
  return res.data
}

export const sendOtpForUpdateEmail= async (newEmail: string)=>{
  const res=await axios.post(BASE_URL+"/api/user/change-email/send-otp",{newEmail},{headers:{authorization:`Bearer ${localStorage.getItem("token")}`}})
  return res.data
}

export const verifyOtpForUpdateEmail= async (OTPs:{oldEmailOtp: string; newEmailOtp: string})=>{
  console.log("otp verify rendered")
  const {oldEmailOtp,newEmailOtp}= OTPs
  console.log(oldEmailOtp,newEmailOtp)
  const res=await axios.post(BASE_URL+"/api/user/change-email/verify",{oldEmailOtp,newEmailOtp},{headers:{authorization:`Bearer ${localStorage.getItem("token")}`}})
  return res.data
}

export const verifyCouponApi=async (data:{code: string, cartTotal: string})=>{
  const res= await axios.post(BASE_URL+'/api/apply-coupon',data,{headers:{authorization:`Bearer ${localStorage.getItem("token")}`}})
  return res.data
}

export const setUserProfile= async (img: File)=>{
  const formData= new FormData()
  formData.append("profilePic",img)
  const res= await axios.put(BASE_URL+'/api/user/update-profile-pic',formData,{headers:{
    'authorization':`Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "multipart/form-data"
  }})
  return res.data
}