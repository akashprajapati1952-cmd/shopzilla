
import { CgProfile } from "react-icons/cg";
import { IoMdNotifications, IoIosLogOut } from "react-icons/io";
import { IoHome } from "react-icons/io5";
import { ImCross } from "react-icons/im";
import { CiLogin } from "react-icons/ci";
import { Link, useNavigate } from 'react-router-dom';
import { BsInfoCircle } from "react-icons/bs";
import type { Cart, User, UserProfile } from '../types/index.js';
import type { Dispatch, SetStateAction } from 'react';
import { connect, type ConnectedProps } from 'react-redux';
import type { State } from '../store.js';
import { usernameSelector } from '../selectors/user.js';
import { setUserAction } from '../reducers/userDetails.js';

interface NavbarProps {
  showMenu: boolean;
  setShowMenu: (show: boolean) => void;
}
type Props=NavbarProps & redux_props

function Navbar({username, setUser, showMenu, setShowMenu}: Props) {
  const icons="text-white text-xl"
  const menu="flex gap-2 items-center"
  const classes="text-white"
  
  const navigate=useNavigate();
  const handleLogout= () =>{
    setUser({} as UserProfile)
    localStorage.removeItem("token")
    localStorage.removeItem("mycarts")
    navigate('/');
  }
  return (
    <div className={` w-50 h-dvh bg-slate-900 border border-white rounded-xl fixed top-0 right-0 flex z-1 flex-col items-center pt-10 pb-5 transition-transform duration-700 ease-in-out 
  ${showMenu ? 'translate-x-0' : 'translate-x-full'}`}>
        <ImCross className="absolute top-3 right-3 text-white" onClick={(e)=>{setShowMenu(false)}}/>
        {username && 
            <div className="pb-5 relative">
                <p className="text-white text-xl">{username}</p>
            </div>
        }
        <div className="flex flex-col items-start gap-2 w-[70%]">
              
            <div className={menu}>
                <CgProfile className={icons}/>
                <Link to="/profile" className={classes}>Profile</Link>
            </div>
              
            <div className={menu}>
                <IoMdNotifications className={icons} />
                <Link to="/notifications" className={classes}>Notification</Link>
            </div>
            <div className="border-t border-slate-700/50  w-full"></div>
              
            <div className={menu}>
                <IoHome className={icons}/>
                <Link to="/" className={classes}>Home</Link>
            </div>
              
            {username ? 
                <div className={menu}>
                    <IoIosLogOut className={icons}/>
                    <button type="button" onClick={handleLogout}className={classes} >Logout</button>
                </div>: <div className={menu}>
                    <CiLogin className={icons}/>
                    <Link to="/login" className={classes}>Login</Link>
                </div>
            }
        </div>
        <div  className="text-white w-[70%] mt-auto flex items-center gap-2 cursor-pointer" onClick={()=> {navigate("/about"); setShowMenu(false)}}>
          <BsInfoCircle />
          <button type="button">About us</button>
        </div>
    </div>
      
  )
    
}
const mapStateToProps=(state: State, ownProps: NavbarProps )=>({
  username:usernameSelector(state)

})
const mapDispatchToProps={
   setUser: setUserAction
}
const connectedComp=connect(mapStateToProps,mapDispatchToProps)
type redux_props= ConnectedProps<typeof connectedComp>

export default connectedComp(Navbar);