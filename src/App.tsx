import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Toast } from './components/Toast';
import { Home } from './pages/Home';
import { Packages } from './pages/Packages';
import { PackageDetails } from './pages/PackageDetails';
import { Booking } from './pages/Booking';
import { Contact } from './pages/Contact';
import { Login } from './pages/Login';
import { Signup } from './pages/SignUp';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';

type Page = 'home' | 'packages' | 'package-details' | 'booking' | 'contact' | 'login' | 'signup' | 'admin-login' | 'admin';

interface ToastState {
  message: string;
  type: 'success' | 'error';
}

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [pageData, setPageData] = useState<any>(null);
  const [toast, setToast] = useState<ToastState | null>(null);
  const { loading, isAdmin } = useAuth();

  const handleNavigate = (page: string, data?: any) => {
    setCurrentPage(page as Page);
    setPageData(data);
    window.scrollTo(0, 0);
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (currentPage === 'admin-login') {
    return (
      <>
        <AdminLogin onNavigate={handleNavigate} showToast={showToast} />
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </>
    );
  }

  if (currentPage === 'admin' && isAdmin) {
    return (
      <>
        <AdminDashboard onNavigate={handleNavigate} showToast={showToast} />
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      {currentPage === 'home' && <Home onNavigate={handleNavigate} />}
      {currentPage === 'packages' && <Packages onNavigate={handleNavigate} />}
      {currentPage === 'package-details' && pageData && (
        <PackageDetails packageId={pageData} onNavigate={handleNavigate} showToast={showToast} />
      )}
      {currentPage === 'booking' && pageData && (
        <Booking
          packageData={pageData.package}
          dateData={pageData.date}
          onNavigate={handleNavigate}
          showToast={showToast}
        />
      )}
      {currentPage === 'contact' && <Contact showToast={showToast} />}
      {currentPage === 'login' && <Login onNavigate={handleNavigate} showToast={showToast} />}
      {currentPage === 'signup' && <Signup onNavigate={handleNavigate} showToast={showToast} />}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
