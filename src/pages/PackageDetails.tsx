import { useEffect, useState } from 'react';
import { Calendar, IndianRupee, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase, Package, PackageDate } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

interface PackageDetailsProps {
  packageId: string;
  onNavigate: (page: string, data?: any) => void;
  showToast: (message: string, type: 'success' | 'error') => void;
}

export function PackageDetails({ packageId, onNavigate, showToast }: PackageDetailsProps) {
  const [pkg, setPackage] = useState<Package | null>(null);
  const [dates, setDates] = useState<PackageDate[]>([]);
  const [selectedDate, setSelectedDate] = useState<PackageDate | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    fetchPackageDetails();
  }, [packageId]);

  const fetchPackageDetails = async () => {
    try {
      const [pkgResponse, datesResponse] = await Promise.all([
        supabase.from('packages').select('*').eq('id', packageId).maybeSingle(),
        supabase.from('package_dates').select('*').eq('package_id', packageId).order('available_date'),
      ]);

      if (pkgResponse.error) throw pkgResponse.error;
      if (datesResponse.error) throw datesResponse.error;

      setPackage(pkgResponse.data);
      setDates(datesResponse.data || []);
    } catch (error) {
      console.error('Error fetching package details:', error);
      showToast('Failed to load package details', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = () => {
    if (!user) {
      showToast('Please login to book a package', 'error');
      onNavigate('login');
      return;
    }

    if (!selectedDate) {
      showToast('Please select a travel date', 'error');
      return;
    }

    if (selectedDate.seats <= 0) {
      showToast('No seats available for this date', 'error');
      return;
    }

    onNavigate('booking', { package: pkg, date: selectedDate });
  };

  const nextImage = () => {
    if (pkg?.images && pkg.images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % pkg.images.length);
    }
  };

  const prevImage = () => {
    if (pkg?.images && pkg.images.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + pkg.images.length) % pkg.images.length);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600 text-lg">Package not found</p>
          <button
            onClick={() => onNavigate('packages')}
            className="mt-4 text-blue-600 hover:underline"
          >
            Back to Packages
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => onNavigate('packages')}
          className="text-blue-600 hover:text-blue-700 mb-6 flex items-center"
        >
          <ChevronLeft className="h-5 w-5" />
          Back to Packages
        </button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="relative h-96 bg-gray-200">
            {pkg.images && pkg.images.length > 0 ? (
              <>
                <img
                  src={pkg.images[currentImageIndex]}
                  alt={pkg.title}
                  className="w-full h-full object-cover"
                />
                {pkg.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full"
                    >
                      <ChevronLeft className="h-6 w-6 text-gray-800" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full"
                    >
                      <ChevronRight className="h-6 w-6 text-gray-800" />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                      {pkg.images.map((_, index) => (
                        <div
                          key={index}
                          className={`h-2 w-2 rounded-full ${
                            index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600">
                <Calendar className="h-24 w-24 text-white opacity-50" />
              </div>
            )}
          </div>

          <div className="p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{pkg.title}</h1>

            <div className="flex items-center space-x-6 mb-6">
              <div className="flex items-center text-gray-700">
                <Clock className="h-5 w-5 mr-2" />
                <span>{pkg.duration}</span>
              </div>
              <div className="flex items-center text-blue-600 font-bold text-2xl">
                <IndianRupee className="h-6 w-6" />
                <span>{pkg.price.toLocaleString()}</span>
                <span className="text-sm text-gray-600 ml-2">per person</span>
              </div>
            </div>

            <div className="prose max-w-none mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Description</h2>
              <p className="text-gray-600 whitespace-pre-line">{pkg.description}</p>
            </div>

            {dates.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Available Dates</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {dates.map((date) => {
                    const formattedDate = new Date(date.available_date).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    });
                    const isSelected = selectedDate?.id === date.id;
                    const isAvailable = date.seats > 0;

                    return (
                      <button
                        key={date.id}
                        onClick={() => isAvailable && setSelectedDate(date)}
                        disabled={!isAvailable}
                        className={`p-4 rounded-lg border-2 text-left transition-all ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50'
                            : isAvailable
                            ? 'border-gray-200 hover:border-blue-400 bg-white'
                            : 'border-gray-200 bg-gray-100 cursor-not-allowed opacity-60'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <Calendar className={`h-5 w-5 ${isSelected ? 'text-blue-600' : 'text-gray-400'}`} />
                          <span
                            className={`text-sm font-semibold ${
                              isAvailable ? 'text-green-600' : 'text-red-600'
                            }`}
                          >
                            {date.seats} seats
                          </span>
                        </div>
                        <p className="text-gray-800 font-medium">{formattedDate}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <button
              onClick={handleBookNow}
              disabled={!selectedDate || (selectedDate && selectedDate.seats <= 0)}
              className="w-full md:w-auto bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
