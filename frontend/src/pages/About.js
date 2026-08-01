import './About.css';

export default function About() {
  return (
    <main>
      <div className="page-hero">
        <h1>About Us</h1>
        <p>Learn about Jadhav's Cage Culture Fish Farm</p>
      </div>
      <section className="section container">
        <div className="about-grid">
          <div className="about-visual">
            <div className="about-img-box">🐟</div>
          </div>
          <div className="about-text">
            <h2>Our Story</h2>
            <p>Jadhav Cage Culture Fish Farm in Satara is known to satisfactorily cater to the demands of its customer base. Located at Karanjoshi, Pathan, our farm has been providing fresh, high-quality fish for over 4 years.</p>
            <p>Fish farms help in meeting global demand by breeding different varieties of fish for consumption. We specialise in cage culture — raising fish in natural freshwater cages that mimic their natural environment, ensuring the best quality and taste.</p>
            <div className="about-highlights">
              {[['4+','Years in Business'],['500+','Happy Customers'],['3','Fish Varieties'],['100%','Farm Fresh']].map(([v,l]) => (
                <div key={l} className="highlight-item">
                  <span className="highlight-val">{v}</span>
                  <span className="highlight-label">{l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="section" style={{background:'var(--foam)'}}>
        <div className="container">
          <h2 className="section-title">Our Fish Species</h2>
          <p className="section-sub">Three varieties, all raised with care</p>
          <div className="grid-3">
            {[
              {emoji:'🔴',name:'Red Tilapia',   desc:'A freshwater species rich in protein (26g/100g). Excellent source of B12, selenium, and phosphorus.'},
              {emoji:'⚫',name:'Black Tilapia', desc:'Low-calorie (96 kcal/100g) freshwater fish from Southern Africa. Lean and high in protein.'},
              {emoji:'🐟',name:'Pangasius',     desc:'White fish with 15g protein per 100g, only 80 kcal. Rich in omega-3 and vitamin D.'},
            ].map(f => (
              <div key={f.name} className="card" style={{padding:'32px',textAlign:'center'}}>
                <div style={{fontSize:'48px',marginBottom:'16px'}}>{f.emoji}</div>
                <h3 style={{marginBottom:'12px'}}>{f.name}</h3>
                <p style={{color:'var(--mist)',fontSize:'14px',lineHeight:'1.7'}}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
