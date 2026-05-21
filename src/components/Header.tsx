import React, { useState, memo } from 'react'
import { CiShoppingCart } from "react-icons/ci";
import  {Link, useLocation} from 'react-router-dom';
import {GiHamburgerMenu} from 'react-icons/gi'
import Navbar from './Navbar.js';
import Navbar1 from './Navbar1.js';

interface HeaderProps {
  src: string;
  data : number;
}

function Header({src, data}: HeaderProps) {
  const location=useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const [width, setWidth]=useState(window.innerWidth > 768)
  
  
  
  
  React.useEffect(()=>{

    setShowMenu(false);
    const handleResize = () => {
        setWidth(window.innerWidth > 768);
    };
  
    window.addEventListener("resize", handleResize);
  
    return () => window.removeEventListener("resize", handleResize);
  },[location])
  
  const handleShow= ()=> {setShowMenu(false)}
  return(
    <div className="flex fixed  z-5 left-0 top-0  h-[6dvh] items-center w-full justify-between px-2 py-5 bg-[#ca2121]">
      <img className="w-25" src={src} alt="_logo"></img>
      {width && <Navbar1/>}
      
    </div>
  );
}
export default (memo(Header));