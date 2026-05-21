import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Cart, UserProfile } from "../types";
import type { AxiosError } from "axios";
import { boolean } from "yup";


export interface User {
    username: string | null;
    userEmail: string | null;
    loading: boolean;
    cart: Record<string, number>;
    error: {message:string; status: number; code: string;} | null;
}



const initialState: User={
    username: null,
    userEmail: null,
    loading:true,
    cart: {},
    error:null
}

const updateCart=(state: User, action: PayloadAction<Cart>)=>{
    state.cart=action.payload
}

const setUser=(state: User, action: PayloadAction<UserProfile>)=>{
    state.username= action.payload?.name;
    state.userEmail= action.payload?.email;
    state.cart= action.payload?.cart;
    state.loading=false
    
}
const setLoading=(state: User, action: PayloadAction<boolean>)=>{
    state.loading=action.payload
}
const setAxiosError=(state: User, action: PayloadAction<{message:string; status: number; code: string;} | null>)=>{
    state.error= action.payload
}
const userSlice= createSlice({
    name: 'user',
    initialState,
    reducers:{
        setUser,
        updateCart,
        setAxiosError,
        setLoading
    }
})

const {actions, reducer: userReducer}= userSlice;
export const {setUser: setUserAction, updateCart: updateCartAction, setAxiosError: setAxiosErrorAction, setLoading: setUserLoadingAction}= actions;

export default userReducer;