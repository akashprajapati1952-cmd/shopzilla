import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Coupon } from "../types";

const initialState: {coupon: Coupon}={
    coupon: {}  as Coupon
}

const setCoupon=(state: {coupon: Coupon},action: PayloadAction<Coupon>)=>{
    state.coupon=action.payload
}

const couponSlice=createSlice({
    name:'coupon',
    initialState,
    reducers:{
      setCoupon
    }
})

const {actions, reducer: couponReducer}=couponSlice
export const {setCoupon: setCouponAction}=actions
export default couponReducer