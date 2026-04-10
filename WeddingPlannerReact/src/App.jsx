import AboutCardsSection from './components/AboutCardsSection';
import FinancialCalculator from './components/FinancialCalculator';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';

function App() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <AboutCardsSection />
      <FinancialCalculator />
      <Footer />
    </div>
  );
}

export default App;
