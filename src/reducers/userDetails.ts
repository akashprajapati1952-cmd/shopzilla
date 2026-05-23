import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Cart, UserProfile } from "../types";


export interface User {
    username: string | null;
    userEmail: string | null;
    profilePic: string;
    loading: boolean;
    cart: Record<string, number>;
    error: {message:string; status: number; code: string;} | null;
}



const initialState: User={
    username: null,
    userEmail: null,
    loading:true,
    profilePic: '',
    cart: {},
    error:null
}

const updateCart=(state: User, action: PayloadAction<Cart>)=>{
    state.cart=action.payload
}

const setUserImage=(state: User, action: PayloadAction<string>)=>{
    state.profilePic=action.payload
}

const setUser=(state: User, action: PayloadAction<UserProfile>)=>{
    state.username= action.payload?.name;
    state.userEmail= action.payload?.email;
    state.profilePic=action.payload.profilePic  || ''
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
        setLoading,
        setUserImage
    }
})

const {actions, reducer: userReducer}= userSlice;
export const {setUser: setUserAction, updateCart: updateCartAction, setUserImage: setUserImageAction, setAxiosError: setAxiosErrorAction, setLoading: setUserLoadingAction}= actions;

export default userReducer;