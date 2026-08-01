import { useState, useEffect } from 'react';
import api from '../../api/axios';

export default function AdminContacts() {
  const [rows, setRows]       = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { api.get('/contact').then(r=>setRows(r.data)).finally(()=>setLoading(false)); }, []);

  return (
    <div>
      <h2 className="admin-page-title">Contact Messages</h2>
      <div className="admin-panel">
        {loading ? <div className="spinner" /> : (
          <div className="table-wrap">
            <table>
              <thead><tr><th>#</th><th>Email</th><th>Mobile</th><th>Message</th><th>Date</th></tr></thead>
              <tbody>
                {rows.map(r => (
                  <tr key={r.id}>
                    <td>{r.id}</td>
                    <td>{r.email}</td>
                    <td>{r.mobile}</td>
                    <td>{r.message}</td>
                    <td>{new Date(r.created_at).toLocaleDateString('en-IN')}</td>
                  </tr>
                ))}
                {rows.length===0 && <tr><td colSpan={5} style={{textAlign:'center',color:'#94a3b8'}}>No messages yet.</td></tr>}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
