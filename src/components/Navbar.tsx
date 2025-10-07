import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { signOut } from '../lib/auth';
import { Palmtree, User, LogOut } from 'lucide-react';

export default function Navbar() {
  const { user, profile, isAdmin, setAdminLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      setAdminLoggedIn(false);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <Palmtree className="w-8 h-8 text-emerald-600" />
            <span className="text-xl font-bold text-gray-800">Va Oru Trippadikkam</span>
          </Link>

          <div className="flex items-center gap-6">
            <Link to="/" className="text-gray-700 hover:text-emerald-600 transition">
              Home
            </Link>
            <Link to="/packages" className="text-gray-700 hover:text-emerald-600 transition">
              Packages
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-emerald-600 transition">
              Contact
            </Link>

            {user ? (
              <>
                <Link to="/bookings" className="text-gray-700 hover:text-emerald-600 transition">
                  My Bookings
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin/dashboard"
                    className="bg-slate-700 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition"
                  >
                    Admin Dashboard
                  </Link>
                )}
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-gray-600" />
                  <span className="text-sm text-gray-700">{profile?.username || user.email}</span>
                  <button
                    onClick={handleSignOut}
                    className="ml-2 text-gray-600 hover:text-red-600 transition"
                    title="Sign Out"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/auth/login"
                  className="text-gray-700 hover:text-emerald-600 transition"
                >
                  Sign In
                </Link>
                <Link
                  to="/auth/signup"
                  className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
