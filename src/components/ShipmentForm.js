import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ShipmentForm = ({ onShipmentAdded }) => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [formData, setFormData] = useState({
    shipmentId: '',
    containerId: '',
    route: '',
    currentLocation: '',
    eta: '',
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/shipment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Shipment created:', data);
        setIsSuccess(true);
        onShipmentAdded();

        // Redirect to home page after 2 seconds
        setTimeout(() => {
          navigate('/');
        }, 2000);
      })
      .catch(error => {
        console.error('Error creating shipment:', error);
        setIsError(true);
      });
  };

  return (
    <div style={{ backgroundImage: 'url(/path/to/background-image.jpg)', backgroundSize: 'cover', padding: '20px', borderRadius: '8px' }}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Shipment ID"
          value={formData.shipmentId}
          onChange={(e) => setFormData({ ...formData, shipmentId: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Container ID"
          value={formData.containerId}
          onChange={(e) => setFormData({ ...formData, containerId: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Route (comma-separated)"
          value={formData.route}
          onChange={(e) => setFormData({ ...formData, route: e.target.value.split(',') })}
          required
        />
        <input
          type="text"
          placeholder="Current Location (lat,lng)"
          value={formData.currentLocation}
          onChange={(e) => setFormData({ ...formData, currentLocation: e.target.value })}
          required
        />
        <input
          type="datetime-local"
          placeholder="ETA"
          value={formData.eta}
          onChange={(e) => setFormData({ ...formData, eta: e.target.value })}
          required
        />
        <button type="submit">Create Shipment</button>
      </form>

      {isSuccess && (
        <div style={{ marginTop: '10px', color: 'green' }}>
          Shipment created successfully! Redirecting...
        </div>
      )}

      {isError && (
        <div style={{ marginTop: '10px', color: 'red' }}>
          Error creating shipment. Please try again.
        </div>
      )}
    </div>
  );
};

export default ShipmentForm;
