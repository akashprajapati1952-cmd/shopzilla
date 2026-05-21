import React, { useState, useEffect, memo, useMemo } from 'react';
import Product from './Product.js';
import Loading from './Loading.js';
import {type SetURLSearchParams } from 'react-router-dom';
import { FaArrowLeft , FaArrowRight} from "react-icons/fa";
import {connect,type ConnectedProps} from 'react-redux'
import { loadProductsAction } from '../reducers/product.js';
import type { State } from '../store.js';
import { errorSelector, loadingSelector, productsSelector, responseDetailSelector } from '../selectors/product.js';
import withParams from '../hocs/withParams.js';





type Props=redux_props & {
  params: Record<string,string>;
  setSearchParams: SetURLSearchParams;}

function Content({products, details, loading,error,params, setSearchParams, loadProducts}:Props) {

  const PAGE_SIZE=30;
  
  console.log('Content rendered');
  const {sortBy='default', order='asc',q='', limit=PAGE_SIZE, skip=0}=params;
  const len=details? Math.ceil((details.total/PAGE_SIZE)) : 0;
  const pageNo=+(skip ? (+skip)/PAGE_SIZE +1 : 1 );
  const isFirstPage = pageNo === 1;
  const isLastPage = pageNo === len;
  const param = useMemo(() => {
  return new URLSearchParams(params).toString();
  }, [params]);
  

  useEffect(function() {
    
    loadProducts(param)

  }, [param]);
  
  function controlSearch(event: React.ChangeEvent<HTMLInputElement>){
    setSearchParams({sortBy, order, q: event.target.value, limit: String(limit), skip: String(skip)});
  };
  function controlSorting(event: React.ChangeEvent<HTMLSelectElement>){
    let sort;
    let ord;
    if(event.target.value =='title'){setSearchParams({...params, sortBy:  'title' , order: 'asc'}); return;}
    if(event.target.value =='pricelow'){sort='price'; ord='asc';} 
    else if(event.target.value =='pricehigh'){sort='price'; ord='desc';}
    else{sort='';}
    setSearchParams({...params, sortBy:  sort, order: ord!});
  };
 

  if(error){
    return <div className="flex grow justify-center items-center flex-col gap-2">
      <h1 className="text-2xl text-red-700">{error?.message}</h1>
    </div>;
  };
  
  
  return(
    <div className="relative flex flex-col box-border overflow-auto grow ">
      <input className="absolute top-3 left-3 sm:top-10 sm:left-10 w-[25%] max-w-40 px-1 border-2 border-gray-500 bg-gray-300 text-[10px] " placeholder="Search"  onChange={controlSearch}></input>
      <select title='sort' className="absolute top-3 right-3 sm:top-10 sm:right-10 ml-auto w-[25%] max-w-40  px-1 border-2 border-gray-500 bg-gray-300 text-[10px]" onChange={controlSorting} value={sortBy}>
        <option value="default" >Default sorting</option>
        <option value="title">Sort by title</option>
        <option value="pricelow">Sort by price:low to high</option>
        <option value="pricehigh">Sort by price:high to low</option>
      </select>
      { !loading ? (products.length !== 0 ? <div className="grid mx-8 my-15 md:mx-10 md:my-20  place-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 min-w-[calc(100%-80px)] grow ">
        {products.map(function(product){
          return(<Product pic={product.thumbnail ?? 'https://www.google.com/search?q=product+default+image&sca_esv=fcc86b8bedf6676a&rlz=1C1CHBF_enIN1126IN1126&aep=48&udm=2&prmd=ivns&sxsrf=ANbL-n4CC6FoTMUMM2_fOhY_ebYll9Vpnw:1778816354581&source=lnms&sa=X&ved=2ahUKEwi1wb2nr7qUAxUR6jgGHQvgIqMQ0pQJegQIBhAK&biw=1100&bih=570&dpr=1.31#sv=CAMSVhoyKhBlLWdYblZXMThJRjFJZGVNMg5nWG5WVzE4SUYxSWRlTToOZ25UOThSd2N2T1RlZk0gBCocCgZtb3NhaWMSEGUtZ1huVlcxOElGMUlkZU0YADABGAcg9aLHiA9KCBABGAEgASgB'}
               key={product.id}
               name={product.title}
               price={product.price}
               catagory={product.category}
               id={product.id}
        
          />
          );
        })}
      </div>: <div className=" grow text-red-700 self-center pt-[30vh]">Match not found!</div>) : <Loading>Loading products...</Loading>}
      
      <div className="flex gap-1 m-3">
        {[...Array(len).keys()].map((num)=> {
          if(len<6){
            return (<button type='button' key={num} disabled={num+1 == pageNo} onClick={()=>{setSearchParams({...params, limit:String(PAGE_SIZE), skip:String(PAGE_SIZE*num)});} } className={"px-2 py-1 m-1  text-sm"+ ((+skip === PAGE_SIZE * num) ? " bg-red-500 text-white" :" bg-blue-500 text-white" )}>{num+1}</button>) 
          } else {
            if(num<3){
              return (<button type='button' key={num} disabled={num+1 == pageNo} onClick={()=>{setSearchParams({...params, limit:String(PAGE_SIZE), skip:String(PAGE_SIZE*num)}); } } className={"px-2 py-1 m-1 text-sm"+ ((+skip === PAGE_SIZE * num) ? " bg-red-500 text-white" :" bg-blue-500 text-white" )}>{num+1}</button>)
            } else if(num ===3){
              return (
                <div className="flex" key={num}>
                  {pageNo == 1 || <button type='button' title='page 1' onClick={()=>{setSearchParams({...params, limit:String(PAGE_SIZE), skip:String(+skip-PAGE_SIZE)}); } } className={"px-2 py-1 m-1  text-sm"+ ((pageNo > 3 && pageNo < len && isFirstPage) ? " bg-red-500 text-white" :" bg-blue-500 text-white" )}><FaArrowLeft /></button>}
                  <div className='self-end text-3xl text-blue-500'>...{(pageNo < 4 || pageNo === 7) || <button type='button'  className={"px-2 py-1 m-1  text-sm bg-red-500 text-white"}>{pageNo}</button>}...</div>
                  {pageNo ==  (len) || <button type='button' title={`page ${len}`} onClick={()=>{setSearchParams({...params, limit:String(PAGE_SIZE), skip:String(+skip+PAGE_SIZE)});} } className={"px-2 py-1 m-1 text-sm"+ ((pageNo < len && pageNo > 3 && isLastPage) ? " bg-red-500 text-white" :" bg-blue-500 text-white" )}><FaArrowRight /></button>}
                </div>
              )
            } else if(num === len-1){
              return (<button type='button' key={num} disabled={num+1 == pageNo} onClick={()=>{setSearchParams({...params, limit:String(PAGE_SIZE), skip:String(PAGE_SIZE*num)});  } } className={"px-2 py-1 m-1 text-sm"+ ((+skip === PAGE_SIZE * num) ? " bg-red-500 text-white" :" bg-blue-500 text-white" )}>{num+1}</button>)
            }
          }
        })}
      </div>
    </div> 
  );};
const mapStateToProps=(state: State)=>({
    products: productsSelector(state),
    details: responseDetailSelector(state),
    loading: loadingSelector(state),
    error: errorSelector(state),
    
})
const mapDispatchToProps={
    loadProducts:loadProductsAction
}
const connectedComp=connect(mapStateToProps,mapDispatchToProps)
type redux_props= ConnectedProps<typeof connectedComp>

export default memo(withParams(connectedComp(Content)));