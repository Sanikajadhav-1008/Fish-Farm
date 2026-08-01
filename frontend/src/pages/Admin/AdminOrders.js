import { useState, useEffect } from 'react';
import api from '../../api/axios';
import toast from 'react-hot-toast';

const STATUSES = ['Pending','Confirmed','Delivered','Cancelled'];
const STATUS_COLORS = { Pending:'badge-pending', Confirmed:'badge-confirmed', Delivered:'badge-delivered', Cancelled:'badge-cancelled' };

export default function AdminOrders() {
  const [orders, setOrders]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter]   = useState('All');

  const load = () => api.get('/orders').then(r=>setOrders(r.data)).finally(()=>setLoading(false));
  useEffect(() => { load(); }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/orders/${id}/status`, { status });
      toast.success(`Order #${id} → ${status}`);
      setOrders(prev => prev.map(o => o.id===id ? {...o,status} : o));
    } catch { toast.error('Update failed'); }
  };

  const filtered = filter === 'All' ? orders : orders.filter(o=>o.status===filter);

  return (
    <div>
      <h2 className="admin-page-title">Orders</h2>
      <div className="admin-panel">
        <div style={{display:'flex',gap:'8px',marginBottom:'20px',flexWrap:'wrap'}}>
          {['All',...STATUSES].map(s => (
            <button key={s} onClick={()=>setFilter(s)}
              className={`btn btn-sm ${filter===s ? 'btn-primary' : 'btn-outline'}`}>{s}</button>
          ))}
        </div>
        {loading ? <div className="spinner" /> : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr><th>#</th><th>Name</th><th>Mobile</th><th>Products</th><th>Qty</th><th>Amount</th><th>Payment</th><th>Status</th><th>Update</th></tr>
              </thead>
              <tbody>
                {filtered.map(o => (
                  <tr key={o.id}>
                    <td>{o.id}</td>
                    <td>{o.name}</td>
                    <td>{o.mobile}</td>
                    <td style={{maxWidth:180,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{o.products}</td>
                    <td>{o.total_qty} kg</td>
                    <td>₹{parseFloat(o.amount).toFixed(2)}</td>
                    <td>{o.payment_method}</td>
                    <td><span className={`badge ${STATUS_COLORS[o.status]||'badge-pending'}`}>{o.status}</span></td>
                    <td>
                      <select className="form-control" style={{padding:'6px 10px',minWidth:120,fontSize:13}}
                        value={o.status} onChange={e=>updateStatus(o.id,e.target.value)}>
                        {STATUSES.map(s=><option key={s}>{s}</option>)}
                      </select>
                    </td>
                  </tr>
                ))}
                {filtered.length===0 && <tr><td colSpan={9} style={{textAlign:'center',color:'#94a3b8'}}>No orders found.</td></tr>}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
