import React from 'react';
import { Mountain, Phone, MapPin, Star, Users } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: string) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen">
      <div
        className="relative h-screen bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
          <Mountain className="h-20 w-20 mb-6 animate-pulse" />
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-center">
            Discover Kerala
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-center max-w-2xl">
            Experience the beauty of God's Own Country with our expertly curated adventure packages
          </p>
          <button
            onClick={() => onNavigate('packages')}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all transform hover:scale-105 shadow-lg"
          >
            Explore Packages
          </button>
        </div>
      </div>

      <div className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-emerald-50 to-white">
              <div className="bg-emerald-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Expert Guides</h3>
              <p className="text-gray-600">
                Professional and experienced guides ensure your safety and unforgettable experience
              </p>
            </div>
            <div className="text-center p-6 rounded-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-blue-50 to-white">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Best Locations</h3>
              <p className="text-gray-600">
                Carefully selected scenic spots offering breathtaking views and adventures
              </p>
            </div>
            <div className="text-center p-6 rounded-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-orange-50 to-white">
              <div className="bg-orange-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Group Friendly</h3>
              <p className="text-gray-600">
                Perfect for families, friends, and solo travelers looking for adventure
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Ready for an Adventure?</h2>
          <p className="text-xl mb-8">
            Book your Kerala adventure today and create memories that last a lifetime
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="tel:+917592049934"
              className="bg-white text-emerald-600 hover:bg-gray-100 font-bold py-3 px-6 rounded-full flex items-center gap-2 transition-all transform hover:scale-105 shadow-lg"
            >
              <Phone className="h-5 w-5" />
              +91 7592049934
            </a>
            <a
              href="tel:+919495919934"
              className="bg-white text-emerald-600 hover:bg-gray-100 font-bold py-3 px-6 rounded-full flex items-center gap-2 transition-all transform hover:scale-105 shadow-lg"
            >
              <Phone className="h-5 w-5" />
              +91 9495919934
            </a>
          </div>
        </div>
      </div>

      <div
        className="relative h-96 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white px-4">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Experience Nature's Beauty
            </h2>
            <p className="text-xl">Sunrise treks, campfires, and unforgettable moments</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
