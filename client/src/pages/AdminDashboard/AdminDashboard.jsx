import React, { useState } from 'react';
import './AdminDashboard.css';
import AddProductForm from '../../components/AddProductForm';
import ProductButton from '../../components/Button';

function AdminDashboard() {
  const [showForm, setShowForm] = useState(false);
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <ProductButton onClick={() => setShowForm(!showForm)}>
        Add New Product
      </ProductButton>
      {showForm && <AddProductForm />}
    </div>
  );
}

export default AdminDashboard;
