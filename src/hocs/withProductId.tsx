import React from 'react'
import { useParams } from 'react-router-dom';
export interface withProductIdProps{
    productId: number
}
const withProductId= <Props extends withProductIdProps>(Component: React.ComponentType<Props>)=>(
    (props: Omit<Props, keyof withProductIdProps>)=>{
        const {id}=useParams();

        return <Component {...(props as Props)} productId={id}/>
    }
)

export default withProductId;