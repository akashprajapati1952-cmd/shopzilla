import {Link} from 'react-router-dom';

export default function PageNotFound(){
  return <div className="flex grow flex-col items-center justify-center p-5 bg-[url('/pagenotfound.jpg.png')]">
    <p className='text-red-500'>The page you are trying to reach does not exist.</p>   
    <Link className="bg-blue-300 px-3 py-1 border rounded-xl" to="/">Go to Homepage</Link>
   
  </div>;
};

  
