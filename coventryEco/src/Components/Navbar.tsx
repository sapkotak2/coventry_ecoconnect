import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthenticator } from "@aws-amplify/ui-react";
import { fetchUserAttributes } from 'aws-amplify/auth';

export const Navbar: React.FC = () => {
  const { user, signOut } = useAuthenticator();
  const [name, setName] = useState('');
  const location = useLocation();

  useEffect(() => {
    const loadAttributes = async () => {
      if (user) {
        const attrs = await fetchUserAttributes();
        setName(
          attrs.email ||
          attrs.name ||
          attrs.given_name ||
          user.username
        );
      }
    };
    loadAttributes();
  }, [user]);

  const links = [
    { label: 'Home', to: '/' },
    { label: 'Businesses', to: '/businesses' },
    { label: 'Reviews', to: '/reviews' },
    { label: 'Admin', to: '/admin' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">


            <span className="text-xl font-extrabold text-gray-900">
              Eco<span className="text-green-600">Connect</span>
            </span>
      

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-2">
            {links.map(link => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.label}
                  to={link.to}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                    isActive
                      ? "bg-green-50 text-green-700"
                      : "text-gray-700 hover:text-green-700"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Auth */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="hidden md:inline text-sm text-gray-600">
                  Hi {name}
                </span>
                <button
                  onClick={signOut}
                  className="bg-green-600 text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-green-700 transition"
                >
                  Sign out
                </button>
              </>
            ) : (
              <span className="text-sm text-gray-500">Sign in or register</span>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;