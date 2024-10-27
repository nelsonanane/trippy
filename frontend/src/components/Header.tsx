import React from 'react';
import { Plane, User, Menu } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-primary text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Plane size={24} />
          <span className="text-xl font-bold">TravelAI</span>
        </div>
        <nav className="hidden md:flex space-x-4">
          <a href="#" className="hover:text-gray-200">Home</a>
          <a href="#" className="hover:text-gray-200">My Trips</a>
          <a href="#" className="hover:text-gray-200">Profile</a>
          <a href="#" className="hover:text-gray-200">Support</a>
        </nav>
        <div className="flex items-center space-x-4">
          <button className="hover:text-gray-200">
            <User size={24} />
          </button>
          <button className="md:hidden">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;