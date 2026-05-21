import React, {useState, useEffect, memo} from 'react';
import { HiArrowLeft } from "react-icons/hi";
import {Link} from 'react-router-dom'
import Loading from './Loading.js'
import ErrorPage from './ErrorPage.js'
import { connect, type ConnectedProps } from 'react-redux';
import { loadProductDetailAction } from '../reducers/product.js';
import type { State } from '../store.js';
import { productErrorSelector, productLoadingSelector, productSelector } from '../selectors/product.js';
import withProductId from '../hocs/withProductId.js';

interface ownProps{
  updateCart: (productId: number, quantity: number) => void;
  productId: number;
}

type ProductdetailProps = ownProps & redux_props


function Productdetail({updateCart,loadProduct, product, loading, error,productId}: ProductdetailProps) {

  const [quant, setquant]=useState(1)



  console.log('Productdetail rendered');
 
  useEffect(function() {
    
    setquant(1);
    if(!product){loadProduct(productId)}
    
    
  }, [productId]);
  function handleClickButton(){
    updateCart(productId, quant );
  }
  
  
  function quantChange(event: React.ChangeEvent<HTMLInputElement>){
    let newquant=event.target.value;
    setquant(+newquant);
  }

  
  if(loading || !product){
    return <Loading>Loading details</Loading>
  }
  
  if(error){
     return <ErrorPage>{error.message}</ErrorPage>
  }
  const {thumbnail, category, title, description, price}=product!;
  
  
  
  
  return(
    <div className="flex grow  m-auto overflow-auto relative max-w-100 sm:max-w-150 bg-white gap-4 flex-col items-center p-5 sm:flex-row sm:h-90">
      <Link to='/' className ="absolute left-1 top-2 "><HiArrowLeft className="w-10" /></Link>
      {thumbnail && <img className="w-[50%] max-w-50 bg-gray-300" src={thumbnail} alt={title} />}
      <div className="flex flex-col p-2 gap-2">
        <h2 className=" text-sm text-gray-500 font-bold">{category}</h2>
        <h1 className="text-xl font-bold">{title}</h1>
        
        <h2 className=" text-md font-bold">₹{price}</h2>
        <p className="text-sm">{description}</p>
        <div className="flex gap-2">
          <label htmlFor="quant" className="text-xs sr-only">Qantity</label>
          <input id="quant" onChange={quantChange} className="w-10 border border-indigo-700 text-center" type="number" value={quant}></input>
          <button type='button' onClick={handleClickButton} className="bg-red-700 text-white px-5 py-1 text-sm">ADD TO CART</button>
        </div>
        <div className="flex justify-between mt-8">
          <Link className="font-bold text-indigo-700 text-sm" to={`/product/${Number(productId) - 1}`}>Previous</Link>
          <Link className="font-bold text-indigo-700 text-sm" to={`/product/${Number(productId) + 1}`}>Next</Link>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps=(state: State, ownProps: ownProps )=>({
  product: productSelector(state, ownProps.productId),
  loading: productLoadingSelector(state,ownProps.productId),
  error: productErrorSelector(state,ownProps.productId)

})
const mapDispatchToProps={
   loadProduct:loadProductDetailAction
}
const connectedComp=connect(mapStateToProps,mapDispatchToProps)
type redux_props= ConnectedProps<typeof connectedComp>

export default withProductId(connectedComp(memo(Productdetail)));