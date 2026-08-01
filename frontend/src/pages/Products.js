import { useState, useEffect } from 'react';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    api.get('/products')
      .then(r => setProducts(r.data))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main>
      <div className="page-hero">
        <h1>🐟 Our Products</h1>
        <p>Fresh, farm-raised fish — harvested and delivered to you</p>
      </div>
      <section className="section container">
        {loading ? <div className="spinner" /> : (
          products.length === 0
            ? <p className="text-center" style={{color:'var(--mist)'}}>No products available at the moment.</p>
            : <div className="grid-3">{products.map(p => <ProductCard key={p.id} product={p} />)}</div>
        )}
      </section>

      {/* Info Section */}
      <section className="section container">
        <h2 className="section-title">Product Information</h2>
        <div className="grid-3">
          {[
            { name:'Red Tilapia',   emoji:'🔴', desc:'Per 100g: 26g protein, 128 kcal. Rich in niacin, vitamin B12, phosphorus, selenium and potassium. Raised in freshwater cages.' },
            { name:'Black Tilapia', emoji:'⚫', desc:'Per 100g: 96 kcal, 1g fat. Low-calorie tropical fish from Southern Africa. Popular across Asia and widely consumed globally.' },
            { name:'Pangasius',     emoji:'🐟', desc:'Per 100g: 15g protein, 1.5g fat, 80 kcal. Good source of omega-3, vitamin D, vitamin B12, and selenium.' },
          ].map(f => (
            <div key={f.name} className="card" style={{padding:'28px'}}>
              <h3 style={{marginBottom:'12px'}}>{f.emoji} {f.name}</h3>
              <p style={{color:'var(--mist)',fontSize:'14px',lineHeight:'1.7'}}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
