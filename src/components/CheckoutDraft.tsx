import react, {memo, useCallback, useEffect, useState} from 'react';
import type { State } from '../store';
import { connect, type ConnectedProps } from 'react-redux';
import { setUserAction } from '../reducers/userDetails';
import { couponSelector } from '../selectors/coupon';


type CheckoutDraftProps ={
  subtotal: number;
  
} & redux_props

function CheckoutDraft({subtotal, coupon}: CheckoutDraftProps) {
  console.log('CheckoutDraft rendered');
  const [total,setTotal]=useState(subtotal)
  const [discount, setDiscount]=useState(0)
  console.log(subtotal)
  const finalTotal=total-discount

  const  handleDiscount= useCallback(()=>{
    let dis=0
    if(coupon){
      let dis=0
      if(coupon.discountType === "percentage"){
        dis=(subtotal * coupon.discountValue)/100
      }else{
        dis=coupon.discountValue
      }
    }
    setDiscount(dis)
  },[coupon,subtotal])
  console.log(finalTotal)
  

  useEffect(()=>{
    setTotal(subtotal)
    handleDiscount()
  },[subtotal])
  
  return <div className="flex flex-col w-62.5 self-center sm:self-end mt-5">
    <p className="border border-gray-300 px-2 py-1 text-start text-sm  font-bold sm:text-md bg-gray-300">Cart totals</p>
    <div className="grid grid-cols-2 px-4 py-2 border border-gray-300">
      <p  className='text-sm sm:text-md'>Subtotal</p>
      <p className="text-sm sm:text-md">₹{subtotal.toFixed(2)}</p>
    </div>
    <div className="grid grid-cols-2 px-4 py-2 border border-gray-300">
      <p className="text-sm sm:text-md">Total</p>
      <p className="text-sm sm:text-md">₹{finalTotal.toFixed(2)}</p>
    </div>
    <div className="px-4 py-2 border border-gray-300 text-center">
      <button className="bg-red-500 px-4 py-2 border text-xs sm:text-md rounded-md">PROCEED TO CHECKOUT</button>
    </div>
  </div>;
};
const mapStateToProps=(state: State)=>({
    coupon:couponSelector(state)
  
})
const mapDispatchToProps={
     
}
const connectedComp=connect(mapStateToProps,mapDispatchToProps)
type redux_props= ConnectedProps<typeof connectedComp>

export default memo(connectedComp(CheckoutDraft));