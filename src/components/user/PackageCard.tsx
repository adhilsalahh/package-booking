import { Package } from '../../lib/supabase';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';

type PackageCardProps = {
  package: Package;
  onBook: () => void;
};

export function PackageCard({ package: pkg, onBook }: PackageCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="bg-white border rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {pkg.image_url ? (
        <img
          src={pkg.image_url}
          alt={pkg.title}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center">
          <MapPin className="w-16 h-16 text-white opacity-50" />
        </div>
      )}

      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.title}</h3>

        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{pkg.destination}</span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{pkg.description}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{formatDate(pkg.start_date)} - {formatDate(pkg.end_date)}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-2" />
            <span>{pkg.duration_days} Days</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Users className="w-4 h-4 mr-2" />
            <span>Max {pkg.max_capacity} people</span>
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-3">
            <div>
              <p className="text-sm text-gray-500">Total Price</p>
              <p className="text-2xl font-bold text-gray-900">₹{pkg.price_per_head}</p>
              <p className="text-xs text-gray-500">per person</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Advance</p>
              <p className="text-xl font-bold text-green-600">₹{pkg.advance_payment}</p>
              <p className="text-xs text-gray-500">per person</p>
            </div>
          </div>

          <button
            onClick={onBook}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
