import SellerDashboard from './pages/seller/SellerDashboard';
import { Navigate, Routes, Route } from "react-router-dom"
import Login from './pages/auth/Login';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Register from './pages/auth/Register';


const App = () => {
  return (
   <Routes>
  <Route path='/' element={<Navigate to='/login' replace />} />
   <Route path='/login' element={<Login/>}/>
   <Route path='/register' element={<Register/>}/>
   <Route element={<ProtectedRoute/>}>
  <Route path='/seller/dashboard' element={<SellerDashboard/>}/>
  </Route>
   </Routes>
  )
}

export default App;