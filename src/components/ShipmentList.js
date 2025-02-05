import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ShipmentList = () => {
  const [shipments, setShipments] = useState([]);
  const [backendLoading, setBackendLoading] = useState(true);
  const [backendError, setBackendError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // fetch('/api/shipments')
    fetch('https://cargo-tracker-backend-qjit.onrender.com/api/shipments')
      .then(response => response.json())
      .then(data => {
        setShipments(data);
        setBackendLoading(false);
      })
      .catch(error => {
        console.error('Error fetching shipments:', error);
        setBackendError(true);
        setBackendLoading(false);
        navigate('/backend-error'); // Navigate to error page
      });
  }, []);

  if (backendLoading) {
    return <p>Loading...</p>;
  }

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
              <td>{shipment.currentLocation}</td>
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
