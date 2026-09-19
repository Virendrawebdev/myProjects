import SellerDashboard from './pages/seller/SellerDashboard';
import { Navigate, Routes, Route } from "react-router-dom";
import Login from './pages/auth/Login';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Register from './pages/auth/Register';
import Products from './pages/seller/Products';
import SellerOrders from './pages/seller/Order';
import CustomerOrders from './pages/customer/Order';
import CustomerProducts from './pages/customer/Products';
import ProductDetails from './pages/customer/ProductDetails';
import Wishlist from './pages/customer/Wishlist';
import Cart from './pages/customer/Cart';
import Checkout from './pages/customer/Checkout';
import Payment from './pages/customer/Payment';
import OrderSuccess from './pages/customer/OrderSuccess';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/login' replace />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />

      <Route element={<ProtectedRoute allowedRoles={['buyer']} />}>
        <Route path='/customer/CustomerProducts' element={<CustomerProducts />} />
        <Route path='/customer/orders' element={<CustomerOrders />} />
        <Route path='/customer/product/:productId' element={<ProductDetails />} />
        <Route path='/customer/Wishlist' element={<Wishlist />} />
        <Route path='/customer/cart' element={<Cart/>} />
        <Route path='/customer/checkout' element={<Checkout/>} />
        <Route path='/customer/payment' element={<Payment/>} />
        <Route path='/customer/order-success' element={<OrderSuccess/>} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={['seller']} />}>
        <Route path='/seller/dashboard' element={<SellerDashboard />} />
        <Route path='/seller/products' element={<Products />} />
        <Route path='/seller/orders' element={<SellerOrders />} />
      </Route>
    </Routes>
  );
};

export default App;