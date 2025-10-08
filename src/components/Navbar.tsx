import React, { useState } from 'react';
import { Mountain, Menu, X, Shield } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const { isAdmin, setIsAdmin } = useApp();

  const handleAdminLogin = () => {
    if (adminPassword === 'admin123') {
      setIsAdmin(true);
      setShowAdminLogin(false);
      setAdminPassword('');
      onNavigate('admin');
    } else {
      alert('Invalid password');
    }
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    onNavigate('home');
  };

  return (
    <>
      <nav className="bg-white shadow-md fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center cursor-pointer" onClick={() => onNavigate('home')}>
              <Mountain className="h-8 w-8 text-emerald-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">Kerala Adventures</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => onNavigate('home')}
                className={`${
                  currentPage === 'home' ? 'text-emerald-600' : 'text-gray-700'
                } hover:text-emerald-600 transition-colors font-medium`}
              >
                Home
              </button>
              <button
                onClick={() => onNavigate('packages')}
                className={`${
                  currentPage === 'packages' ? 'text-emerald-600' : 'text-gray-700'
                } hover:text-emerald-600 transition-colors font-medium`}
              >
                Packages
              </button>
              {isAdmin ? (
                <>
                  <button
                    onClick={() => onNavigate('admin')}
                    className={`${
                      currentPage === 'admin' ? 'text-emerald-600' : 'text-gray-700'
                    } hover:text-emerald-600 transition-colors font-medium flex items-center`}
                  >
                    <Shield className="h-4 w-4 mr-1" />
                    Admin Panel
                  </button>
                  <button
                    onClick={handleAdminLogout}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setShowAdminLogin(true)}
                  className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Admin Login
                </button>
              )}
            </div>

            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-emerald-600"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => {
                  onNavigate('home');
                  setIsMenuOpen(false);
                }}
                className={`${
                  currentPage === 'home' ? 'bg-emerald-50 text-emerald-600' : 'text-gray-700'
                } block w-full text-left px-3 py-2 rounded-md font-medium hover:bg-emerald-50`}
              >
                Home
              </button>
              <button
                onClick={() => {
                  onNavigate('packages');
                  setIsMenuOpen(false);
                }}
                className={`${
                  currentPage === 'packages' ? 'bg-emerald-50 text-emerald-600' : 'text-gray-700'
                } block w-full text-left px-3 py-2 rounded-md font-medium hover:bg-emerald-50`}
              >
                Packages
              </button>
              {isAdmin ? (
                <>
                  <button
                    onClick={() => {
                      onNavigate('admin');
                      setIsMenuOpen(false);
                    }}
                    className={`${
                      currentPage === 'admin' ? 'bg-emerald-50 text-emerald-600' : 'text-gray-700'
                    } block w-full text-left px-3 py-2 rounded-md font-medium hover:bg-emerald-50 flex items-center`}
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Admin Panel
                  </button>
                  <button
                    onClick={() => {
                      handleAdminLogout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md font-medium text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setShowAdminLogin(true);
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md font-medium text-emerald-600 hover:bg-emerald-50"
                >
                  Admin Login
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      {showAdminLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Admin Login</h2>
              <button
                onClick={() => {
                  setShowAdminLogin(false);
                  setAdminPassword('');
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <input
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              onKeyPress={(e) => {
                if (e.key === 'Enter') handleAdminLogin();
              }}
            />
            <button
              onClick={handleAdminLogin}
              className="w-full bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Login
            </button>
            <p className="text-sm text-gray-500 mt-2 text-center">Default password: admin123</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
