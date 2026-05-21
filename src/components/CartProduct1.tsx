import React, {useState, useEffect, memo, type Dispatch, type SetStateAction} from 'react';
import { CiCircleRemove } from "react-icons/ci";
import { Link } from 'react-router-dom';
import type { Product } from '../types';

export  interface CartProductProps {
  product: Product
  removeItem: (id: number) => void;
  setLocalCart: Dispatch<SetStateAction<Record<string, number>>>;
  cart: Record<string, number>;
}

function CartProduct1({product, removeItem, setLocalCart, cart}: CartProductProps){
  const [lclQuantity, setLclQuantity] = useState(cart[`${product.id}`]!);
  console.log('CartProduct1 rendered');
  const {id,thumbnail, title,price}= product

  function deleteItem(){
    removeItem(id);
  }

  
  return <div className="h-20 flex items-center ">
    <div className="h-[90%] w-20 ">
      <img className="h-full w-full object-cover" src={thumbnail} alt="product_pic" />
    </div>
    <div className="flex flex-col grow px-4 py-1 justify-start h-full gap-0.5">
      <Link to={`/product/${id}`} className="text-sm font-bold">{title}</Link>
      <p className="w-[10%] text-xs">₹{price}</p>
      <p className="w-[12%] text-xs " >₹{(lclQuantity * price).toFixed(2)} </p>
    </div>
    <div  className='flex flex-col h-full justify-start gap-2 items-center w-6 '>
      <CiCircleRemove  onClick={deleteItem} className="text-2xl  "/>
      <label htmlFor="quant" className="text-xs sr-only">Qantity</label>
      <input id='quant' className="w-6 text-center" onChange={(e)=>{
        setLclQuantity(+e.target.value)
        setLocalCart({...cart, [id]:+e.target.value});
        }
      } value={lclQuantity}></input>

    </div>









    
   
   
    
   

  </div>;
}
export default memo(CartProduct1);