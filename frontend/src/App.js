import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

import Navbar        from './components/Navbar';
import Footer        from './components/Footer';
import Home          from './pages/Home';
import Products      from './pages/Products';
import About         from './pages/About';
import Contact       from './pages/Contact';
import Feedback      from './pages/Feedback';
import Login         from './pages/Login';
import Register      from './pages/Register';
import Profile       from './pages/Profile';
import Cart          from './pages/Cart';
import Checkout      from './pages/Checkout';
import OrderSuccess  from './pages/OrderSuccess';
import MyOrders      from './pages/MyOrders';
import AdminLayout   from './pages/Admin/AdminLayout';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminProducts from './pages/Admin/AdminProducts';
import AdminOrders   from './pages/Admin/AdminOrders';
import AdminFeedback from './pages/Admin/AdminFeedback';
import AdminContacts from './pages/Admin/AdminContacts';
import AdminLogin    from './pages/Admin/AdminLogin';

function PrivateRoute({ children }) {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}
function AdminRoute({ children }) {
  const { isAdmin } = useAuth();
  return isAdmin ? children : <Navigate to="/admin/login" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
          <Routes>
            {/* Public pages with Navbar + Footer */}
            <Route path="/*" element={
              <>
                <Navbar />
                <Routes>
                  <Route path="/"            element={<Home />} />
                  <Route path="/products"    element={<Products />} />
                  <Route path="/about"       element={<About />} />
                  <Route path="/contact"     element={<Contact />} />
                  <Route path="/feedback"    element={<Feedback />} />
                  <Route path="/login"       element={<Login />} />
                  <Route path="/register"    element={<Register />} />
                  <Route path="/cart"        element={<Cart />} />
                  <Route path="/checkout"    element={<Checkout />} />
                  <Route path="/order-success/:id" element={<OrderSuccess />} />
                  <Route path="/profile"     element={<PrivateRoute><Profile /></PrivateRoute>} />
                  <Route path="/my-orders"   element={<PrivateRoute><MyOrders /></PrivateRoute>} />
                </Routes>
                <Footer />
              </>
            } />

            {/* Admin pages */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/*" element={
              <AdminRoute>
                <AdminLayout>
                  <Routes>
                    <Route path="/"         element={<AdminDashboard />} />
                    <Route path="/products" element={<AdminProducts />} />
                    <Route path="/orders"   element={<AdminOrders />} />
                    <Route path="/feedback" element={<AdminFeedback />} />
                    <Route path="/contacts" element={<AdminContacts />} />
                  </Routes>
                </AdminLayout>
              </AdminRoute>
            } />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}
