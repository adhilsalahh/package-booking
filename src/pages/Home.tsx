import { MapPin, Clock, Users, Star } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export function Home({ onNavigate }: HomeProps) {
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
            <button
              onClick={() => onNavigate('packages')}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105"
            >
              Explore Packages
            </button>
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

        <div className="mt-16 bg-blue-600 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg md:text-xl mb-8 text-blue-100">
            Browse our curated packages and book your next adventure today
          </p>
          <button
            onClick={() => onNavigate('packages')}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105"
          >
            View All Packages
          </button>
        </div>
      </div>
    </div>
  );
}
