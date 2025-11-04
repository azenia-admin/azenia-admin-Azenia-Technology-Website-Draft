import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Industries from './pages/Industries';
import Careers from './pages/Careers';
import About from './pages/About';
import Contact from './pages/Contact';
import Partner from './pages/Partner';
import Jobs from './pages/Jobs';
import Admin from './pages/Admin';

type Page = 'home' | 'services' | 'industries' | 'careers' | 'about' | 'contact' | 'partner' | 'jobs' | 'admin';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const handleNavigation = (page: string) => {
    const [pageName, sectionId] = page.split('#');
    setCurrentPage(pageName as Page);

    if (sectionId) {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigation} />;
      case 'services':
        return <Services onNavigate={handleNavigation} />;
      case 'industries':
        return <Industries />;
      case 'careers':
        return <Careers />;
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      case 'partner':
        return <Partner />;
      case 'jobs':
        return <Jobs />;
      case 'admin':
        return <Admin />;
      default:
        return <Home onNavigate={(page) => setCurrentPage(page as Page)} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation onNavigate={handleNavigation} currentPage={currentPage} />
      {renderPage()}
      <Footer />
    </div>
  );
}

export default App;
