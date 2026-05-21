import React, {useState, useEffect, memo} from 'react';
import { CiCircleRemove } from "react-icons/ci";
import { Link } from 'react-router-dom';
import type { CartProductProps } from './CartProduct1.js';

function CartProduct2({product, removeItem, setLocalCart, cart}: CartProductProps){
  const [lclQuantity, setLclQuantity] = useState(cart[`${product.id}`]!);
  console.log('CartProduct2 rendered');
  const {id,thumbnail, title,price}= product
  
  function deleteItem(){
    removeItem(id);
  }

  
  return <div className="h-20 flex items-center">
    <CiCircleRemove className="text-2xl w-[3%]" onClick={deleteItem}/>
    <div className="h-[80%] w-20">
      <img className="h-full w-full object-fit" src={thumbnail} alt="product_pic" />
    </div>
    <Link to={`/product/${id}`} className="grow p-[1%] ">{title}</Link>
    <p className="w-[10%] ">₹{price}</p>
    <label htmlFor="quant" className="text-xs sr-only">Qantity</label>
    <input id='quant' className="w-[10%]" onChange={(e)=>{
      setLclQuantity(+e.target.value)
      setLocalCart({...cart, [id]:+e.target.value});
    }
    } value={lclQuantity}></input>
    <p className="w-[12%] " >₹{(lclQuantity * price).toFixed(2)} </p>

  </div>;
}
export default memo(CartProduct2);