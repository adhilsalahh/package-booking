import { useState } from 'react';
import { Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AdminLoginProps {
  onNavigate: (page: string) => void;
  showToast: (message: string, type: 'success' | 'error') => void;
}

export function AdminLogin({ onNavigate, showToast }: AdminLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { adminSignIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await adminSignIn(email, password);
      showToast('Admin login successful!', 'success');
      onNavigate('admin');
    } catch (error: any) {
      console.error('Admin login error:', error);
      showToast(error.message || 'Failed to login as admin', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-24 pb-12 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <div className="flex items-center justify-center mb-8">
            <div className="bg-red-100 p-3 rounded-full">
              <Shield className="h-8 w-8 text-red-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">Admin Access</h1>
          <p className="text-gray-600 text-center mb-8">Authorized personnel only</p>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Admin Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? 'Verifying...' : 'Login as Admin'}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => onNavigate('home')}
              className="text-gray-600 hover:underline text-sm"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
