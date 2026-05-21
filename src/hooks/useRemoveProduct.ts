import { useDispatch, useSelector } from "react-redux";

import { cartSelector, usernameSelector } from "../selectors/user";
import { updateCartAction } from "../reducers/userDetails";

const useRemoveProduct=()=>{
    const dispatch=useDispatch()
    const cart=useSelector(cartSelector);
    const user= useSelector(usernameSelector)
    return ((productId: number)=>{
        const newCarts={...cart};
        delete newCarts[productId]
        if(user){
            dispatch(updateCartAction(newCarts));
        } else{localStorage.setItem("mycarts", JSON.stringify(newCarts));}
    })
}

export default useRemoveProduct;









