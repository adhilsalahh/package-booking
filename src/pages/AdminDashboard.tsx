import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Users, BookOpen, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { PackageManagement } from '../components/admin/PackageManagement';
import { BookingManagement } from '../components/admin/BookingManagement';
import { UserManagement } from '../components/admin/UserManagement';
import { PaymentReport } from '../components/admin/PaymentReport';

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'packages' | 'bookings' | 'users' | 'reports'>('packages');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const { signOut, profile } = useAuth();
  const navigate = useNavigate();

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Sign out error:', error);
      showToast('Failed to sign out', 'error');
    }
  };

  const tabs = [
    { id: 'packages' as const, label: 'Packages', icon: Package },
    { id: 'bookings' as const, label: 'Bookings', icon: BookOpen },
    { id: 'users' as const, label: 'Users', icon: Users },
    { id: 'reports' as const, label: 'Reports', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold">Admin Dashboard</h1>
              {profile && (
                <span className="ml-4 text-sm text-gray-400">
                  Welcome, {profile.username}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/')}
                className="text-gray-300 hover:text-white transition-colors"
              >
                View Site
              </button>
              <button
                onClick={handleSignOut}
                className="flex items-center text-gray-300 hover:text-white transition-colors"
              >
                <LogOut className="h-5 w-5 mr-1" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-4 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'packages' && <PackageManagement showToast={showToast} />}
        {activeTab === 'bookings' && <BookingManagement showToast={showToast} />}
        {activeTab === 'users' && <UserManagement showToast={showToast} />}
        {activeTab === 'reports' && <PaymentReport showToast={showToast} />}
      </div>

      {toast && (
        <div className="fixed bottom-4 right-4 z-50">
          <div
            className={`px-6 py-3 rounded-lg shadow-lg text-white ${
              toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'
            }`}
          >
            {toast.message}
          </div>
        </div>
      )}
    </div>
  );
}
