import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaTachometerAlt, FaFish, FaClipboardList, FaComments, FaPhone, FaSignOutAlt } from 'react-icons/fa';
import './Admin.css';

const NAV = [
  { to:'/admin',          label:'Dashboard',  icon:<FaTachometerAlt/>, end:true },
  { to:'/admin/products', label:'Products',   icon:<FaFish/>           },
  { to:'/admin/orders',   label:'Orders',     icon:<FaClipboardList/>  },
  { to:'/admin/feedback', label:'Feedback',   icon:<FaComments/>       },
  { to:'/admin/contacts', label:'Contacts',   icon:<FaPhone/>          },
];

export default function AdminLayout({ children }) {
  const { logout } = useAuth();
  const navigate   = useNavigate();
  const handleLogout = () => { logout(); navigate('/admin/login'); };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="sidebar-brand">🐟 Admin Panel</div>
        <nav className="sidebar-nav">
          {NAV.map(n => (
            <NavLink key={n.to} to={n.to} end={n.end}
              className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
              {n.icon} {n.label}
            </NavLink>
          ))}
        </nav>
        <button className="sidebar-logout" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </aside>
      <div className="admin-main">
        <header className="admin-topbar">
          <span>Jadhav's Fish Farm — Admin</span>
          <a href="/" target="_blank" rel="noreferrer" style={{fontSize:'13px',color:'#64748b'}}>View Site →</a>
        </header>
        <div className="admin-content">{children}</div>
      </div>
    </div>
  );
}
