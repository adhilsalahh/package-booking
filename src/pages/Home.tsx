import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Users, Star, Calendar, IndianRupee } from 'lucide-react';
import { supabase, Package } from '../lib/supabase';

export function Home() {
  const [featuredPackages, setFeaturedPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedPackages();
  }, []);

  const fetchFeaturedPackages = async () => {
    try {
      const { data, error } = await supabase
        .from('packages')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) throw error;
      setFeaturedPackages(data || []);
    } catch (error) {
      console.error('Error fetching featured packages:', error);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: MapPin,
      title: 'Best Destinations',
      description: 'Explore handpicked destinations across India and beyond',
    },
    {
      icon: Clock,
      title: 'Flexible Booking',
      description: 'Book with ease and manage your trips on the go',
    },
    {
      icon: Users,
      title: 'Group Travel',
      description: 'Perfect packages for families and groups of all sizes',
    },
    {
      icon: Star,
      title: 'Premium Experience',
      description: 'Quality service and unforgettable memories guaranteed',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div
        className="relative h-[600px] bg-cover bg-center"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Your Adventure Starts Here
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Discover amazing travel packages tailored just for you
            </p>
            <Link
              to="/packages"
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105"
            >
              Explore Packages
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Why Choose TripAdikkam?
          </h2>
          <p className="text-lg text-gray-600">
            We make your travel dreams come true with exceptional service
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                  <Icon className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {!loading && featuredPackages.length > 0 && (
          <div className="mt-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Featured Packages
              </h2>
              <p className="text-lg text-gray-600">
                Check out our most popular travel experiences
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPackages.map((pkg) => (
                <Link
                  key={pkg.id}
                  to={`/package/${pkg.id}`}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden group transform hover:-translate-y-1"
                >
                  <div className="h-48 bg-gray-200 overflow-hidden">
                    {pkg.image_url ? (
                      <img
                        src={pkg.image_url}
                        alt={pkg.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600">
                        <Calendar className="h-16 w-16 text-white opacity-50" />
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{pkg.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{pkg.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-700">
                        <Clock className="h-4 w-4 mr-1" />
                        <span className="text-sm">{pkg.duration_days} days</span>
                      </div>
                      <div className="flex items-center text-blue-600 font-bold">
                        <IndianRupee className="h-5 w-5" />
                        <span className="text-xl">{pkg.price_per_head?.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-16 bg-blue-600 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg md:text-xl mb-8 text-blue-100">
            Browse our curated packages and book your next adventure today
          </p>
          <Link
            to="/packages"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105"
          >
            View All Packages
          </Link>
        </div>
      </div>
    </div>
  );
}
