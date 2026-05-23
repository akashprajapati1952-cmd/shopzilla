import type { Cart, UserProfile } from "../types";
export const USER_LOGIN='user/userLogin'
export const USER_RELOGIN='user/usetRelogin'
export const VERIFY_EMAIL='user/emailVerification'
export const SEND_OTP="user/sendOtp"
export const SEND_RESET_PASSWORD_OTP="user/sendForgetPasswordOTP"
export const  VERIFY_RESET_PASSWORD_OTP="user/forgotOtpSent"
export const EDIT_PROFILE="user/editProfile"
export const EDIT_EMAIL_SEND_OTP='user/editEmailSendOtp'
export const EDIT_EMAIL_VERIFY_OTP='user/editEmailVerifyOtp'
export const VERIFY_COUPON='user/cart/verifyCoupon'
export const SET_USER_IMAGE='user/requestSetUserProfile'


export const userLoginAction=(values: {email: string; password: string},onSuccess:()=>void)=>{
    return ({
        type:USER_LOGIN,
        payload: {values,onSuccess}
    })
}

export const userReloginAction=(): {type: string}=>{
    return ({
        type: USER_RELOGIN
    })
}


export const sendOtpForSignup=(email: string): {type:string; payload: string; }=>{
    return ({
        type:SEND_OTP,
        payload: email
    })
}
export const verifyEmail=(values:{name: string; otp: string; password: string; signupToken:string} )=>{
    return ({
        type: VERIFY_EMAIL,
        payload: values
    })
}
export const sendOtpForResetPassword=(email: string)=>{
    return ({
        type:SEND_RESET_PASSWORD_OTP,
        payload: email
    })
}
export const verifyOtpForPassword=(values:{otp: string; newPassword: string; email:string} )=>{
    return ({
        type: VERIFY_RESET_PASSWORD_OTP,
        payload: values
    })
}

export const requestEmailUpdate=(email: string)=>{
    return ({
        type:EDIT_EMAIL_SEND_OTP,
        payload:email
    })
}

export const verifyEmailUpdateRequest=(oldEmailOtp: string, newEmailOtp: string)=>{
    return ({
        type:EDIT_EMAIL_VERIFY_OTP,
        payload: {oldEmailOtp, newEmailOtp}
    })
}

export const requestUpdateUser=(name:string) =>{
    return ({
        type: EDIT_PROFILE,
        payload: name
    })
}
export const verifyCoupon=(code:string, cartTotal:string)=>{
    return ({
        type: VERIFY_COUPON,
        payload: {code,cartTotal}
    })
}

export const setUserImage=(img: File)=>{
    return ({
        type: SET_USER_IMAGE,
        payload: img
    })
}