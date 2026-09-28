import React from 'react';
import { Link } from '@tanstack/react-router';

const Navbar = () => {
  return (
    <nav className="app-nav">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
          <div className="flex items-center">
            <Link to="/" className="brand-mark">
              LinkShrink
            </Link>
          </div>
      </div>
    </nav>
  );
};

export default Navbar;