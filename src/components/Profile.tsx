import { connect, type ConnectedProps } from "react-redux"
import type { State } from "../store"
import { userEmailSelector, userLoadingSelector, usernameSelector } from "../selectors/user"
import Loading from "./Loading"
import { useEffect, useState } from "react"
import { FaEdit } from "react-icons/fa";
import { requestEmailUpdate, requestUpdateUser, verifyEmailUpdateRequest } from "../actions/action"
import CountDown from "./CountDown"
import { setAxiosErrorAction, setUserAction, setUserLoadingAction } from "../reducers/userDetails"
import { useNavigate } from "react-router-dom"
import type { UserProfile } from "../types"

function Profile({username, userEmail,loading,setUser, sendOtp, verifyOtp, updateUser, setAlert}:Redux_Props){

    const [name, setName]=useState(username || '')
    const [localEmail, setLocalEmail]=useState(userEmail || '')
    const [email, setEmail]=useState(userEmail || '')
    const [editingName, setEditingName]=useState(false)
    const [editingEmail, setEditingEmail]=useState(false)
    const [oldOtp,setOldOtp]=useState("")
    const [newOtp,setNewOtp]=useState("")
    const [isSent, setIsSent]=useState(false)
    const [isFirst, setIsFirst]= useState(true);
    const navigate=useNavigate()

    useEffect(()=>{
      if(!name){
        setName(username!)
        setLocalEmail(userEmail!)
        setEmail(userEmail!)
      }
      const timer=setTimeout(()=>{
        if(isSent === true){
          setIsSent(false)
          setOldOtp('')
          setNewOtp('')
        }
      },60*1000)
  
      return () => {
        if (timer) {
          clearTimeout(timer);
        }
      };
  },[username,isSent])
    

    function handleSendOtp(){
      setAlert({code:"warning", message:"Try to send OTP",status: 400})
      sendOtp(localEmail!)
      setEmail(localEmail)
      setIsSent(true)
      if(isFirst){
        setIsFirst(false)
      }
    }

    function handleNameEditing(){
        setEditingName(!editingName)
    }
    function handleEmailEditing(){
        setEditingEmail(!editingEmail)
    }
    const handleLogout= () =>{
        setUser({} as UserProfile)
        localStorage.removeItem("token")
        localStorage.removeItem("mycarts")
        navigate('/');
    }
    function handleSave(){
        if(username !== name){
          setAlert({code:"warning", message:"Updating User Details",status: 400})
          updateUser(name)
        }
        if(localEmail !== userEmail){
          setAlert({code:"warning", message:"Verifying OTP, please wait!",status: 400})
          verifyOtp(oldOtp, newOtp)
        }
        setEditingEmail(false)
        setEditingName(false)

    }
    if(loading){
        return <Loading>Loading details, please wait!</Loading>
    }

    if(!username){
      navigate('/login')
    }
  
    return (
      <div className="w-full flex justify-center items-center  ">
    
        <div className="shadow-2xl rounded-3xl p-6 w-[80%] max-h-[95%] max-w-md mx-auto bg-[#ca2121] flex flex-col overflow-y-auto gap-2">
      
          <div className="flex justify-center">
            <img
              src="https://i.pravatar.cc/150?img=12"
              alt="Profile"
              className="w-20 h-20 rounded-full border-4 border-blue-500 shadow-lg object-cover"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold text-center  text-gray-800">
              Welcome {username}
            </h1>

            <p className="text-center text-gray-500 ">
              Your Profile Information
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 font-semibold mb-2"
              >
                Full Name
              </label>
              <div className="relative">
                <input
                  value={name}
                  id="name"
                  readOnly={!editingName}
                  onChange={(event)=>setName(event.target.value)}
                  className="w-full border border-blue-600 rounded-md px-1  bg-gray-50"
                />
            
                <FaEdit onClick={handleNameEditing} className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer" />
              </div>
            </div>
        

            <div className="flex flex-col gap-3">
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Email
                </label>
                <div  className="relative ">
                  <input
                    value={localEmail}
                    id="email"
                    readOnly={!editingEmail}
                    onChange={(event)=>setLocalEmail(event.target.value)}
                    className="w-full border border-blue-600 rounded-md px-1 bg-gray-50"
                  />
                  <FaEdit onClick={handleEmailEditing} className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer" />
                </div>
              </div>
              {editingEmail && <button disabled={localEmail === userEmail || isSent} onClick={handleSendOtp} type="button" className="w-full  bg-blue-600 hover:bg-blue-700 py-1 text-white font-semibold  rounded-md transition duration-300 disabled:bg-blue-400">
                <>{isFirst ? "Send OTP" : <div className='flex gap-1.5 justify-center'>Resend OTP {isSent && <CountDown/>}</div>}</>
                </button>}
              {(!isFirst && editingEmail) && <div>
                <div>
                  <label htmlFor="oldOtp" className="block text-gray-700 font-semibold mb-2">Enter Registered Email OTP</label>
                  <input type='number' id="oldOtp" placeholder="This field is required" onChange={(event)=>setOldOtp(event.target.value)} value={oldOtp} className="w-full border border-blue-600 rounded-md  py-1 bg-gray-50" /> 
                </div>
                <div>
                  <label htmlFor="newOtp" className="block text-gray-700 font-semibold mb-2">Enter New Email OTP</label>
                  <input type='number' id="newOtp" placeholder="This field is required"  onChange={(event)=>setNewOtp(event.target.value)} value={newOtp} className="w-full border border-blue-600 rounded-md py-1 bg-gray-50" /> 
                </div>
              </div>}
            </div>

          </div>

          {(editingEmail || editingName) && <button type="button" disabled={(email === userEmail && name === username)} onClick={handleSave} className="w-full  bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 rounded-md transition duration-300 disabled:bg-blue-400">
            Save
          </button>}
          <button type="button" onClick={handleLogout} className="bg-blue-700 border rounded-md p-1 mt-2 disabled:bg-blue-300">Logout</button>

        </div>
      </div>
)
}
const mapStateToProps=(state: State)=>({
    username:usernameSelector(state),
    userEmail: userEmailSelector(state),
    loading: userLoadingSelector(state)
})

const mapDispatchToProps={
    setAlert:setAxiosErrorAction,
    sendOtp:requestEmailUpdate,
    verifyOtp: verifyEmailUpdateRequest,
    updateUser: requestUpdateUser,
    setUser: setUserAction
}

const ConnectedComp=connect(mapStateToProps,mapDispatchToProps)

type Redux_Props=ConnectedProps<typeof ConnectedComp>

export default ConnectedComp(Profile)

function setUser(arg0: UserProfile) {
  throw new Error("Function not implemented.")
}
