import { Link } from 'react-router-dom';
import { MapPin, Award, Users, Phone } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative h-[600px] bg-gradient-to-br from-emerald-600 to-teal-700 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Discover Kerala's Beauty
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl">
            Experience the magic of God's Own Country with our curated trip packages
          </p>
          <Link
            to="/packages"
            className="bg-white text-emerald-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition"
          >
            Explore Packages
          </Link>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Why Choose Us
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <MapPin className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Best Destinations</h3>
              <p className="text-gray-600">
                Handpicked locations across Kerala for unforgettable experiences
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Award className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Expert Guides</h3>
              <p className="text-gray-600">
                Professional local guides who know every hidden gem
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Users className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Group & Solo</h3>
              <p className="text-gray-600">
                Packages for families, groups, and solo travelers
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Browse our packages and book your dream Kerala trip today
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/packages"
              className="bg-emerald-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-emerald-700 transition"
            >
              View Packages
            </Link>
            <Link
              to="/contact"
              className="bg-gray-200 text-gray-800 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-300 transition flex items-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
