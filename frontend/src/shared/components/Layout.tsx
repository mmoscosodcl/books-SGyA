import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/books', label: 'Books' },
  { to: '/auth/login', label: 'Login' },
  { to: '/auth/register', label: 'Register' },
  { to: '/dashboard', label: 'Dashboard' },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Brand */}
          <Link to="/" className="text-xl font-bold text-blue-600 tracking-tight">
            Librería SGyA
          </Link>

          {/* Nav */}
          <nav>
            <ul className="flex items-center gap-6 list-none m-0 p-0">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className={`text-sm font-medium transition-colors ${
                        isActive
                          ? 'text-blue-600 border-b-2 border-blue-600 pb-0.5'
                          : 'text-gray-600 hover:text-blue-600'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 text-center text-sm py-4">
        &copy; 2026
      </footer>
    </div>
  );
}