import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import './Admin.css';

export default function AdminLogin() {
  const { login } = useAuth();
  const navigate  = useNavigate();
  const [form, setForm] = useState({ email:'', password:'' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault(); setLoading(true);
    try {
      const { data } = await api.post('/auth/admin/login', form);
      login(data.user, data.token);
      toast.success('Welcome, Admin!');
      navigate('/admin');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid credentials');
    } finally { setLoading(false); }
  };

  return (
    <main className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <div style={{fontSize:'48px',marginBottom:'12px'}}>🔐</div>
          <h2>Admin Panel</h2>
          <p>Jadhav's Fish Farm Management</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Admin Email</label>
            <input type="email" className="form-control" placeholder="admin@fishfarm.com"
              value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" placeholder="Password"
              value={form.password} onChange={e=>setForm(f=>({...f,password:e.target.value}))} required />
          </div>
          <button className="btn btn-primary btn-block" disabled={loading}>
            {loading ? 'Logging in...' : 'Login to Admin Panel'}
          </button>
        </form>
        <p style={{textAlign:'center',marginTop:'20px',fontSize:'13px',color:'#64748b'}}>
          Default: admin@fishfarm.com / admin123
        </p>
      </div>
    </main>
  );
}
