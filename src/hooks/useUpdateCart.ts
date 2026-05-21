import { useDispatch, useSelector } from "react-redux";
import { cartSelector, usernameSelector } from "../selectors/user";
import { updateCartAction } from "../reducers/userDetails";



const useUpdateCart=()=>{
    const dispatch=useDispatch()
    const cart=useSelector(cartSelector);
    const user= useSelector(usernameSelector)
    

    return ((productId: number, quantity: number) =>{
        const oldnumber=cart[productId] || 0 ;
        const newCart={...cart, [productId] : oldnumber+quantity};
        dispatch(updateCartAction(newCart));
    })
}

export default useUpdateCart;