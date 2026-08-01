import { useState } from 'react';
import api from '../api/axios';
import toast from 'react-hot-toast';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import './Contact.css';

export default function Contact() {
  const [form, setForm] = useState({ email:'', mobile:'', message:'' });
  const [loading, setLoading] = useState(false);
  const set = (k,v) => setForm(f=>({...f,[k]:v}));

  const handleSubmit = async e => {
    e.preventDefault(); setLoading(true);
    try {
      await api.post('/contact', form);
      toast.success('Message sent! We will get back to you soon.');
      setForm({ email:'', mobile:'', message:'' });
    } catch { toast.error('Failed to send message.'); }
    finally { setLoading(false); }
  };

  return (
    <main>
      <div className="page-hero">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you</p>
      </div>
      <section className="section container">
        <div className="contact-layout">
          <div>
            <h2 style={{marginBottom:'24px'}}>Get in Touch</h2>
            <div className="contact-info-list">
              {[
                { icon:<FaPhone/>,         label:'Phone',   value:'8369046891 / 7972726872' },
                { icon:<FaEnvelope/>,       label:'Email',   value:'admin@sadgurusainathgroup.com' },
                { icon:<FaMapMarkerAlt/>,   label:'Address', value:'Karanjoshi, Patan, Dist. Satara – 415014' },
              ].map(c => (
                <div key={c.label} className="contact-info-item">
                  <div className="contact-icon">{c.icon}</div>
                  <div>
                    <div className="contact-label">{c.label}</div>
                    <div className="contact-value">{c.value}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="map-box">
              <iframe title="Farm Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3800!2d73.8846332!3d17.5482819!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc22354ce3f5479%3A0x15a6f3fa6919466f!2sJadhav%27s%20Cage%20Culture%20Fish%20Farm!5e0!3m2!1sen!2sin!4v1712224529112!5m2!1sen!2sin"
                width="100%" height="220" style={{border:0,borderRadius:'12px'}} allowFullScreen loading="lazy"/>
            </div>
          </div>
          <div className="card" style={{padding:'36px'}}>
            <h3 style={{marginBottom:'24px'}}>Send a Message</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Email *</label>
                <input type="email" className="form-control" value={form.email} onChange={e=>set('email',e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Mobile *</label>
                <input className="form-control" value={form.mobile} onChange={e=>set('mobile',e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Message *</label>
                <textarea className="form-control" rows={5} value={form.message} onChange={e=>set('message',e.target.value)} required />
              </div>
              <button className="btn btn-primary btn-block" disabled={loading}>
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
