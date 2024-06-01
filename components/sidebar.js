import React from 'react';
import Link from 'next/link';
import { Home, Video, Tv, BarChart2, Settings } from 'lucide-react'; // Importing the necessary icons

const Sidebar = () => {
  return (
    <div className="w-64 h-full bg-gray-700 text-white flex flex-col">
      <Link legacyBehavior href="/dashboard">
        <a className="py-4 px-6 flex items-center hover:bg-gray-600">
          <Home className="mr-2" size={20} aria-hidden="true" />
          Dashboard
        </a>
      </Link>
      <Link legacyBehavior href="/videos">
        <a className="py-4 px-6 flex items-center hover:bg-gray-600">
          <Video className="mr-2" size={20} aria-hidden="true" />
          Shows
        </a>
      </Link>
      <Link legacyBehavior href="/episodes">
        <a className="py-4 px-6 flex items-center hover:bg-gray-600">
          <Tv className="mr-2" size={20} aria-hidden="true" />
          Episodes
        </a>
      </Link>
      <Link legacyBehavior href="/finance">
        <a className="py-4 px-6 flex items-center hover:bg-gray-600">
          <BarChart2 className="mr-2" size={20} aria-hidden="true" />
          Finance
        </a>
      </Link>
      <Link legacyBehavior href="/settings">
        <a className="py-4 px-6 flex items-center hover:bg-gray-600">
          <Settings className="mr-2" size={20} aria-hidden="true" />
          Settings
        </a>
      </Link>
    </div>
  );
};

export default Sidebar;
