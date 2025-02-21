import React, { useEffect, useState } from 'react';

const ShipmentList = () => {
  const [shipments, setShipments] = useState([]);
  const [backendLoading, setBackendLoading] = useState(true);
  const [backendError, setBackendError] = useState(false);
  const [updatingShipmentId, setUpdatingShipmentId] = useState(null);
  const [newLocation, setNewLocation] = useState('');

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const response = await fetch(
          'https://cargo-tracker-backend-qjit.onrender.com/api/shipments'
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setShipments(data);
        setBackendLoading(false);
      } catch (error) {
        console.error('Error fetching shipments:', error);
        setBackendError(true);
        setBackendLoading(false);
      }
    };

    fetchShipments();
  }, []);

  const handleUpdateLocation = async (shipmentId) => {
    try {
      // Send the PATCH request
      const response = await fetch(`https://cargo-tracker-backend-qjit.onrender.com/api/shipment/${shipmentId}/update-location`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ currentLocation: newLocation })
      });
  
      // Check if the response is not OK
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }
  
      // If successful
      // alert('Location updated successfully!');
      setNewLocation('');
      setUpdatingShipmentId(null);
  
      // Refresh shipments
      const updatedShipments = await fetch(
        'https://cargo-tracker-backend-qjit.onrender.com/api/shipments'
      ).then(res => res.json());
      setShipments(updatedShipments);
  
    } catch (error) {
      console.error('Error updating location:', error);
      alert(`Failed to update location. Error: ${error.message}`);
    }
  };
  

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Shipments</h1>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Shipment ID</th>
            <th className="border p-2">Container ID</th>
            <th className="border p-2">Current Location</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">ETA</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {shipments.map((shipment) => (
            <tr key={shipment._id} className="hover:bg-gray-50">
              <td className="border p-2">{shipment.shipmentId}</td>
              <td className="border p-2">{shipment.containerId}</td>
              <td className="border p-2">{shipment.currentLocation}</td>
              <td className="border p-2">{shipment.status}</td>
              <td className="border p-2">
                {new Date(shipment.eta).toLocaleString()}
              </td>
              <td className="border p-2">
                {updatingShipmentId === shipment._id ? (
                  <div>
                    <input
                      type="text"
                      placeholder="New Location"
                      value={newLocation}
                      onChange={(e) => setNewLocation(e.target.value)}
                      className="border rounded-md p-1"
                    />
                    <button
                      onClick={() => handleUpdateLocation(shipment._id)}
                      className="bg-green-300 text-white rounded-md py-1 px-2 ml-2 hover:bg-green-300"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setUpdatingShipmentId(null)}
                      className="bg-gray-300 text-white rounded-md py-1 px-2 ml-2 hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setUpdatingShipmentId(shipment._id)}
                    className="bg-blue-300 text-white rounded-md py-1 px-3 hover:bg-blue-300"
                  >
                    Update Location
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShipmentList;
