import React, { useState } from 'react';
import Link from 'next/link';
import { Home, Tv, BarChart2, Library, Settings, Menu, X } from 'lucide-react'; // Importing the necessary icons

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // Initial state set to false

  return (
    <div
      className={`h-full bg-gray-700 text-white flex flex-col transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      <div className="flex items-center justify-center py-4 px-6 hover:bg-gray-600 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </div>
      <div className="flex flex-col flex-1">
        <Link legacyBehavior href="/dashboard">
          <a className="py-4 px-6 flex items-center hover:bg-gray-600">
            <Home className="mr-2" size={20} aria-hidden="true" />
            {isOpen && <span className="hidden md:inline">Dashboard</span>}
          </a>
        </Link>
        <Link legacyBehavior href="/shows">
          <a className="py-4 px-6 flex items-center hover:bg-gray-600">
            <Tv className="mr-2" size={20} aria-hidden="true" />
            {isOpen && <span className="hidden md:inline">Shows</span>}
          </a>
        </Link>
        <Link legacyBehavior href="/finance">
          <a className="py-4 px-6 flex items-center hover:bg-gray-600">
            <BarChart2 className="mr-2" size={20} aria-hidden="true" />
            {isOpen && <span className="hidden md:inline">Finance</span>}
          </a>
        </Link>
        <Link legacyBehavior href="/categories">
          <a className="py-4 px-6 flex items-center hover:bg-gray-600">
            <Library className="mr-2" size={20} aria-hidden="true" />
            {isOpen && <span className="hidden md:inline">Categories</span>}
          </a>
        </Link>
        <Link legacyBehavior href="/settings">
          <a className="py-4 px-6 flex items-center hover:bg-gray-600">
            <Settings className="mr-2" size={20} aria-hidden="true" />
            {isOpen && <span className="hidden md:inline">Settings</span>}
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;