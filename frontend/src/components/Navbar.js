import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { FaFish, FaShoppingCart, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';

export default function Navbar() {
  const { user, isLoggedIn, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <nav className="navbar">
      <div className="navbar-inner container">
        <Link to="/" className="navbar-brand">
          <FaFish className="brand-icon" />
          <span>Jadhav's Fish Farm</span>
        </Link>

        <button className="nav-toggle" onClick={() => setOpen(!open)}>
          {open ? <FaTimes /> : <FaBars />}
        </button>

        <ul className={`nav-links ${open ? 'nav-open' : ''}`}>
          {['/', '/products', '/about', '/contact', '/feedback'].map((path, i) => {
            const labels = ['Home','Products','About','Contact','Feedback'];
            return (
              <li key={path}>
                <NavLink to={path} className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}
                  onClick={() => setOpen(false)}>
                  {labels[i]}
                </NavLink>
              </li>
            );
          })}
        </ul>

        <div className="nav-actions">
          <Link to="/cart" className="cart-btn">
            <FaShoppingCart />
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </Link>
          {isLoggedIn ? (
            <div className="user-menu">
              <button className="user-btn"><FaUser /> {user.name.split(' ')[0]}</button>
              <div className="user-dropdown">
                <Link to="/profile"   onClick={() => setOpen(false)}>Profile</Link>
                <Link to="/my-orders" onClick={() => setOpen(false)}>My Orders</Link>
                <button onClick={handleLogout}>Logout</button>
              </div>
            </div>
          ) : (
            <div className="flex gap-1">
              <Link to="/login"    className="btn btn-outline btn-sm">Login</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Register</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
