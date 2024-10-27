import React from 'react';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-sm">TravelAI is your AI-powered travel planning assistant, helping you create unforgettable journeys.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm hover:text-gray-300">Terms of Service</a></li>
              <li><a href="#" className="text-sm hover:text-gray-300">Privacy Policy</a></li>
              <li><a href="#" className="text-sm hover:text-gray-300">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-300"><Facebook size={20} /></a>
              <a href="#" className="hover:text-gray-300"><Twitter size={20} /></a>
              <a href="#" className="hover:text-gray-300"><Instagram size={20} /></a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <form className="flex">
              <input type="email" placeholder="Your email" className="px-3 py-2 text-gray-700 rounded-l-md focus:outline-none" />
              <button type="submit" className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-primary/90">
                <Mail size={20} />
              </button>
            </form>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          <p>&copy; 2024 TravelAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;