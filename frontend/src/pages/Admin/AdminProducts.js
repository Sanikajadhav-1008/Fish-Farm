import { useState, useEffect } from 'react';
import api from '../../api/axios';
import toast from 'react-hot-toast';

const EMPTY = { name:'', price:'', stock:'', image:'', description:'' };

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [form,    setForm]    = useState(EMPTY);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const set = (k,v) => setForm(f=>({...f,[k]:v}));

  const load = () => api.get('/products').then(r=>setProducts(r.data)).finally(()=>setLoading(false));
  useEffect(() => { load(); }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (editing) {
        await api.put(`/products/${editing}`, form);
        toast.success('Product updated!');
      } else {
        await api.post('/products', form);
        toast.success('Product added!');
      }
      setForm(EMPTY); setEditing(null); load();
    } catch (err) { toast.error(err.response?.data?.message || 'Error saving product'); }
  };

  const handleEdit = p => { setForm({name:p.name,price:p.price,stock:p.stock,image:p.image,description:p.description||''}); setEditing(p.id); window.scrollTo(0,0); };
  const handleDelete = async id => {
    if (!window.confirm('Delete this product?')) return;
    try { await api.delete(`/products/${id}`); toast.success('Deleted'); load(); }
    catch { toast.error('Delete failed'); }
  };

  return (
    <div>
      <h2 className="admin-page-title">Products</h2>
      <div className="admin-panel" style={{marginBottom:'28px'}}>
        <h3 style={{marginBottom:'20px'}}>{editing ? '✏ Edit Product' : '➕ Add Product'}</h3>
        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-group"><label>Name *</label><input className="form-control" value={form.name} onChange={e=>set('name',e.target.value)} required /></div>
          <div className="form-group"><label>Price (₹/kg) *</label><input type="number" className="form-control" value={form.price} onChange={e=>set('price',e.target.value)} required /></div>
          <div className="form-group"><label>Stock (kg) *</label><input type="number" className="form-control" value={form.stock} onChange={e=>set('stock',e.target.value)} required /></div>
          <div className="form-group"><label>Image filename</label><input className="form-control" placeholder="red.jpg" value={form.image} onChange={e=>set('image',e.target.value)} /></div>
          <div className="form-group" style={{gridColumn:'1/-1'}}><label>Description</label><textarea className="form-control" rows={2} value={form.description} onChange={e=>set('description',e.target.value)} /></div>
          <div style={{gridColumn:'1/-1',display:'flex',gap:'12px'}}>
            <button className="btn btn-primary" type="submit">{editing ? 'Update' : 'Add Product'}</button>
            {editing && <button type="button" className="btn btn-outline" onClick={()=>{setForm(EMPTY);setEditing(null);}}>Cancel</button>}
          </div>
        </form>
      </div>
      <div className="admin-panel">
        <h3 style={{marginBottom:'20px'}}>All Products</h3>
        {loading ? <div className="spinner" /> : (
          <div className="table-wrap">
            <table>
              <thead><tr><th>#</th><th>Image</th><th>Name</th><th>Price/kg</th><th>Stock</th><th>Actions</th></tr></thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td><img src={`/images/${p.image}`} alt={p.name} onError={e=>e.target.src='/images/placeholder.jpg'} style={{width:56,height:44,objectFit:'cover',borderRadius:6}} /></td>
                    <td>{p.name}</td>
                    <td>₹{p.price}</td>
                    <td>{p.stock} kg</td>
                    <td>
                      <button className="btn btn-sm btn-outline" style={{marginRight:8}} onClick={()=>handleEdit(p)}>✏ Edit</button>
                      <button className="btn btn-sm btn-coral" onClick={()=>handleDelete(p.id)}>🗑 Delete</button>
                    </td>
                  </tr>
                ))}
                {products.length===0 && <tr><td colSpan={6} style={{textAlign:'center',color:'#94a3b8'}}>No products.</td></tr>}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
