import { useState } from 'react';
import api from '../api/axios';
import toast from 'react-hot-toast';
import './Feedback.css';

export default function Feedback() {
  const [form, setForm]     = useState({ name:'', message:'', rating:5 });
  const [loading, setLoading] = useState(false);
  const set = (k,v) => setForm(f=>({...f,[k]:v}));

  const handleSubmit = async e => {
    e.preventDefault(); setLoading(true);
    try {
      await api.post('/feedback', form);
      toast.success('Thank you for your feedback!');
      setForm({ name:'', message:'', rating:5 });
    } catch { toast.error('Failed to submit feedback.'); }
    finally { setLoading(false); }
  };

  return (
    <main>
      <div className="page-hero">
        <h1>💬 Feedback</h1>
        <p>Share your experience with us</p>
      </div>
      <section className="section container">
        <div className="card feedback-card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Your Name *</label>
              <input className="form-control" value={form.name} onChange={e=>set('name',e.target.value)} placeholder="Enter your name" required />
            </div>
            <div className="form-group">
              <label>Your Feedback *</label>
              <textarea className="form-control" rows={5} value={form.message} onChange={e=>set('message',e.target.value)} placeholder="Share your experience..." required />
            </div>
            <div className="form-group">
              <label>Rate Us</label>
              <div className="star-row">
                {[5,4,3,2,1].map(n => (
                  <span key={n} className={`star ${form.rating >= n ? 'active' : ''}`}
                        onClick={() => set('rating', n)}>★</span>
                ))}
                <span style={{marginLeft:'12px',color:'var(--mist)',fontSize:'14px'}}>{form.rating} / 5</span>
              </div>
            </div>
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Feedback'}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
