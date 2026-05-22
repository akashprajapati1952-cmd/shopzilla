import React, { useState, memo, useMemo } from 'react'
import { CiShoppingCart } from "react-icons/ci";
import  {Link, useLocation, type SetURLSearchParams} from 'react-router-dom';
import {GiHamburgerMenu} from 'react-icons/gi'
import Navbar from './Navbar.js';
import Navbar1 from './Navbar1.js';
import { loadProductsAction } from '../reducers/product.js';
import { connect, type ConnectedProps } from 'react-redux';
import type { State } from '../store.js';
import withParams from '../hocs/withParams.js';
import { IoSearchSharp } from "react-icons/io5";

type HeaderProps ={
  src: string;
  params: Record<string,string>;
  setSearchParams: SetURLSearchParams;
} & redux_props

function Header({src,params, setSearchParams,loadProducts}: HeaderProps) {


  const [width, setWidth]=useState(window.innerWidth > 768)
  const {sortBy='default', order='asc',q='', limit='30', skip='0'}=params;
  const [searchText, setSearchText]=useState(q)
  const param = useMemo(() => {
    return new URLSearchParams(params).toString();
    }, [params]);
  
  const selectedSort= sortBy === "title" ? "title" : sortBy === 'price' && order === 'asc'
      ? "pricelow" : sortBy === 'price' && order ==="desc" ? 'pricehigh' :'default'
  
  
  React.useEffect(()=>{

    loadProducts(param)
    const handleResize = () => {
        setWidth(window.innerWidth > 768);
    };
  
    window.addEventListener("resize", handleResize);
  
    return () => window.removeEventListener("resize", handleResize);
  },[sortBy,order,q ])

  function controlSearch(){
    setSearchParams({sortBy, order, q: searchText, limit: String(limit), skip: String(skip)});
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
  
  
  return(
    <div className="flex fixed  z-5 left-0 top-0  h-16 items-center w-full justify-between px-2 py-5 bg-[#ca2121]">
      <img className="w-25" src={src} alt="_logo"></img>
      <div className='flex gap-3'>
      <div className='relative flex items-center'>
        <input className="pl-1 w-25 border border-gray-500 bg-gray-300 text-xs rounded-3xl" placeholder="Search" value={searchText} onChange={(event)=>setSearchText(event?.target.value)}></input>
        <IoSearchSharp className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer" onClick={controlSearch}/>
      </div>
      <select title='sort' className="pl-1 border w-25 border-gray-500 bg-gray-300 text-xs rounded-3xl" onChange={controlSorting} value={selectedSort}>
        <option value="default" >Default sorting</option>
        <option value="title">Sort by title</option>
        <option value="pricelow">Sort by price:low to high</option>
        <option value="pricehigh">Sort by price:high to low</option>
      </select>
      </div>
      {width && <Navbar1/>}
      
    </div>
  );
}
const mapDispatchToProps={
    loadProducts:loadProductsAction
}
const connectedComp=connect(null,mapDispatchToProps)
type redux_props= ConnectedProps<typeof connectedComp>

export default (memo(withParams(connectedComp(Header))));