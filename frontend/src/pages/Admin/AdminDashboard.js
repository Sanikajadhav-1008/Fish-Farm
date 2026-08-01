import { useState, useEffect } from 'react';
import api from '../../api/axios';

const STATUS_COLORS = { Pending:'badge-pending', Confirmed:'badge-confirmed', Delivered:'badge-delivered', Cancelled:'badge-cancelled' };

export default function AdminDashboard() {
  const [stats,  setStats]  = useState({ products:0, orders:0, revenue:0, feedback:0 });
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('/products'),
      api.get('/orders'),
      api.get('/feedback'),
    ]).then(([p, o, f]) => {
      const revenue = o.data.reduce((s,x) => s + parseFloat(x.amount||0), 0);
      setStats({ products:p.data.length, orders:o.data.length, revenue, feedback:f.data.length });
      setOrders(o.data.slice(0,5));
    }).catch(()=>{})
    .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="spinner" />;

  const CARDS = [
    { label:'Products',    value:stats.products,           color:'#0a3d62', icon:'📦' },
    { label:'Total Orders',value:stats.orders,             color:'#27ae60', icon:'🛒' },
    { label:'Revenue',     value:`₹${stats.revenue.toFixed(0)}`, color:'#8e44ad', icon:'💰' },
    { label:'Feedback',    value:stats.feedback,           color:'#e67e22', icon:'💬' },
  ];

  return (
    <div>
      <h2 className="admin-page-title">Dashboard</h2>
      <div className="stat-cards">
        {CARDS.map(c => (
          <div key={c.label} className="stat-card" style={{'--card-color': c.color}}>
            <span className="stat-card-icon">{c.icon}</span>
            <div>
              <div className="stat-card-value">{c.value}</div>
              <div className="stat-card-label">{c.label}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="admin-panel">
        <h3 style={{marginBottom:'20px'}}>Recent Orders</h3>
        <div className="table-wrap">
          <table>
            <thead><tr><th>#</th><th>Name</th><th>Products</th><th>Amount</th><th>Status</th></tr></thead>
            <tbody>
              {orders.map(o => (
                <tr key={o.id}>
                  <td>{o.id}</td>
                  <td>{o.name}</td>
                  <td style={{maxWidth:'220px',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{o.products}</td>
                  <td>₹{parseFloat(o.amount).toFixed(2)}</td>
                  <td><span className={`badge ${STATUS_COLORS[o.status]||'badge-pending'}`}>{o.status}</span></td>
                </tr>
              ))}
              {orders.length === 0 && <tr><td colSpan={5} style={{textAlign:'center',color:'#94a3b8'}}>No orders yet.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
