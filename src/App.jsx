// src/App.jsx

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Loader from "./components/Loader.jsx";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Services from "./components/Services.jsx";
import Chefs from "./components/Chefs.jsx";
import Menu from "./components/Menu.jsx";
import Features from "./components/Features.jsx";
import Reviews from "./components/Reviews.jsx";
import CTA from "./components/CTA.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import ReservationModal from "./components/ReservationModal.jsx";
import CartModal from "./components/CartModal.jsx";
import BackToTop from "./components/BackToTop.jsx";

import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import ForgotPassword from "./components/ForgotPassword.jsx";
import Profile from "./components/Profile.jsx";

import { ReservationModalProvider } from "./context/ReservationModalContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";

// Home Page
function Home() {
  return (
    <>
      <Loader />
      <Navbar />

      <main>
        <Hero />
        <About />
        <Services />
        <Chefs />
        <Menu />
        <Features />
        <Reviews />
        <CTA />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
      <ReservationModal />
      <CartModal />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <ReservationModalProvider>
            <Routes>
              {/* Home Page */}
              <Route path="/" element={<Home />} />

              {/* Login Page */}
              <Route path="/login" element={<Login />} />

              {/* Register Page */}
              <Route path="/register" element={<Register />} />

              {/* Forgot Password Page */}
              <Route path="/forgot-password" element={<ForgotPassword />} />

              {/* User Profile & Orders Page */}
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </ReservationModalProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}