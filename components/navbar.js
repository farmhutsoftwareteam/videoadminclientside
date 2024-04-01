import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center py-4 px-8 bg-gray-800 text-white">
      <div>
        <Link href="/">
        <span>HTSV</span>
        </Link>
        
      </div>
      <div className="flex items-center">
        <Link legacyBehavior href="/upload">
          <a className="text-white hover:text-gray-200 mr-4">Upload New Video</a>
        </Link>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;