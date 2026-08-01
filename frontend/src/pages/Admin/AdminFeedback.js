import { useState, useEffect } from 'react';
import api from '../../api/axios';

export default function AdminFeedback() {
  const [rows, setRows]       = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { api.get('/feedback').then(r=>setRows(r.data)).finally(()=>setLoading(false)); }, []);

  return (
    <div>
      <h2 className="admin-page-title">Customer Feedback</h2>
      <div className="admin-panel">
        {loading ? <div className="spinner" /> : (
          <div className="table-wrap">
            <table>
              <thead><tr><th>#</th><th>Name</th><th>Feedback</th><th>Rating</th><th>Date</th></tr></thead>
              <tbody>
                {rows.map(r => (
                  <tr key={r.id}>
                    <td>{r.id}</td>
                    <td>{r.name}</td>
                    <td>{r.message}</td>
                    <td style={{color:'#f39c12',fontSize:'18px'}}>{'★'.repeat(r.rating)}{'☆'.repeat(5-r.rating)}</td>
                    <td>{new Date(r.created_at).toLocaleDateString('en-IN')}</td>
                  </tr>
                ))}
                {rows.length===0 && <tr><td colSpan={5} style={{textAlign:'center',color:'#94a3b8'}}>No feedback yet.</td></tr>}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
