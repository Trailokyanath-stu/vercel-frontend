// src/components/Menu.jsx

import { useEffect, useMemo, useState } from "react";
import Reveal from "./Reveal.jsx";
import { fetchMenu } from "../api.js";

export default function Menu() {
  const [items, setItems] = useState(null);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    let cancelled = false;

    fetchMenu()
      .then((data) => {
        if (!cancelled) {
          setItems(data);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const categories = useMemo(() => {
    if (!items) return [];
    return ["All", ...new Set(items.map((item) => item.category))];
  }, [items]);

  const visibleItems = useMemo(() => {
    if (!items) return [];

    return activeCategory === "All"
      ? items
      : items.filter((item) => item.category === activeCategory);
  }, [items, activeCategory]);

  return (
    <section className="menu" id="menu">
      <div className="section-inner">

        <Reveal as="p" className="eyebrow center">
          Our Menu
        </Reveal>

        <Reveal as="h2" className="section-title center">
          Today On The Table
        </Reveal>

        <Reveal as="p" className="section-lead center">
          Prices and availability are updated live from The Grand Palette kitchen.
        </Reveal>

        {categories.length > 0 && (
          <div className="menu-filters">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`menu-filter-pill ${
                  activeCategory === cat ? "active" : ""
                }`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        <div className="menu-grid">

          {error && (
            <p className="menu-status">
              Could not load menu.
            </p>
          )}

          {!error && items === null && (
            <p className="menu-status">
              Loading menu...
            </p>
          )}

          {!error && items !== null && items.length === 0 && (
            <p className="menu-status">
              No menu items available.
            </p>
          )}

          {!error &&
            visibleItems.map((item) => (
              <article className="menu-card" key={item._id}>

                <img
                  src={item.image}
                  alt={item.name}
                  className="menu-card-image"
                />

                <div className="menu-card-top">
                  <h4>{item.name}</h4>

                  <span className="menu-card-price">
                    ₹{item.price}
                  </span>
                </div>

                <p>{item.description}</p>

                <span className="menu-card-cat">
                  {item.category}
                </span>

              </article>
            ))}

        </div>

      </div>
    </section>
  );
}