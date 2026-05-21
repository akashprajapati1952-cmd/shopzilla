import react, {memo} from 'react';

interface CheckoutDraftProps {
  subtotal: number;
  total: number;
}

function CheckoutDraft({subtotal, total}: CheckoutDraftProps) {
  console.log('CheckoutDraft rendered');
  
  return <div className="flex flex-col w-62.5 self-center sm:self-end mt-5">
    <p className="border border-gray-300 px-2 py-1 text-start text-sm  font-bold sm:text-md bg-gray-300">Cart totals</p>
    <div className="grid grid-cols-2 px-4 py-2 border border-gray-300">
      <p  className='text-sm sm:text-md'>Subtotal</p>
      <p className="text-sm sm:text-md">₹{subtotal.toFixed(2)}</p>
    </div>
    <div className="grid grid-cols-2 px-4 py-2 border border-gray-300">
      <p className="text-sm sm:text-md">Total</p>
      <p className="text-sm sm:text-md">₹{total.toFixed(2)}</p>
    </div>
    <div className="px-4 py-2 border border-gray-300 text-center">
      <button className="bg-red-500 px-4 py-2 border text-xs sm:text-md rounded-md">PROCEED TO CHECKOUT</button>
    </div>
  </div>;
};
export default memo(CheckoutDraft);