import {useEffect} from 'react';

import { TiTick } from "react-icons/ti";
import { VscError } from "react-icons/vsc";
import { IoWarningOutline } from "react-icons/io5";
import type { Alert } from '../types/index.js';
import type { State } from '../store.js';
import { connect, type ConnectedProps } from 'react-redux';
import { axiosAlertSelector } from '../selectors/user.js';
import { setAxiosErrorAction } from '../reducers/userDetails.js';

interface AlertProps {}
type Props=AlertProps & Redux_Props

const themeMap=[
  {
    type:"success",
    color:"bg-green-500",
    icon:<TiTick className='h-[80%] w-[80%]' />
  },
  {
    type:"error",
    color:"bg-red-500",
    icon:<VscError className='h-[80%] w-[80%]'/>
  },
  {    
    type:"warning",
    color:"bg-yellow-500",
    icon:<IoWarningOutline className='h-[80%] w-[80%]'/>
  }

]

function Alert({alert,removeAlert}: Props) {
  useEffect(() => {
      if(alert) {
        const timer = setTimeout(() => {
          removeAlert(null);
        }, 5* 1000);
        return () => clearTimeout(timer);
      }
  },[alert])
  
  if(!alert) {
    return null;
  }
  let theme = themeMap.find(t => t.type === alert.code);
  if(!theme){
    theme=themeMap[1]
  }
  const {color,icon} = theme!;
  const {message} = alert;
  console.log('alert rendered')
  
  return (
    <div className='w-[90%]  z-50 bg-gray-500  flex items-center border border-gray-500 pr-2 rounded fixed top-20 left-1/2 -translate-x-1/2 -translate-y-1/2  '>
      <div className={" flex justify-center items-center w-15 h-15 shrink-0 " + color}>
        {icon}
      </div>
      <div className="flex items-center grow text-sm p-2 flex-wrap">
        {message}
      </div>
      <button type='button' className=' h-full ' onClick={()=>removeAlert(null)}>Dismiss</button>
  
    </div>
  )
 
}
const mapStateToProps=(state: State)=>({
    alert:axiosAlertSelector(state),
  
})
const mapDispatchToProps={
    removeAlert:setAxiosErrorAction
}
const connectedComp=connect(mapStateToProps,mapDispatchToProps)
type Redux_Props= ConnectedProps<typeof connectedComp>
export default connectedComp(Alert);