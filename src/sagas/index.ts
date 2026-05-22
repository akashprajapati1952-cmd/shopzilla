import type { PayloadAction } from "@reduxjs/toolkit";
import { call, debounce, put, takeEvery, takeLatest } from "redux-saga/effects";
import { productDetail, dataList, saveCart, userLogin, userRelogin, sendOtp,verifyEmailForSignup, sendOtpForPassword, verifyEmailForPassword, updateUser, sendOtpForUpdateEmail, verifyOtpForUpdateEmail, verifyCouponApi } from "../apis_&_contexts/Api";
import { loadProductDetailAction, loadProductsAction, setErrorAction, setProductDetailAction, setProductDetailErrorAction, setProductsAction } from "../reducers/product";
import type { Cart, Coupon } from "../types";
import { setAxiosErrorAction, setUserAction, setUserLoadingAction, updateCartAction } from "../reducers/userDetails";
import { USER_LOGIN, USER_RELOGIN, SEND_OTP, VERIFY_EMAIL, SEND_RESET_PASSWORD_OTP, VERIFY_RESET_PASSWORD_OTP, EDIT_PROFILE, EDIT_EMAIL_SEND_OTP, EDIT_EMAIL_VERIFY_OTP, VERIFY_COUPON } from "../actions/action";
import axios from "axios";
import { setCouponAction } from "../reducers/coupons";


export function* rootSaga() {
    yield debounce(300, loadProductsAction.toString(), fetch_products)
    yield takeEvery(loadProductDetailAction.toString(), fetch_product_detail)
    yield takeEvery(updateCartAction.toString(),saveMyCart)
    yield takeEvery(USER_LOGIN, userLoginSaga)
    yield takeEvery(USER_RELOGIN, userReloginSaga)
    yield takeEvery(SEND_OTP,emailOtpSaga)
    yield takeEvery(VERIFY_EMAIL,verifySignupSaga)
    yield takeEvery(SEND_RESET_PASSWORD_OTP,sendPasswordOtp)
    yield takeEvery(VERIFY_RESET_PASSWORD_OTP,verifyPasswordOtp )
    yield takeEvery(EDIT_PROFILE, updateUserSaga)
    yield takeEvery(EDIT_EMAIL_SEND_OTP, requestOtpForEmailUpdate)
    yield takeEvery(EDIT_EMAIL_VERIFY_OTP,verifyEmailUpdate)
    yield takeLatest(VERIFY_COUPON,verifyCouponSaga)
}

function* fetch_products(action: PayloadAction<string>): Generator {
    try{
        const res=yield call(dataList, action.payload)
        if(res.error){
            throw new Error(res.error.message)
        };
        
        yield put(setProductsAction(res))
        
    } catch (err) {
        yield put(setErrorAction({type: "error", message:err instanceof Error ? err.message: "something went wrong"}))
    }
}

function* fetch_product_detail(action: PayloadAction<number>): Generator {
    try{
    const res=yield call(productDetail, action.payload)
    if(res.error){
        throw new Error(res.error.message);
      }
    yield put(setProductDetailAction(res))
    } catch (err){
        yield put(setProductDetailErrorAction({id: action.payload,error:{type:"error", message: err instanceof Error ? err.message:"something went wrong"}}))
    }
} 

function* saveMyCart(action: PayloadAction<Cart>): Generator {
    yield call(saveCart,action.payload)
}

function* userLoginSaga(action: PayloadAction<{email: string; password: string}>):Generator {
    try{
      const user=yield call(userLogin,action.payload)
      yield put(setUserAction(user))
      yield put(setAxiosErrorAction({code:"success", message:"Logged in successfully",status: 201}))
   } catch (error){
        yield put(setUserLoadingAction(false))
        if (axios.isAxiosError(error)) {
          yield put(setAxiosErrorAction({
            message: error.response?.data?.message || error.message,
            status: error.response?.status || error.status || 401,
            code: error.code || "ERR_BAD_REQUEST"
          }));
        } else {
      
          yield put(setAxiosErrorAction({
            message: "An unexpected error occurred",
            status: 500,
            code: "UNKNOWN_ERROR"
          }));
        }
    }
    
}

function* userReloginSaga(): Generator {
    try{
      const user=yield call(userRelogin)
      yield put(setUserAction(user))
      yield put(setAxiosErrorAction({code:"success", message:"Auto logged in successfully",status: 201}))
    } catch (error){
          yield put(setUserLoadingAction(false))
          ;
      
    }
    
}

function* verifySignupSaga(action: PayloadAction<{name: string; otp: string; password: string; signupToken:string}>):Generator {
  try{
      const res=yield call(verifyEmailForSignup,action.payload)
      localStorage.setItem('token',res.token)
      yield put(setUserAction(res.user))
      yield put(setAxiosErrorAction({code:"success", message:"Signed in successfully, logging in!",status: 201}))
   } catch (error){
        
        yield put(setUserLoadingAction(false))
        if (axios.isAxiosError(error)) {
          yield put(setAxiosErrorAction({
            message: error.response?.data?.message || error.message,
            status: error.response?.status || error.status || 401,
            code: error.code || "ERR_BAD_REQUEST"
          }));
        } else {
      
          yield put(setAxiosErrorAction({
            message: "An unexpected error occurred",
            status: 500,
            code: "UNKNOWN_ERROR"
          }));
        }
    }
}

