import React, { useEffect, useState } from 'react';
import { Check, AlertCircle, Loader } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import type { Database } from '../lib/supabase';

type Package = Database['public']['Tables']['packages']['Row'];

interface PackagesProps {
  onNavigate: (page: string) => void;
  selectedPackageId?: string | null;
  onSelectPackage?: (pkg: Package) => void;
}

const Packages: React.FC<PackagesProps> = ({ onNavigate, selectedPackageId, onSelectPackage }) => {
  const { user } = useAuth();
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [bookingPackage, setBookingPackage] = useState<Package | null>(null);
  const [bookingForm, setBookingForm] = useState({
    requested_date: '',
    special_requests: '',
  });
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    loadPackages();
  }, []);

  const loadPackages = async () => {
    try {
      const { data, error } = await supabase
        .from('packages')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPackages(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = (pkg: Package) => {
    if (!user) {
      onNavigate('login');
      return;
    }
    setBookingPackage(pkg);
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingPackage || !user) return;

    setBookingLoading(true);
    try {
      const { data: bookingData, error: bookingError } = await supabase
        .from('bookings')
        .insert({
          user_id: user.id,
          package_id: bookingPackage.id,
          requested_date: bookingForm.requested_date || null,
          total_amount: bookingPackage.price_per_head,
          special_requests: bookingForm.special_requests,
        })
        .select()
        .single();

      if (bookingError) throw bookingError;

      const { error: paymentError } = await supabase
        .from('payments')
        .insert({
          booking_id: bookingData.id,
          user_id: user.id,
          amount: bookingPackage.advance_payment,
        });

      if (paymentError) throw paymentError;

      alert('Booking created successfully! Please upload payment proof in your bookings page.');
      setBookingPackage(null);
      setBookingForm({ requested_date: '', special_requests: '' });
      onNavigate('bookings');
    } catch (err: any) {
      alert('Error creating booking: ' + err.message);
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="h-8 w-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Packages</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the perfect package that suits your needs. All packages include premium features and dedicated support.
          </p>
        </div>

        {packages.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No packages available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-100"
              >
                {pkg.image_url && (
                  <div className="h-48 bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                    <img
                      src={pkg.image_url}
                      alt={pkg.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.title}</h3>
                  <p className="text-gray-600 mb-2 leading-relaxed">{pkg.description}</p>
                  <p className="text-sm text-gray-500 mb-4">{pkg.destination}</p>

                  <div className="mb-6">
                    <div className="flex items-baseline mb-2">
                      <span className="text-4xl font-bold text-blue-600">₹{pkg.price_per_head}</span>
                      <span className="ml-2 text-gray-500">/ {pkg.duration_days} Days</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <div>Advance: ₹{pkg.advance_payment}</div>
                      <div>Dates: {new Date(pkg.start_date).toLocaleDateString()} - {new Date(pkg.end_date).toLocaleDateString()}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleBookNow(pkg)}
                    className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {bookingPackage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full p-8 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Book {bookingPackage.name}</h2>

            <form onSubmit={handleBookingSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Requested Date (Optional)
                </label>
                <input
                  type="date"
                  value={bookingForm.requested_date}
                  onChange={(e) => setBookingForm({ ...bookingForm, requested_date: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Requests (Optional)
                </label>
                <textarea
                  value={bookingForm.special_requests}
                  onChange={(e) => setBookingForm({ ...bookingForm, special_requests: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={4}
                  placeholder="Any special requirements or notes..."
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">Total Amount:</span>
                  <span className="text-2xl font-bold text-blue-600">₹{bookingPackage.price_per_head}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Advance Payment:</span>
                  <span className="text-lg font-semibold text-green-600">₹{bookingPackage.advance_payment}</span>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setBookingPackage(null);
                    setBookingForm({ requested_date: '', special_requests: '' });
                  }}
                  className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={bookingLoading}
                  className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {bookingLoading ? 'Booking...' : 'Confirm Booking'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Packages;
