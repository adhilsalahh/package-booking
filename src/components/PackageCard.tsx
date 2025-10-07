import { Link } from 'react-router-dom';
import { Calendar, Clock, IndianRupee } from 'lucide-react';
import { Package } from '../lib/supabase';

interface PackageCardProps {
  package: Package;
}

export default function PackageCard({ package: pkg }: PackageCardProps) {
  const imageUrl = pkg.images && pkg.images.length > 0
    ? pkg.images[0]
    : 'https://images.pexels.com/photos/1483053/pexels-photo-1483053.jpeg?auto=compress&cs=tinysrgb&w=800';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
      <img
        src={imageUrl}
        alt={pkg.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{pkg.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {pkg.description || 'Explore the beauty of Kerala with this amazing package.'}
        </p>

        <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{pkg.duration || 'Multiple days'}</span>
          </div>
          <div className="flex items-center gap-1">
            <IndianRupee className="w-4 h-4" />
            <span className="font-semibold text-emerald-600">{pkg.price}</span>
          </div>
        </div>

        <Link
          to={`/packages/${pkg.id}`}
          className="block w-full bg-emerald-600 text-white text-center py-2 rounded-lg hover:bg-emerald-700 transition font-medium"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
