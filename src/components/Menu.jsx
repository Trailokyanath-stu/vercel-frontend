// src/components/Menu.jsx

import { useEffect, useMemo, useState } from "react";
import Reveal from "./Reveal.jsx";
import { fetchMenu } from "../api.js";
import ItemDetailModal from "./ItemDetailModal.jsx";
import { useCart } from "../context/CartContext.jsx";

const FALLBACK_MENU = [
  {
    _id: "item-1",
    name: "Grand Hazelnut Latte",
    price: 240,
    category: "Coffee",
    image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=600&q=80",
    description: "Espresso with steamed milk and roasted hazelnut syrup topped with velvet microfoam.",
  },
  {
    _id: "item-2",
    name: "Artisanal Avocado Toast",
    price: 320,
    category: "Breakfast",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80",
    description: "Sourdough toast topped with crushed avocado, poached eggs, cherry tomatoes, and microgreens.",
  },
  {
    _id: "item-3",
    name: "Chef Special Royal Biryani",
    price: 450,
    category: "Main Course",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80",
    description: "Fragrant basmati rice slow-cooked in hand-ground spices, caramelized onions, and tender cuts.",
  },
  {
    _id: "item-4",
    name: "Paneer Tikka Platter",
    price: 380,
    category: "Main Course",
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=600&q=80",
    description: "Charcoal-grilled cottage cheese marinated in spiced yogurt and mint chutney.",
  },
  {
    _id: "item-5",
    name: "Signature Belgian Chocolate Lava Cake",
    price: 290,
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80",
    description: "Warm chocolate cake with a molten dark chocolate center, served with vanilla bean gelato.",
  },
  {
    _id: "item-6",
    name: "Iced Berry Hibiscus Refresher",
    price: 210,
    category: "Beverages",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80",
    description: "Chilled organic hibiscus tea infused with fresh raspberries, mint leaves, and lemon zest.",
  },
  {
    _id: "item-7",
    name: "Double Espresso Roast",
    price: 180,
    category: "Coffee",
    image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=600&q=80",
    description: "Rich, bold double shot extracted from 100% single-origin Arabica beans.",
  },
  {
    _id: "item-8",
    name: "Truffle Mushroom Pasta",
    price: 420,
    category: "Main Course",
    image: "https://images.unsplash.com/photo-1621996346565-e3d5d6281292?auto=format&fit=crop&w=600&q=80",
    description: "Fettuccine tossed in rich white truffle cream, wild forest mushrooms, and shaved parmesan.",
  },
  {
    _id: "item-9",
    name: "Classic New York Cheesecake",
    price: 280,
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80",
    description: "Creamy baked cheesecake on a graham cracker crust with fresh strawberry coulis.",
  },
   {
    id: 10,
    name: "Veg Spring Rolls",
    price: "₹160",
    image:
      "https://images.unsplash.com/photo-1548507200-0e0b8c6c2f2a?auto=format&fit=crop&w=800&q=80",
  },
];

export default function Menu() {
  const [items, setItems] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState(null);

  const { addToCart, openCart } = useCart();

  useEffect(() => {
    let cancelled = false;

    fetchMenu()
      .then((data) => {
        if (!cancelled && Array.isArray(data) && data.length > 0) {
          setItems(data);
        } else if (!cancelled) {
          setItems(FALLBACK_MENU);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setItems(FALLBACK_MENU);
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
    <>
      <section className="menu" id="menu">
        <div className="section-inner">

          <Reveal as="p" className="eyebrow center">
            Our Menu
          </Reveal>

          <Reveal as="h2" className="section-title center">
            Today On The Table
          </Reveal>

          <Reveal as="p" className="section-lead center">
            Explore live signature creations from The Grand Palette kitchen.
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
            {items === null && (
              <p className="menu-status">Loading menu...</p>
            )}

            {items !== null && visibleItems.length === 0 && (
              <p className="menu-status">No items found in this category.</p>
            )}

            {items !== null &&
              visibleItems.map((item) => (
                <article className="menu-card" key={item._id || item.name}>

                  <img
                    src={item.image}
                    alt={item.name}
                    className="menu-card-image"
                    onClick={() => setSelectedItem(item)}
                    style={{ cursor: 'pointer' }}
                  />

                  <div className="menu-card-top">
                    <h4 onClick={() => setSelectedItem(item)} style={{ cursor: 'pointer' }}>
                      {item.name}
                    </h4>

                    <span className="menu-card-price">
                      ₹{item.price}
                    </span>
                  </div>

                  <p>{item.description}</p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
                    <span className="menu-card-cat">
                      {item.category}
                    </span>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        type="button"
                        style={{
                          fontSize: '12px',
                          color: '#fff',
                          background: 'rgba(255,255,255,0.08)',
                          padding: '6px 12px',
                          borderRadius: '20px',
                          border: '1px solid rgba(255,255,255,0.15)',
                        }}
                        onClick={() => setSelectedItem(item)}
                      >
                        Customize
                      </button>
                      <button
                        type="button"
                        style={{
                          fontSize: '12px',
                          color: '#fff',
                          background: '#ff173f',
                          padding: '6px 14px',
                          borderRadius: '20px',
                          fontWeight: 600,
                        }}
                        onClick={() => {
                          addToCart(item);
                          openCart();
                        }}
                      >
                        + Add
                      </button>
                    </div>
                  </div>

                </article>
              ))}

          </div>

        </div>
      </section>

      <ItemDetailModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </>
  );
}