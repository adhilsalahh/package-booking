import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase, Package, PackageDate } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { Calendar, Clock, IndianRupee, MapPin } from 'lucide-react';

export default function PackageDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [pkg, setPkg] = useState<Package | null>(null);
  const [dates, setDates] = useState<PackageDate[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    if (id) {
      loadPackage();
      loadDates();
    }
  }, [id]);

  async function loadPackage() {
    try {
      const { data, error } = await supabase
        .from('packages')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      setPkg(data);
    } catch (error) {
      console.error('Error loading package:', error);
    } finally {
      setLoading(false);
    }
  }

  async function loadDates() {
    try {
      const { data, error } = await supabase
        .from('package_dates')
        .select('*')
        .eq('package_id', id)
        .gte('available_date', new Date().toISOString().split('T')[0])
        .order('available_date', { ascending: true });

      if (error) throw error;
      setDates(data || []);
    } catch (error) {
      console.error('Error loading dates:', error);
    }
  }

  const handleBooking = () => {
    if (!user) {
      navigate('/auth/login');
      return;
    }
    if (!selectedDate) {
      alert('Please select a travel date');
      return;
    }
    navigate(`/booking/${id}?date=${selectedDate}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600 text-lg">Loading...</div>
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg mb-4">Package not found</p>
          <Link to="/packages" className="text-emerald-600 hover:text-emerald-700">
            Back to Packages
          </Link>
        </div>
      </div>
    );
  }

  const imageUrl = pkg.images && pkg.images.length > 0
    ? pkg.images[0]
    : 'https://images.pexels.com/photos/1483053/pexels-photo-1483053.jpeg?auto=compress&cs=tinysrgb&w=1200';

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4">
        <img
          src={imageUrl}
          alt={pkg.title}
          className="w-full h-96 object-cover rounded-lg shadow-lg mb-8"
        />

        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{pkg.title}</h1>

          <div className="flex items-center gap-6 mb-6 text-gray-700">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-emerald-600" />
              <span>{pkg.duration || 'Multiple days'}</span>
            </div>
            <div className="flex items-center gap-2">
              <IndianRupee className="w-5 h-5 text-emerald-600" />
              <span className="text-2xl font-bold text-emerald-600">{pkg.price}</span>
            </div>
          </div>

          <p className="text-gray-700 text-lg mb-8 leading-relaxed">
            {pkg.description || 'Experience the beauty of Kerala with this amazing package. Enjoy scenic landscapes, cultural experiences, and unforgettable memories.'}
          </p>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Available Dates</h2>
            {dates.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-4">
                {dates.map((date) => (
                  <button
                    key={date.id}
                    onClick={() => setSelectedDate(date.available_date)}
                    className={`p-4 border-2 rounded-lg transition ${
                      selectedDate === date.available_date
                        ? 'border-emerald-600 bg-emerald-50'
                        : 'border-gray-300 hover:border-emerald-400'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-5 h-5 text-emerald-600" />
                      <span className="font-semibold">
                        {new Date(date.available_date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{date.seats} seats available</p>
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No upcoming dates available for this package.</p>
            )}
          </div>

          <button
            onClick={handleBooking}
            disabled={dates.length === 0}
            className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg"
          >
            {user ? 'Book Now' : 'Sign In to Book'}
          </button>
        </div>
      </div>
    </div>
  );
}
