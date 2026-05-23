import { useState, memo } from 'react'
import { Link } from 'react-router-dom'

interface ProductProps {
  id: number;
  name: string;
  catagory: string;
  price: number;
  pic: string;
}

function Product(data: ProductProps) {
  return(
    <div className="flex flex-col   w-full max-w-75 gap-1 lg:flex-col lg:max-w-75 self-center ">
      <img alt='product_img' className="  border-0 rounded-lg w-full max-w-40 self-center aspect-square bg-gray-300" src={data.pic}></img>
      <div className='flex flex-col gap-1.5 '>
        <h1 className="text-sm font-bold leading-tight">{data.name} (<span className='text-green-700'>{data.catagory}</span>)</h1>
        <div className="flex h-3 w-4">
          <img alt='product_img' src="/Star.png"></img>
          <img alt='product_img' src="/Star.png"></img>
          <img alt='product_img' src="/Star.png"></img>
          <img alt='product_img' src="/Star.png"></img>
          <img alt='product_img' src="/Star.png"></img>
        </div>
        <p className="text-[11px] font-bold">₹{data.price}</p>
        <Link className="text-[11px] w-20 text-center bg-blue-300 px-1 border rounded-sm font-bold" to={`/product/${data.id}`}> Show detail </Link>
      </div>
    </div>
  );
}

export default memo(Product);