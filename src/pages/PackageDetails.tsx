import React, { useState } from 'react';
import { Package } from '../lib/supabase';
import { ArrowLeft, Clock, IndianRupee, CheckCircle2, Calendar } from 'lucide-react';
import BookingForm from '../components/BookingForm';

interface PackageDetailsProps {
  package: Package;
  onBack: () => void;
}

const PackageDetails: React.FC<PackageDetailsProps> = ({ package: pkg, onBack }) => {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = pkg.images.length > 0
    ? pkg.images
    : ['https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=1920'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center text-emerald-600 hover:text-emerald-700 font-semibold mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Packages
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="relative h-96 md:h-[500px] overflow-hidden">
            <img
              src={images[currentImageIndex]}
              alt={pkg.title}
              className="w-full h-full object-cover"
            />
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentImageIndex
                        ? 'bg-white w-8'
                        : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <h1 className="text-4xl font-bold text-gray-800 mb-4 md:mb-0">{pkg.title}</h1>
              <div className="flex items-center gap-2 text-3xl font-bold text-emerald-600">
                <IndianRupee className="h-8 w-8" />
                <span>{pkg.price}</span>
                <span className="text-lg font-normal text-gray-600">/ person</span>
              </div>
            </div>

            <div className="flex items-center text-gray-700 mb-6">
              <Clock className="h-6 w-6 mr-2 text-emerald-600" />
              <span className="text-lg font-medium">{pkg.duration}</span>
            </div>

            <p className="text-gray-700 text-lg mb-8 leading-relaxed">{pkg.description}</p>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <CheckCircle2 className="h-6 w-6 mr-2 text-emerald-600" />
                Package Inclusions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {pkg.inclusions.map((inclusion, index) => (
                  <div key={index} className="flex items-start bg-emerald-50 p-3 rounded-lg">
                    <CheckCircle2 className="h-5 w-5 mr-2 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{inclusion}</span>
                  </div>
                ))}
              </div>
            </div>

            {pkg.itinerary && pkg.itinerary.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <Calendar className="h-6 w-6 mr-2 text-emerald-600" />
                  Detailed Itinerary
                </h2>
                <div className="space-y-6">
                  {pkg.itinerary.map((day: any, index: number) => (
                    <div key={index} className="border-l-4 border-emerald-600 pl-6 py-2">
                      <h3 className="text-xl font-bold text-gray-800 mb-3">{day.title}</h3>
                      <ul className="space-y-2">
                        {day.activities.map((activity: string, actIndex: number) => (
                          <li key={actIndex} className="text-gray-700 flex items-start">
                            <span className="text-emerald-600 mr-2">✓</span>
                            <span>{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl p-6 text-white">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-2xl font-bold mb-2">Ready to Book?</h3>
                  <p className="text-emerald-100">Secure your spot for this amazing adventure!</p>
                </div>
                <button
                  onClick={() => setShowBookingForm(true)}
                  className="bg-white text-emerald-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-lg transition-all transform hover:scale-105 shadow-lg text-lg"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showBookingForm && (
        <BookingForm
          package={pkg}
          onClose={() => setShowBookingForm(false)}
        />
      )}
    </div>
  );
};

export default PackageDetails;
