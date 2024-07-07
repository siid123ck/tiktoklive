import Link from 'next/link';
import { FC } from 'react';


const Nav: FC = () => {
  return (
    <nav className="bg-gray-800 p-4 flex justify-between">
      <h1 className='text-white font-bold'>
        <Link href="/" className="text-white">
            Tiktok Live
        </Link>
      </h1>  
      <ul className="flex space-x-4">
        <li>
          <Link href="/" className="text-white">
            For You
          </Link>
        </li>
        <li>
          <Link href="/live" className="text-white">
            Live
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
