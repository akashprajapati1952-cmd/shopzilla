import React, { type JSX } from 'react';
import { VscLoading } from "react-icons/vsc";

interface LoadingProps {
  children: string;
}
export default function Loading({children}: LoadingProps){
  return <div className="flex grow   bg-amber-300">
    <VscLoading className="animate-spin text-blue-700 text-3xl"/>
    <p className="text-xl text-blue-700">{children}</p>
    </div>;
};