function* emailOtpSaga(action: PayloadAction<string>): Generator {
  try {
    const res = yield call(sendOtp, action.payload);

    if (res.signupToken) {
      localStorage.setItem('signupToken', res.signupToken);
  

      yield put(setAxiosErrorAction({
        message: "OTP sent successfully",
        status: 200,
        code: "success"
      }));

    } else {
   
      yield put(setAxiosErrorAction({
        message: res.error.message,
        status: 500,
        code: "UNKNOWN_ERROR"
      }));
    }

  } catch (error) {

    if (axios.isAxiosError(error)) {

      yield put(setAxiosErrorAction({
        message: error.response?.data?.message || error.message,
        status: error.response?.status || 500,
        code: error.code || "ERR_BAD_REQUEST"
      }));

    } else {

      yield put(setAxiosErrorAction({
        message: "Something went wrong",
        status: 500,
        code: "UNKNOWN_ERROR"
      }));

    }
  }
}

function* sendPasswordOtp(action: PayloadAction<string>):Generator {
  try{
    const data=yield call(sendOtpForPassword,action.payload)
    yield put(setAxiosErrorAction({
        message: data.message,
        status: 200,
        code: "success"
      }));
  }catch(error){
    if (axios.isAxiosError(error)) {

      yield put(setAxiosErrorAction({
        message: error.response?.data?.message || error.message,
        status: error.response?.status || 500,
        code: error.code || "ERR_BAD_REQUEST"
      }));

    } else {

      yield put(setAxiosErrorAction({
        message: "Something went wrong",
        status: 500,
        code: "UNKNOWN_ERROR"
      }));

    }
  }

}

function* verifyPasswordOtp(action: PayloadAction<{otp: string; newPassword: string; email:string}>):Generator {
  try{
      const res=yield call(verifyEmailForPassword,action.payload)
      if(res.error){
          throw new Error(res.error.message)
      }
      console.log('error performing1')
      yield put(setAxiosErrorAction({code:"success", message:res.message,status: 200}))
      console.log('error performing1')
      
   } catch (error){
        
        console.log('error performing1')
        if (axios.isAxiosError(error)) {
          yield put(setAxiosErrorAction({
            message: error.response?.data?.message || error.message,
            status: error.response?.status || error.status || 500,
            code: error.code || "ERR_BAD_REQUEST"
          }));
        } else {
          console.log('error performing2')
          yield put(setAxiosErrorAction({
            message: "An unexpected error occurred",
            status: 500,
            code: "UNKNOWN_ERROR"
          }));
        }
    }
}

function* updateUserSaga(action: PayloadAction<string>): Generator {
  try{
      const data= yield call(updateUser, action.payload)
      yield put(setAxiosErrorAction({code:"success", message:"User updated successfully!",status: 201}))
      const user={name:data.user.name,email:data.user.email, cart:data.user.cart}
      yield put(setUserAction(user))
  }catch(error){
      if (axios.isAxiosError(error)) {
          yield put(setAxiosErrorAction({
            message: error.response?.data?.message || error.message,
            status: error.response?.status || error.status || 401,
            code: error.code || "ERR_BAD_REQUEST"
          }));
        } else {
      
          yield put(setAxiosErrorAction({
            message: "An unexpected error occurred",
            status: 500,
            code: "UNKNOWN_ERROR"
          }));
        }
  }
}

function* requestOtpForEmailUpdate(action: PayloadAction<string>): Generator {
    try{
      const data=yield call(sendOtpForUpdateEmail,action.payload)
      yield put(setAxiosErrorAction({code:"success", message:data.message,status: 201}))

    }catch(error){
      if (axios.isAxiosError(error)) {
          yield put(setAxiosErrorAction({
            message: error.response?.data?.message || error.message,
            status: error.response?.status || error.status || 401,
            code: error.code || "ERR_BAD_REQUEST"
          }));
        } else {
      
          yield put(setAxiosErrorAction({
            message: "An unexpected error occurred",
            status: 500,
            code: "UNKNOWN_ERROR"
          }));
        }
    }
} 

function* verifyEmailUpdate(action: PayloadAction<{oldEmailOtp: string; newEmailOtp: string}>): Generator {
    try{
      const data=yield call(verifyOtpForUpdateEmail,action.payload)
      yield put(setAxiosErrorAction({code:"success", message:data.message,status: 201}))
      yield put(setUserAction(data.user))

    }catch(error){
      if (axios.isAxiosError(error)) {
          yield put(setAxiosErrorAction({
            message: error.response?.data?.message || error.message,
            status: error.response?.status || error.status || 401,
            code: error.code || "ERR_BAD_REQUEST"
          }));
        } else {
      
          yield put(setAxiosErrorAction({
            message: "An unexpected error occurred",
            status: 500,
            code: "UNKNOWN_ERROR"
          }));
        }
    }
} 

function* verifyCouponSaga(action: PayloadAction<{code: string, cartTotal: string}>): Generator {
  try{
    const data= yield call(verifyCouponApi,action.payload)
    yield put(setCouponAction(data.coupon))
    yield put(setAxiosErrorAction({code:"success", message:data.message,status: 201}))

  }catch(error){
    if (axios.isAxiosError(error)) {
          yield put(setAxiosErrorAction({
            message: error.response?.data?.message || error.message,
            status: error.response?.status || error.status || 401,
            code: error.code || "ERR_BAD_REQUEST"
          }));
        } else {
      
          yield put(setAxiosErrorAction({
            message: "An unexpected error occurred",
            status: 500,
            code: "UNKNOWN_ERROR"
          }));
        }

  }
  
}

