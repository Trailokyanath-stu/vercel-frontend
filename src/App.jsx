// src/App.jsx
import Loader from './components/Loader.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Services from './components/Services.jsx';
import Menu from './components/Menu.jsx';
import Features from './components/Features.jsx';
import Reviews from './components/Reviews.jsx';
import CTA from './components/CTA.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import ReservationModal from './components/ReservationModal.jsx';
import BackToTop from './components/BackToTop.jsx';
import { ReservationModalProvider } from './context/ReservationModalContext.jsx';

export default function App() {
  return (
    <ReservationModalProvider>
      <Loader />
      <Navbar />

      <main>
        <Hero />
        <About />
        <Services />
        <Menu />
        <Features />
        <Reviews />
        <CTA />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
      <ReservationModal />
    </ReservationModalProvider>
  );
}
