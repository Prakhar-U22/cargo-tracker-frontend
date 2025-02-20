import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const ShipmentForm = ({ onShipmentAdded }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    shipmentId: '',
    containerId: '',
    route: '',
    currentLocation: '',
    eta: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // "https://cargo-tracker-backend-qjit.onrender.com/shipments"
      // const response = await fetch('/api/shipments', {
        const response = await fetch('https://cargo-tracker-backend-qjit.onrender.com/api/shipments' || 'https://localhost:5001/api/shipments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to create shipment');

      setMessage('Shipment created successfully! Redirecting...');
      onShipmentAdded();
      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error creating shipment. Please try again.');
    }
  };

  return (
    <div style={{ padding: '20px', borderRadius: '8px' }}>
      <form onSubmit={handleSubmit}>
        <input type="text" name="shipmentId" placeholder="Shipment ID" value={formData.shipmentId} onChange={handleChange} required />
        <input type="text" name="containerId" placeholder="Container ID" value={formData.containerId} onChange={handleChange} required />
        <input type="text" name="route" placeholder="Route (comma-separated)" value={formData.route} onChange={handleChange} required />
        <input type="text" name="currentLocation" placeholder="Current Location (lat,lng)" value={formData.currentLocation} onChange={handleChange} required />
        <input type="datetime-local" name="eta" value={formData.eta} onChange={handleChange} required />
        <button type="submit">Create Shipment</button>
      </form>
      {message && <div style={{ marginTop: '10px', color: message.includes('Error') ? 'red' : 'green' }}>{message}</div>}
    </div>
  );
};

export default ShipmentForm;
