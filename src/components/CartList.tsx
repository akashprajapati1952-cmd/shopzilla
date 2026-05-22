import  {useState, useEffect, memo, type Dispatch, type SetStateAction} from 'react';
import Loading from './Loading.js';
import CartProduct1 from './CartProduct1.js';
import CartProduct2 from './CartProduct2.js';
import CheckoutDraft from './CheckoutDraft.js';
import { useLocation} from 'react-router-dom';
import type { Cart, Product} from '../types/index.js';
import type { State } from '../store.js';
import withProducts from '../hocs/withProducts.js';
import { connect, type ConnectedProps } from 'react-redux';
import { usernameSelector } from '../selectors/user.js';
import { setAxiosErrorAction, updateCartAction } from '../reducers/userDetails.js';
import { verifyCoupon } from '../actions/action.js';

interface CartListProps {
  removeProduct: (id: number) => void;
  cart: Cart ;
  products: Product[];
  loading: boolean
}
type Props=CartListProps & redux_props


function CartList({cart,user,verifyCoupon, removeProduct, products,updateCart,setAlert, loading}: Props) {
  const [subtotal, setSubtotal]=useState(0);
  const [localCart, setLocalCart] = useState<Cart>({});
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [couponCode,setCouponCode]=useState('')

  useEffect(() => {
      setSubtotal(products.map((product)=>(product.price*(cart[product.id] || 0))).reduce((preVal: number,newVal: number)=>(preVal+newVal),0))
      
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };
  
      window.addEventListener("resize", handleResize);
  
      return () => window.removeEventListener("resize", handleResize);
  }, [cart]);
  
  console.log('CartList rendered');
  function handleUpdateCart(){
    
    updateCart(localCart);
  }
  function handleVerifyCoupon(){
    setAlert({code:"", message:"Verifying Coupon, Please wait!",status: 201})
    verifyCoupon(couponCode,String(subtotal))
  }
  

  
  if(!products || !cart || loading ){
    return <Loading>Loading your cart</Loading>
  }
  
  
  if(products.length=== 0 ){
    return <div className="self-center text-blue-300">Your cart is empty! please add the products first.</div>;
  }
  

  return (isMobile ? (<div className="overflow-auto p-5 flex flex-col grow justify-start">
    <div>
      
      {products.map(function(product){
        return <CartProduct1
        key={product.id}
        product={product}
        removeItem={removeProduct}
        setLocalCart={setLocalCart}
        cart={cart}
        />
      })
      }  
      <div className=" flex items-start px-2 justify-between   mt-5 ">
        <div className="flex gap-3 flex-col sm:flex-row">
          <input type="text" value={couponCode} onChange={(event)=>setCouponCode(event.target.value)} placeholder="COUPON CODE" className="border border-gray-500 w-25 p-1 rounded-md text-[10px] text-center"></input>
          <button type='button' onClick={handleVerifyCoupon} className="bg-red-500 px-2 py-1 w-25 border rounded-md text-[10px]">APPLY COUPON</button>
        </div>
        <button type='button' onClick={handleUpdateCart} disabled={!localCart} className="bg-red-500 w-25 px-2 py-1 border disabled:bg-red-300  rounded-md text-[10px]">UPDATE CART</button>
      </div>
    </div>
    <CheckoutDraft subtotal={subtotal} ></CheckoutDraft>
    
  </div>):(<div className="overflow-auto p-5 flex flex-col grow justify-start">
    <div>
      <div className="h-8 flex items-center border border-gray-300 w-full  bg-gray-300">
        <p className="ml-[16%] grow">Product</p>
        <p className="w-[10%]">Price</p>
        <p className="w-[10%]">Quantity</p>
        <p className="w-[12%]">Subtotal</p>
      </div>
      {products.map(function(product){
        return <CartProduct2 
        key={product.id}
        product={product}
        removeItem={removeProduct}
        setLocalCart={setLocalCart}
        cart={cart}
        />
      })
      }
      <div className="h-10 flex items-center px-2 justify-between border border-gray-300">
        <div className="flex gap-3">
          <input type="text" value={couponCode} onChange={(event)=>setCouponCode(event.target.value)} placeholder="COUPON CODE" className="border border-gray-500 w-35 p-1 rounded-md text-sm"></input>
          <button type='button' onClick={handleVerifyCoupon} className="bg-red-500 px-4 py-1 border rounded-md text-sm">APPLY COUPON</button>
        </div>
        <button type='button' onClick={handleUpdateCart} disabled={!localCart} className="bg-red-500 px-4 py-1 border disabled:bg-red-300 rounded-md text-sm">UPDATE CART</button>
      </div>
    </div>
    <CheckoutDraft subtotal={subtotal} ></CheckoutDraft>
  </div>))
};
const mapStateToProps=(state: State,ownProps: CartListProps)=>({
    user:usernameSelector(state),
  
})
const mapDispatchToProps={
    updateCart:updateCartAction,
    verifyCoupon,
    setAlert: setAxiosErrorAction
}
const connectedComp=connect(mapStateToProps,mapDispatchToProps)
type redux_props= ConnectedProps<typeof connectedComp>

export default  memo(withProducts(connectedComp(CartList)));