import { useState, useEffect } from 'react';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const [isOnline, setIsOnline] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const checkBackendConnection = async () => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 35000); // 35 seconds timeout

      try {
        const base = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : 'http://localhost:5000';
        const response = await fetch(`${base}/api/schools`, {
          signal: controller.signal,
        });
        clearTimeout(timeoutId);
        if (response.ok) {
          setIsOnline(true);
        } else {
          setIsOnline(false);
        }
      } catch {
        setIsOnline(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkBackendConnection();

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        setDeferredPrompt(null);
      });
    }
  };

  if (isLoading) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center min-vh-100">
        <img src="/logo.png" alt="Logo" className="mb-3" style={{ width: '50px', height: '50px' }} />
        <div className="spinner-border text-primary mb-3" role="status" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="text-muted">Processing...</p>
      </div>
    );
  }

  if (!isOnline) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="alert alert-danger" role="alert">
          Refresh or check your connectivity
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      {deferredPrompt && (
        <div className="alert alert-info d-flex justify-content-between align-items-center">
          <span>Install KNU MATE as an app for a better experience!</span>
          <button className="btn btn-primary btn-sm" onClick={handleInstallClick}>
            Install
          </button>
        </div>
      )}
      <Navbar />
      <main className="flex-grow-1">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
}

export default App;
