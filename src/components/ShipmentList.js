import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ShipmentList = () => {
  const [shipments, setShipments] = useState([]);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    fetch('/api/shipments')
      .then(response => response.json())
      .then(data => setShipments(data))
      .catch(error => console.error('Error fetching shipments:', error));
  }, []);

  // Function to handle location click
  const handleLocationClick = (location) => {
    if (location) {
      navigate(`/map?location=${encodeURIComponent(location)}`);
    }
  };

  return (
    <div>
      <h1>Shipments</h1>
      <table>
        <thead>
          <tr>
            <th>Shipment ID</th>
            <th>Container ID</th>
            <th>Current Location</th>
            <th>Status</th>
            <th>ETA</th>
          </tr>
        </thead>
        <tbody>
          {shipments.map(shipment => (
            <tr key={shipment._id}>
              <td>{shipment.shipmentId}</td>
              <td>{shipment.containerId}</td>
              <td>
                <button 
                  onClick={() => handleLocationClick(shipment.currentLocation)} 
                  style={{ background: 'none', border: 'none', color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
                >
                  {shipment.currentLocation}
                </button>
              </td>
              <td>{shipment.status}</td>
              <td>{new Date(shipment.eta).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShipmentList;
