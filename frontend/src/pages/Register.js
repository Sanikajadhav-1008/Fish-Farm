import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import './Auth.css';

export default function Register() {
  const { login } = useAuth();
  const navigate  = useNavigate();
  const [form, setForm] = useState({ name:'', mobile:'', email:'', password:'' });
  const [loading, setLoading] = useState(false);
  const set = (k,v) => setForm(f=>({...f,[k]:v}));

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/auth/register', form);
      toast.success('Account created! Please login.');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-card card">
        <div className="auth-header">
          <div className="auth-icon">📝</div>
          <h2>Create Account</h2>
          <p>Join Jadhav's Fish Farm family</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input className="form-control" placeholder="Your full name" value={form.name} onChange={e=>set('name',e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Mobile Number</label>
            <input className="form-control" placeholder="10-digit mobile" value={form.mobile} onChange={e=>set('mobile',e.target.value)} pattern="[6-9][0-9]{9}" required />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" className="form-control" placeholder="you@example.com" value={form.email} onChange={e=>set('email',e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" placeholder="Min 6 characters" value={form.password} onChange={e=>set('password',e.target.value)} minLength={6} required />
          </div>
          <button className="btn btn-primary btn-block" type="submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>
        <p className="auth-footer">Already have an account? <Link to="/login">Login here</Link></p>
      </div>
    </main>
  );
}
