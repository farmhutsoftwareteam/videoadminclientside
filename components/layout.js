import React from 'react';
import Navbar from './navbar';
import Sidebar from './sidebar';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 p-4 md:p-8 bg-gray-100 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
