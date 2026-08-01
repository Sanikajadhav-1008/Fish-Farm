import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaPhone, FaEnvelope, FaShoppingBag, FaSignOutAlt, FaFish } from 'react-icons/fa';
import './Profile.css';

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <main>
      <div className="page-hero">
        <h1>My Profile</h1>
      </div>
      <section className="section container">
        <div className="profile-layout">
          <div className="profile-card card">
            <div className="profile-avatar"><FaUser /></div>
            <h2>{user?.name}</h2>
            <p className="profile-role">Customer</p>
            <div className="profile-info">
              <div className="info-row"><FaPhone /><span>{user?.mobile}</span></div>
              <div className="info-row"><FaEnvelope /><span>{user?.email}</span></div>
            </div>
            <button className="btn btn-coral btn-block mt-3" onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </div>
          <div className="profile-actions">
            {[
              { icon:<FaShoppingBag/>, label:'My Orders',      to:'/my-orders',  color:'#0a3d62' },
              { icon:<FaFish/>,        label:'Shop Products',  to:'/products',   color:'#1a6fa8' },
            ].map(a => (
              <Link to={a.to} key={a.label} className="action-card card"
                    style={{'--accent': a.color}}>
                <span className="action-icon">{a.icon}</span>
                <span className="action-label">{a.label}</span>
                <span className="action-arrow">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
