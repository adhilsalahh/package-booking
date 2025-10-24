import React, { useState, useEffect } from 'react';
import { Package, Shield, Clock, Star, Mountain, Camera, Users, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: string) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const [currentTrekkingSlide, setCurrentTrekkingSlide] = useState(0);
  const [currentGallerySlide, setCurrentGallerySlide] = useState(0);

  const features = [
    {
      icon: Package,
      title: 'Wide Range of Packages',
      description: 'Choose from our diverse selection of packages tailored to your needs',
    },
    {
      icon: Shield,
      title: 'Secure Booking',
      description: 'Safe and secure payment processing with verification',
    },
    {
      icon: Clock,
      title: 'Fast Processing',
      description: 'Quick booking confirmation and date approval system',
    },
    {
      icon: Star,
      title: 'Premium Service',
      description: 'Exceptional customer service and support throughout your journey',
    },
  ];

  const trekkingImages = [
    {
      title: 'Mountain Trekking',
      description: 'Experience breathtaking mountain trails',
      icon: Mountain,
      gradient: 'from-emerald-500 to-teal-600'
    },
    {
      title: 'Forest Trails',
      description: 'Explore lush green forest paths',
      icon: MapPin,
      gradient: 'from-teal-500 to-cyan-600'
    },
    {
      title: 'Group Adventures',
      description: 'Join fellow adventurers on epic journeys',
      icon: Users,
      gradient: 'from-cyan-500 to-blue-600'
    },
    {
      title: 'Scenic Photography',
      description: 'Capture stunning natural landscapes',
      icon: Camera,
      gradient: 'from-blue-500 to-indigo-600'
    }
  ];

  const galleryImages = [
    {
      title: 'Backwater Cruise',
      color: 'bg-gradient-to-br from-emerald-400 to-teal-500',
      icon: '🚢'
    },
    {
      title: 'Tea Gardens',
      color: 'bg-gradient-to-br from-green-400 to-emerald-500',
      icon: '🍃'
    },
    {
      title: 'Beach Paradise',
      color: 'bg-gradient-to-br from-cyan-400 to-blue-500',
      icon: '🏖️'
    },
    {
      title: 'Wildlife Safari',
      color: 'bg-gradient-to-br from-amber-400 to-orange-500',
      icon: '🦁'
    },
    {
      title: 'Cultural Heritage',
      color: 'bg-gradient-to-br from-rose-400 to-pink-500',
      icon: '🏛️'
    },
    {
      title: 'Mountain Views',
      color: 'bg-gradient-to-br from-slate-400 to-gray-500',
      icon: '⛰️'
    }
  ];

  useEffect(() => {
    const trekkingInterval = setInterval(() => {
      setCurrentTrekkingSlide((prev) => (prev + 1) % trekkingImages.length);
    }, 4000);

    const galleryInterval = setInterval(() => {
      setCurrentGallerySlide((prev) => (prev + 1) % Math.ceil(galleryImages.length / 3));
    }, 3500);

    return () => {
      clearInterval(trekkingInterval);
      clearInterval(galleryInterval);
    };
  }, []);

  const nextTrekkingSlide = () => {
    setCurrentTrekkingSlide((prev) => (prev + 1) % trekkingImages.length);
  };

  const prevTrekkingSlide = () => {
    setCurrentTrekkingSlide((prev) => (prev - 1 + trekkingImages.length) % trekkingImages.length);
  };

  const nextGallerySlide = () => {
    setCurrentGallerySlide((prev) => (prev + 1) % Math.ceil(galleryImages.length / 3));
  };

  const prevGallerySlide = () => {
    setCurrentGallerySlide((prev) => (prev - 1 + Math.ceil(galleryImages.length / 3)) % Math.ceil(galleryImages.length / 3));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <section className="relative bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 text-white py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight animate-slide-down">
              Welcome to PackTrack
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-emerald-50 max-w-3xl mx-auto leading-relaxed animate-slide-up">
              Your trusted partner for package booking and tracking. Experience seamless service with our comprehensive booking system.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay">
              <button
                onClick={() => onNavigate('packages')}
                className="px-8 py-4 bg-white text-emerald-700 rounded-lg font-semibold hover:bg-emerald-50 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Browse Packages
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-emerald-700 transition-all"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-b from-white to-emerald-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Trekking Adventures</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Embark on unforgettable trekking experiences across stunning landscapes
            </p>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-2xl shadow-2xl">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentTrekkingSlide * 100}%)` }}
              >
                {trekkingImages.map((trek, index) => {
                  const Icon = trek.icon;
                  return (
                    <div
                      key={index}
                      className={`min-w-full bg-gradient-to-br ${trek.gradient} p-16 flex items-center justify-center`}
                    >
                      <div className="text-center text-white">
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full mb-6">
                          <Icon className="h-12 w-12" />
                        </div>
                        <h3 className="text-4xl font-bold mb-4">{trek.title}</h3>
                        <p className="text-xl text-white/90">{trek.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              onClick={prevTrekkingSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-110"
            >
              <ChevronLeft className="h-6 w-6 text-gray-800" />
            </button>
            <button
              onClick={nextTrekkingSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-110"
            >
              <ChevronRight className="h-6 w-6 text-gray-800" />
            </button>

            <div className="flex justify-center gap-2 mt-6">
              {trekkingImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTrekkingSlide(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentTrekkingSlide ? 'w-8 bg-emerald-600' : 'w-2 bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Package Gallery</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our amazing destinations and experiences
            </p>
          </div>

          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentGallerySlide * 100}%)` }}
              >
                {Array.from({ length: Math.ceil(galleryImages.length / 3) }).map((_, slideIndex) => (
                  <div key={slideIndex} className="min-w-full grid grid-cols-1 md:grid-cols-3 gap-6">
                    {galleryImages.slice(slideIndex * 3, slideIndex * 3 + 3).map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className={`${item.color} rounded-xl p-12 shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 hover:-rotate-1 cursor-pointer group`}
                      >
                        <div className="text-center text-white">
                          <div className="text-6xl mb-4 transform group-hover:scale-125 transition-transform">
                            {item.icon}
                          </div>
                          <h3 className="text-2xl font-bold">{item.title}</h3>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={prevGallerySlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 p-3 rounded-full shadow-lg transition-all hover:scale-110"
            >
              <ChevronLeft className="h-6 w-6 text-gray-800" />
            </button>
            <button
              onClick={nextGallerySlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 p-3 rounded-full shadow-lg transition-all hover:scale-110"
            >
              <ChevronRight className="h-6 w-6 text-gray-800" />
            </button>

            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: Math.ceil(galleryImages.length / 3) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentGallerySlide(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentGallerySlide ? 'w-8 bg-teal-600' : 'w-2 bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide exceptional service with a focus on quality, security, and customer satisfaction
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border border-gray-100 group"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Get Started?</h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Join thousands of satisfied customers who trust us with their package bookings
          </p>
          <button
            onClick={() => onNavigate('packages')}
            className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            View All Packages
          </button>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-300 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="mb-4">&copy; 2025 PackTrack. All rights reserved.</p>
          <button
            onClick={() => onNavigate('admin-login')}
            className="text-gray-500 hover:text-gray-400 text-sm transition-colors"
          >
            Admin Access
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Home;
