import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../hooks';
import { ToastContainer } from './ToastContainer';

const commonLinks = [
  { to: '/', label: 'Home' },
  { to: '/books', label: 'Books' },
];

const guestLinks = [
  { to: '/auth/login', label: 'Login' },
  { to: '/auth/register', label: 'Register' },
];

const authLinks = [
  { to: '/books/manage', label: 'Manage Books' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/auth/logout', label: 'Logout' },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const navLinks = [
    ...commonLinks,
    ...(isAuthenticated ? authLinks : guestLinks),
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-blue-600 tracking-tight">
            BookSGyA
          </Link>

          <nav>
            <ul className="flex items-center gap-6 list-none m-0 p-0">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to;
                const isLogout = link.to === '/auth/logout';

                return (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className={`text-sm font-medium transition-colors ${
                        isActive
                          ? 'text-blue-600 border-b-2 border-blue-600 pb-0.5'
                          : isLogout
                          ? 'text-red-600 hover:text-red-700'
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

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-10">
        {children}
      </main>

      <footer className="bg-gray-800 text-gray-400 text-center text-sm py-4">&copy; 2026</footer>
      <ToastContainer />
    </div>
  );
}