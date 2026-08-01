import React from "react";
import "../styles/Home.css";

export default function Home() {
  // This function moves the page to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <main className="home">
      
      {/* Your existing Home page content */}
      <section className="hero">
        <h1>The Grand Palette</h1>
        <p>A little bean magic, every day</p>
      </section>

      {/* Scroll to top button */}
      <button
        className="scroll-top-btn"
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        ↑
      </button>

    </main>
  );
}