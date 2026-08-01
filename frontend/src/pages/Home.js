import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';
import { FaFish, FaUsers, FaLeaf, FaTruck } from 'react-icons/fa';
import './Home.css';

const STATS = [
  { icon: <FaUsers />, value: '500+', label: 'Happy Customers' },
  { icon: <FaFish />,  value: '3',    label: 'Fish Varieties' },
  { icon: <FaLeaf />,  value: '100%', label: 'Fresh Quality' },
  { icon: <FaTruck />, value: '4+',   label: 'Years Experience' },
];

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get('/products').then(r => setProducts(r.data.slice(0, 3))).catch(() => {});
  }, []);

  return (
    <main>
      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <p className="hero-eyebrow">Satara, Maharashtra</p>
          <h1>Fresh Fish,<br />Straight from the Cage</h1>
          <p className="hero-sub">Jadhav's Cage Culture Fish Farm — Premium Tilapia and Pangasius raised in natural freshwater cages.</p>
          <div className="hero-cta">
            <Link to="/products" className="btn btn-coral">Shop Now</Link>
            <Link to="/about"    className="btn btn-outline" style={{color:'#fff',borderColor:'rgba(255,255,255,.6)'}}>Learn More</Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-badge">🐟</div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-bar">
        <div className="container stats-grid">
          {STATS.map(s => (
            <div key={s.label} className="stat-item">
              <span className="stat-icon">{s.icon}</span>
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="section container">
        <h2 className="section-title">Our Fresh Catch</h2>
        <p className="section-sub">Harvested fresh and delivered to your door</p>
        <div className="grid-3">
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
        <div className="text-center mt-4">
          <Link to="/products" className="btn btn-outline">View All Products →</Link>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-section">
        <div className="container">
          <h2 className="section-title" style={{color:'#fff'}}>Why Choose Us?</h2>
          <div className="why-grid">
            {[
              { icon:'🏞', title:'Natural Cage Culture', desc:'Our fish are raised in natural freshwater cages, ensuring authentic taste and quality.' },
              { icon:'🚚', title:'Fresh Home Delivery',  desc:'Order today and receive freshly harvested fish directly at your doorstep.' },
              { icon:'💯', title:'Quality Guaranteed',   desc:'Every fish is inspected for quality before packaging. Your satisfaction is our priority.' },
              { icon:'💰', title:'Best Farm Prices',     desc:'Direct from farm to you — no middlemen, so you always get the best prices.' },
            ].map(w => (
              <div key={w.title} className="why-card">
                <div className="why-icon">{w.icon}</div>
                <h3>{w.title}</h3>
                <p>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner container">
        <div className="cta-content">
          <h2>Ready to Order?</h2>
          <p>Browse our selection of fresh fish and place your order today.</p>
          <Link to="/products" className="btn btn-primary">Shop Now →</Link>
        </div>
      </section>
    </main>
  );
}
