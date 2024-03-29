import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductListPage from './pages/ProductListPage';
import Login from './pages/Log'; // This should point to the correct file

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/login" element={<Login />} /> {/* Corrected route for login */}
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
