import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
// Terms import removed
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import MyShelf from './pages/MyShelf';
import LibraryPackages from './pages/LibraryPackages';
import Library from './pages/Library';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import OAuth2Redirect from './pages/OAuth2Redirect';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isTermsChecked, setIsTermsChecked] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const urlAccepted = searchParams.get('accepted') === 'true';
    const storedAccepted = localStorage.getItem('termsAccepted');

    if (urlAccepted) {
      localStorage.setItem('termsAccepted', 'true');
      window.history.replaceState({}, document.title, location.pathname);
      setIsTermsChecked(true);
    } else if (storedAccepted === 'true') {
      setIsTermsChecked(true);
    } else {
      window.location.href = 'http://localhost:5001/terms-page';
    }
  }, [location]);

  if (!isTermsChecked) return null; // Or a loading spinner

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/oauth2/redirect" element={<OAuth2Redirect />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/myshelf" element={<MyShelf />} />
        <Route path="/library" element={<Library />} />
        <Route path="/membership" element={<LibraryPackages />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
