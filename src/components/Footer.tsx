import { useEffect, useState } from "react";
import Navbar2 from "./Navbar2";


function Footer() {
  const [width, setWidth]=useState(window.innerWidth < 768)

  useEffect(()=>{
    const handleResize = () => {
            setWidth(window.innerWidth < 768);
        };
      
        window.addEventListener("resize", handleResize);
      
        return () => window.removeEventListener("resize", handleResize);
       
      
  },[])
  return(
    
    <div className="flex fixed  left-0 bottom-0 w-full bg-gray-500 h-16  items-center justify-between px-2 py-5">
      {width ? <Navbar2/>: (
        <div className="flex justify-between grow">
          <h1>Copyright © Shopzilla</h1>
          <h1>Powered by Akash Prajapati</h1>
        </div>
      )}
    </div>
  );
}

export default Footer