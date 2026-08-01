import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import toast from 'react-hot-toast';
import './Checkout.css';

const PAYMENT_METHODS = ['Cash on Delivery','UPI (GPay / PhonePe)','Bank Transfer / NEFT'];

export default function Checkout() {
  const { cart, totalAmount, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name:    user?.name   || '',
    email:   user?.email  || '',
    mobile:  user?.mobile || '',
    address: '',
    city:    '',
    pincode: '',
    paymentMethod: 'Cash on Delivery',
  });

  if (cart.length === 0) { navigate('/cart'); return null; }

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const { city, pincode, ...rest } = form;
      const { data } = await api.post('/orders', {
        ...rest,
        address: `${form.address}, ${city} - ${pincode}`,
        items: cart.map(i => ({ productId: i.id, name: i.name, price: i.price, qty: i.qty })),
      });
      clearCart();
      toast.success('Order placed successfully!');
      navigate(`/order-success/${data.orderId}`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <div className="page-hero">
        <h1>🧾 Checkout</h1>
      </div>
      <section className="section container">
        <div className="checkout-layout">
          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="checkout-section">
              <h3>Delivery Details</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input className="form-control" value={form.name} onChange={e=>set('name',e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Mobile *</label>
                  <input className="form-control" value={form.mobile} onChange={e=>set('mobile',e.target.value)} pattern="[6-9][0-9]{9}" required />
                </div>
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control" value={form.email} onChange={e=>set('email',e.target.value)} />
              </div>
              <div className="form-group">
                <label>Address *</label>
                <textarea className="form-control" rows={2} value={form.address} onChange={e=>set('address',e.target.value)} required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>City *</label>
                  <input className="form-control" value={form.city} onChange={e=>set('city',e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>PIN Code *</label>
                  <input className="form-control" value={form.pincode} onChange={e=>set('pincode',e.target.value)} pattern="[0-9]{6}" required />
                </div>
              </div>
            </div>
            <div className="checkout-section">
              <h3>Payment Method</h3>
              {PAYMENT_METHODS.map(m => (
                <label key={m} className="payment-option">
                  <input type="radio" name="payment" value={m}
                    checked={form.paymentMethod === m}
                    onChange={() => set('paymentMethod', m)} />
                  <span>{m === 'Cash on Delivery' ? '💵' : m.startsWith('UPI') ? '📱' : '🏦'} {m}</span>
                </label>
              ))}
            </div>
            <button className="btn btn-primary btn-block" type="submit" disabled={loading}>
              {loading ? 'Placing Order...' : `✅ Place Order — ₹${totalAmount.toFixed(2)}`}
            </button>
          </form>

          <div className="order-summary card">
            <h3>Order Summary</h3>
            {cart.map(i => (
              <div key={i.id} className="summary-item">
                <span>{i.name}</span>
                <span>{i.qty} kg × ₹{i.price}</span>
                <span>₹{(i.qty * i.price).toFixed(2)}</span>
              </div>
            ))}
            <div className="summary-total">
              <span>Total</span>
              <span>₹{totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
