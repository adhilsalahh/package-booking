import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Packages from './pages/Packages';
import PackageDetails from './pages/PackageDetails';
import AdminPanel from './pages/AdminPanel';
import { Package } from './lib/supabase';

type Page = 'home' | 'packages' | 'package-details' | 'admin';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
  };

  const handleSelectPackage = (pkg: Package) => {
    setSelectedPackage(pkg);
    setCurrentPage('package-details');
  };

  const handleBackToPackages = () => {
    setSelectedPackage(null);
    setCurrentPage('packages');
  };

  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
        <div className="pt-16">
          {currentPage === 'home' && <Home onNavigate={handleNavigate} />}
          {currentPage === 'packages' && <Packages onSelectPackage={handleSelectPackage} />}
          {currentPage === 'package-details' && selectedPackage && (
            <PackageDetails package={selectedPackage} onBack={handleBackToPackages} />
          )}
          {currentPage === 'admin' && <AdminPanel />}
        </div>
      </div>
    </AppProvider>
  );
}

export default App;
