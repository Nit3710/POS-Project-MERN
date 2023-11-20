import "antd/dist/reset.css";
import Homepage from "./pages/Homepage";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Itempage from "./pages/Itempage";
import Cartpage from './pages/Cartpage';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Billspage from "./pages/Billspage";
import Customerpage from "./pages/Customerpage";
function App() {
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <Homepage />
            </ProtectedRoute>
          } />
          <Route path="/items" element={
            <ProtectedRoute>
              <Itempage />
            </ProtectedRoute>
          } />
          <Route path="/cart" element={
            <ProtectedRoute>
              <Cartpage />
            </ProtectedRoute>
          } />
          <Route path="/bills" element={
            <ProtectedRoute>
              <Billspage />
            </ProtectedRoute>
          } />
          <Route path="/customers" element={
            <ProtectedRoute>
              <Customerpage />
            </ProtectedRoute>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>

  );
}

export default App;
export function ProtectedRoute({ children }) {
  if (localStorage.getItem('auth')) {
    return children
  }
  else {
    return <Navigate to="/login" />
  }
}
