import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container } from './Layout';
import { Button } from './Button';
import { useAuthenticator } from "@aws-amplify/ui-react";
import { fetchUserAttributes } from 'aws-amplify/auth';

export const Navbar: React.FC = () => {
  const { user, signOut } = useAuthenticator();
  const [name, setName] = useState('');

  useEffect(() => {
    const loadAttributes = async () => {
      if (user) {
        const attrs = await fetchUserAttributes();
        setName(
          attrs.name ||
          attrs.given_name ||
          attrs.email ||
          user.username
        );
      }
    };
    loadAttributes();
  }, [user]);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-100">
        <Container>
          <div className="flex justify-between items-center h-24">

            {/* Logo */}
            <div className="text-2xl font-black italic text-indigo-600 tracking-tighter">
              COVENTRY<span className="text-slate-900">ECO</span>
            </div>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-10">
              {[
                { label: 'Home', to: '/' },
                { label: 'Businesses', to: '/businesses' },
              ].map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors uppercase tracking-widest"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Auth Group */}
            <div className="flex items-center gap-6">
              {user ? (
                <>
                  <span className="text-sm text-slate-600">Hi {name}</span>
                  <Button variant='info' onClick={signOut}>Sign out</Button>
                </>
              ) : (
                <span className="text-sm text-slate-500">Sign in or register to see more</span>
              )}
            </div>

          </div>
        </Container>
      </nav>
    </>
  );
};

export default Navbar;