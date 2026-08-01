import { useState } from "react";
import ChefDetailModal from "./ChefDetailModal.jsx";
import "../styles/chefs.css";

export default function Chefs() {
  const [selectedChef, setSelectedChef] = useState(null);

  const chefs = [
    {
      id: 1,
      name: "Chef Priya Sharma",
      role: "Executive Chef",
      experience: "12 Years of Experience",
      image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=700&q=80",
      about: "Chef Priya is passionate about creating delicious food using fresh ingredients. She specializes in Indian and Continental cuisine and focuses on quality, taste and presentation.",
      specialties: ["Indian Cuisine", "Continental Cuisine", "Signature Biryani"],
      signatureDish: "Grand Royal Dum Biryani & Truffle Naan",
    },
    {
      id: 2,
      name: "Chef Ananya Das",
      role: "Master Pastry Chef",
      experience: "8 Years of Experience",
      image: "https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&w=700&q=80",
      about: "Chef Ananya creates premium desserts and handcrafted pastries. Her goal is to make every dessert memorable and beautifully presented.",
      specialties: ["Cakes", "Pastries", "Belgian Chocolate Lava"],
      signatureDish: "Molten Belgian Lava Cake & Gelato",
    },
    {
      id: 3,
      name: "Chef Riya Patel",
      role: "Head Chef — Asian Fusion",
      experience: "10 Years of Experience",
      image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=700&q=80",
      about: "Chef Riya combines traditional recipes with modern cooking techniques to create fresh and flavorful dishes.",
      specialties: ["Pan-Asian", "Dim Sum", "Healthy Bowls"],
      signatureDish: "Truffle Mushroom Fettuccine & Ramen",
    },
    {
      id: 4,
      name: "Chef Vikramaditya Singh",
      role: "Head Barista & Roastmaster",
      experience: "9 Years of Experience",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=700&q=80",
      about: "Chef Vikramaditya brings bean-to-cup coffee mastery with single-origin Arabica roasts, nitro cold brews, and signature lattes.",
      specialties: ["Espresso Art", "Cold Brews", "Artisan Coffee"],
      signatureDish: "Grand Hazelnut Nitro Brew & Velvet Espresso",
    },
    {
      id: 5,
      name: "Chef Kabir Mehta",
      role: "Grill & BBQ Specialist",
      experience: "11 Years of Experience",
      image: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=700&q=80",
      about: "Chef Kabir is an expert in wood-fired grills, charcoal marinades, and flame-grilled sizzlers crafted to perfection.",
      specialties: ["Charcoal Kebabs", "Grill Sizzlers", "Smoked Platters"],
      signatureDish: "Paneer Tikka Charcoal Sizzler Platter",
    },
    {
      id: 6,
      name: "Chef Meera Nair",
      role: "Plant-Based & Healthy Artist",
      experience: "7 Years of Experience",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=700&q=80",
      about: "Chef Meera designs nutrient-packed organic bowls, avocado toasts, and gluten-free delights that taste extraordinary.",
      specialties: ["Avocado Toast", "Keto Bowls", "Fresh Smoothies"],
      signatureDish: "Artisanal Superfood Avocado Toast",
    },
  ];

  return (
    <>
      <section className="chefs-section" id="chefs">
        <div className="chefs-heading">
          <span>MEET OUR TEAM</span>
          <h2>Our Master Culinary Team</h2>
          <p>Meet the 6 visionary chefs and baristas behind The Grand Palette experience.</p>
        </div>

        <div className="chefs-grid">
          {chefs.map((chef) => (
            <article className="chef-card" key={chef.id}>
              <img src={chef.image} alt={chef.name} className="chef-image" />

              <div className="chef-content">
                <span className="chef-role">{chef.role}</span>
                <h3>{chef.name}</h3>
                <p className="experience">👩‍🍳 {chef.experience}</p>
                <p className="chef-about">{chef.about}</p>

                <h4>Specialties</h4>
                <div className="specialty-list" style={{ marginBottom: '16px' }}>
                  {chef.specialties.map((specialty) => (
                    <span key={specialty}>{specialty}</span>
                  ))}
                </div>

                <button
                  type="button"
                  style={{
                    color: '#ff173f',
                    fontWeight: 700,
                    fontSize: '13px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    cursor: 'pointer',
                  }}
                  onClick={() => setSelectedChef(chef)}
                >
                  View Signature Dishes & Bio →
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <ChefDetailModal chef={selectedChef} onClose={() => setSelectedChef(null)} />
    </>
  );
}