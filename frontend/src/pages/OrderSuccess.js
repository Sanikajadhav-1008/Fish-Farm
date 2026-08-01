import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';
import './OrderSuccess.css';

export default function OrderSuccess() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    api.get(`/orders/my?orderId=${id}`).catch(() => {});
  }, [id]);

  return (
    <main className="success-page">
      <div className="success-card card">
        <div className="success-icon">✅</div>
        <h1>Order Placed!</h1>
        <p>Your order <strong>#{id}</strong> has been received.</p>
        <p className="success-sub">We'll contact you shortly to confirm your delivery details.</p>
        <div className="success-actions">
          <Link to="/my-orders"  className="btn btn-primary">View My Orders</Link>
          <Link to="/products"   className="btn btn-outline">Continue Shopping</Link>
        </div>
      </div>
    </main>
  );
}
