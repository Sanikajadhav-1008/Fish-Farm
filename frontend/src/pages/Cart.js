import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaTrash, FaArrowLeft } from 'react-icons/fa';
import './Cart.css';

export default function Cart() {
  const { cart, removeItem, updateQty, clearCart, totalAmount } = useCart();

  if (cart.length === 0) return (
    <main className="empty-cart">
      <div className="text-center">
        <div style={{fontSize:'80px'}}>🛒</div>
        <h2>Your cart is empty</h2>
        <p>Add some fresh fish to get started!</p>
        <Link to="/products" className="btn btn-primary mt-3">Browse Products</Link>
      </div>
    </main>
  );

  return (
    <main>
      <div className="page-hero">
        <h1>🛒 Your Cart</h1>
        <p>{cart.length} item{cart.length !== 1 ? 's' : ''} in your cart</p>
      </div>
      <section className="section container">
        <div className="cart-layout">
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.id} className="cart-row card">
                <img src={`/images/${item.image}`} alt={item.name}
                     onError={e => e.target.src='/images/placeholder.jpg'} />
                <div className="cart-info">
                  <h3>{item.name}</h3>
                  <p>₹{item.price} / kg</p>
                </div>
                <div className="qty-control">
                  <button onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                  <span>{item.qty}</span>
                  <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                </div>
                <div className="cart-subtotal">₹{(item.price * item.qty).toFixed(2)}</div>
                <button className="btn-icon" onClick={() => removeItem(item.id)}><FaTrash /></button>
              </div>
            ))}
            <div className="cart-actions">
              <Link to="/products" className="btn btn-outline"><FaArrowLeft /> Continue Shopping</Link>
              <button className="btn btn-sm" style={{background:'#fee',color:' var(--coral)'}} onClick={clearCart}>Clear Cart</button>
            </div>
          </div>
          <div className="cart-summary card">
            <h3>Order Summary</h3>
            <div className="summary-row"><span>Subtotal</span><span>₹{totalAmount.toFixed(2)}</span></div>
            <div className="summary-row"><span>Delivery</span><span style={{color:'var(--success)'}}>Free</span></div>
            <div className="summary-row total"><span>Total</span><span>₹{totalAmount.toFixed(2)}</span></div>
            <Link to="/checkout" className="btn btn-primary btn-block mt-3">Proceed to Checkout →</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
