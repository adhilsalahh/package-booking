import React from 'react';
import { Package, LogOut, User, Home, BookOpen, Mail, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const { user, profile, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      onNavigate('home');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const navLinks = [
    { id: 'home', label: 'Home', icon: Home, public: true },
    { id: 'packages', label: 'Packages', icon: Package, public: true },
    { id: 'contact', label: 'Contact', icon: Mail, public: true },
    { id: 'bookings', label: 'My Bookings', icon: BookOpen, public: false },
  ];

  const visibleLinks = user
    ? navLinks
    : navLinks.filter(link => link.public);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onNavigate('home')}>
            <Package className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">PackTrack</span>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {visibleLinks.map(link => {
              const Icon = link.icon;
              return (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className={`flex items-center space-x-1 px-4 py-2 rounded-lg transition-colors ${
                    currentPage === link.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{link.label}</span>
                </button>
              );
            })}

            {user && profile?.is_admin && (
              <button
                onClick={() => onNavigate('admin')}
                className={`flex items-center space-x-1 px-4 py-2 rounded-lg transition-colors ${
                  currentPage === 'admin'
                    ? 'bg-purple-100 text-purple-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>Admin</span>
              </button>
            )}
          </div>

          <div className="flex items-center space-x-3">
            {user ? (
              <>
                <div className="hidden md:flex items-center space-x-2 px-3 py-1 bg-gray-100 rounded-lg">
                  <User className="h-4 w-4 text-gray-600" />
                  <span className="text-sm text-gray-700">{profile?.name}</span>
                  {profile?.is_admin && (
                    <span className="ml-2 px-2 py-0.5 bg-purple-200 text-purple-800 text-xs rounded-full">
                      Admin
                    </span>
                  )}
                </div>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => onNavigate('login')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Sign In
              </button>
            )}
          </div>
        </div>

        <div className="md:hidden pb-3 flex flex-wrap gap-2">
          {visibleLinks.map(link => {
            const Icon = link.icon;
            return (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  currentPage === link.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{link.label}</span>
              </button>
            );
          })}

          {user && profile?.is_admin && (
            <button
              onClick={() => onNavigate('admin')}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                currentPage === 'admin'
                  ? 'bg-purple-100 text-purple-700'
                  : 'text-gray-700 bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <LayoutDashboard className="h-3.5 w-3.5" />
              <span>Admin</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
