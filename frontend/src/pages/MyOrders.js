import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

const STATUS_COLORS = { Pending:'badge-pending', Confirmed:'badge-confirmed', Delivered:'badge-delivered', Cancelled:'badge-cancelled' };

export default function MyOrders() {
  const { user } = useAuth();
  const [orders, setOrders]   = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/orders/my?mobile=${user?.mobile}`)
      .then(r => setOrders(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user]);

  return (
    <main>
      <div className="page-hero">
        <h1>📦 My Orders</h1>
        <p>Track all your orders here</p>
      </div>
      <section className="section container">
        {loading ? <div className="spinner" /> : orders.length === 0 ? (
          <div className="text-center" style={{padding:'60px 0'}}>
            <div style={{fontSize:'64px',marginBottom:'16px'}}>📦</div>
            <h3>No orders yet</h3>
            <p style={{color:'var(--mist)'}}>Start shopping to see your orders here.</p>
          </div>
        ) : (
          <div style={{display:'flex',flexDirection:'column',gap:'20px'}}>
            {orders.map(o => (
              <div key={o.id} className="card" style={{padding:'24px'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'16px',flexWrap:'wrap',gap:'12px'}}>
                  <div>
                    <h3 style={{marginBottom:'4px'}}>Order #{o.id}</h3>
                    <p style={{color:'var(--mist)',fontSize:'13px'}}>{new Date(o.created_at).toLocaleDateString('en-IN',{dateStyle:'medium'})}</p>
                  </div>
                  <span className={`badge ${STATUS_COLORS[o.status] || 'badge-pending'}`}>{o.status}</span>
                </div>
                <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:'12px',fontSize:'14px'}}>
                  <div><strong>Products</strong><br/>{o.products}</div>
                  <div><strong>Quantity</strong><br/>{o.total_qty} kg</div>
                  <div><strong>Amount</strong><br/><span style={{color:'var(--ocean)',fontWeight:'700',fontSize:'16px'}}>₹{parseFloat(o.amount).toFixed(2)}</span></div>
                  <div><strong>Payment</strong><br/>{o.payment_method}</div>
                  <div><strong>Address</strong><br/>{o.address}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
