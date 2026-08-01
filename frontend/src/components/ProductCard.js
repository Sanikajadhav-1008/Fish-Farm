import { FaShoppingCart, FaStar } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const handleAdd = () => {
    addItem(product, 1);
    toast.success(`${product.name} added to cart!`);
  };
  return (
    <div className="product-card card">
      <div className="product-img-wrap">
        <img
          src={`/images/${product.image}`}
          alt={product.name}
          onError={e => { e.target.src = '/images/placeholder.jpg'; }}
        />
        {product.stock <= 0 && <div className="out-of-stock">Out of Stock</div>}
      </div>
      <div className="product-body">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-desc">{product.description}</p>
        <div className="product-footer">
          <div>
            <span className="product-price">₹{product.price}</span>
            <span className="product-unit"> / kg</span>
          </div>
          <button
            className="btn btn-primary btn-sm"
            onClick={handleAdd}
            disabled={product.stock <= 0}
          >
            <FaShoppingCart /> Add
          </button>
        </div>
        <div className="product-stock">
          {product.stock > 0
            ? <span className="in-stock">✓ In Stock ({product.stock} kg)</span>
            : <span className="no-stock">✗ Out of Stock</span>}
        </div>
      </div>
    </div>
  );
}
