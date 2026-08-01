import { Link } from 'react-router-dom';
import { FaFish, FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaFacebook, FaInstagram } from 'react-icons/fa';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div className="footer-brand"><FaFish /> Jadhav's Fish Farm</div>
          <p className="footer-desc">Premium cage culture fish farm in Satara, Maharashtra. Fresh fish delivered to your doorstep.</p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <ul>
            {[['/','/home'],['products','/products'],['about','/about'],['contact','/contact'],['feedback','/feedback']].map(([l,p]) => (
              <li key={p}><Link to={p} style={{textTransform:'capitalize'}}>{l}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Contact Us</h4>
          <p><FaPhone /> 8369046891 / 7972726872</p>
          <p><FaEnvelope /> admin@sadgurusainathgroup.com</p>
          <p><FaMapMarkerAlt /> Murud Tarali Dam, Patan, Dist. Satara – 415014</p>
        </div>
        <div>
          <h4>Follow Us</h4>
          <div className="social-links">
            <a href="#"><FaWhatsapp /></a>
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaInstagram /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Jadhav's Cage Culture Fish Farm. All rights reserved.</p>
      </div>
    </footer>
  );
}
