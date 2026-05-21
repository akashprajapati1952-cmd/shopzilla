import { useMemo,useEffect,useState} from 'react'
import {Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Content from './components/Content'
import Productdetail from './components/Productdetail'
import PageNotFound from './components/PageNotFound'
import CartList from './components/CartList'
import Login from './components/Login'
import Signup from './components/Signup'
import ForgetPassword from './components/ForgetPassword'
import AboutModal from './components/AboutModal';
import Alert from './components/Alert'
import type { Cart } from './types/index'
import useUpdateCart from './hooks/useUpdateCart'
import type { State } from './store'
import { cartSelector, usernameSelector } from './selectors/user'
import { connect, type ConnectedProps } from 'react-redux'
import useRemoveProduct from './hooks/useRemoveProduct'
import { userReloginAction } from './actions/action'
import Test from './test/Test'
import Profile from './components/Profile'
import Notifications from './components/Notifications'
import Warning from './components/Warning'

type Props={} & redux_props

function App({cart, userlogin, user}: Props){

  const updateCart= useUpdateCart()
  const [show, setShow]=useState(true)
  const [width, setWidth]=useState(window.innerWidth < 768)
  const removeProduct= useRemoveProduct()
  useEffect(()=>{
    if(!user){
      userlogin()
    }
    const handleResize = () => {
        setWidth(window.innerWidth < 768);
    };
  
    window.addEventListener("resize", handleResize);
  
    return () => window.removeEventListener("resize", handleResize);
   
  },[user, window.innerWidth])
  
  const totleCount=useMemo(function(){
    if(cart){
      return (+Object.keys(cart).reduce(function(previous, current){
        return previous + cart[current]! }, 0))
    }else return 0
  },[cart]);
  console.log(width)
  
  
  return (

    <div className="flex flex-col relative bg-white w-full h-dvh py-[8vh]">
      <Header src="/logo.png" data={totleCount} />
      <div className="flex grow bg-white ">
      <Alert/>
      {show && <Warning onclick={()=>setShow(false)}/>}
        <Routes>
         
          <Route index element={<Content></Content>}/>
          
          <Route path="/product/:id" element={<Productdetail updateCart={updateCart}></Productdetail>}/>
          
          <Route path="/Cart" element={<CartList cart={cart} removeProduct={removeProduct}  />}/>

         
          <Route path='*' element={<PageNotFound/>}/>
          
          <Route path="/login" element={<Login></Login>}></Route>
          
          <Route path="/signup" element={<Signup></Signup>}></Route>
          
          <Route path="/forgetPassword" element={<ForgetPassword></ForgetPassword>}></Route>

          <Route path="/about" element={<AboutModal />}></Route>

          <Route path='/profile' element={<Profile/>}></Route>

          <Route path='/notifications' element={<Notifications/>}></Route>

          <Route path='/test' element={<Test/>}></Route>
  
        </Routes>

      </div>
     

      {width  && <Footer/>}
    </div>
  )
}
const mapStateToProps=(state: State)=>({
  cart: cartSelector(state),
  user: usernameSelector(state)
})
const mapDispatchToProps={
  userlogin: userReloginAction
}
const connectedComp=connect(mapStateToProps,mapDispatchToProps)
type redux_props= ConnectedProps<typeof connectedComp>
export default connectedComp(App);