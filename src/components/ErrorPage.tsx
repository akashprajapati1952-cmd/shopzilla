import React, { type ReactNode } from 'react';
import {Link} from 'react-router-dom';

export default function ErrorPage({children}: {children: ReactNode}){
  console.log('ErrorPage rendered');
  return <div className="flex grow justify-center items-center flex-col gap-2 p-5">
    <h1 className="text-2xl text-red-700">Error: {children}</h1>
    <Link className="bg-blue-300 px-3 py-1 border rounded-xl" to="/">Go to Homepage</Link>
  </div>
};