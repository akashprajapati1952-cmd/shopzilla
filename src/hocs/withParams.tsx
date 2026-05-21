import React from 'react'
import { useSearchParams, type SetURLSearchParams } from 'react-router-dom';
export interface withParamsProps{
    params: Record<string,string>;
    setSearchParams: SetURLSearchParams;
}
const withParams= <Props extends withParamsProps>(Component: React.ComponentType<Props>)=>(
    (props: Omit<Props, keyof withParamsProps>)=>{
        const [searchParams, setSearchParams]=useSearchParams();
        const params=Object.fromEntries([...searchParams]);
        return <Component {...(props as Props)} params={params} setSearchParams={setSearchParams}/>
    }
)

export default withParams;