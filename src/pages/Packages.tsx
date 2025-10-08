import React from 'react';
import { useApp } from '../context/AppContext';
import PackageCard from '../components/PackageCard';
import { Package } from '../lib/supabase';
import { Loader2 } from 'lucide-react';

interface PackagesProps {
  onSelectPackage: (pkg: Package) => void;
}

const Packages: React.FC<PackagesProps> = ({ onSelectPackage }) => {
  const { packages, loading } = useApp();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-emerald-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-gray-800">Our Packages</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose from our carefully curated adventure packages designed to give you the best Kerala experience
          </p>
        </div>

        {packages.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No packages available at the moment.</p>
            <p className="text-gray-500 mt-2">Please check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <PackageCard key={pkg.id} package={pkg} onSelect={onSelectPackage} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Packages;
