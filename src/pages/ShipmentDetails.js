// import React, { useContext, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import ShipmentContext from '../context/ShipmentContext';
// import ShipmentMap from '../components/ShipmentMap';

// const ShipmentDetails = () => {
//     const { id } = useParams();
//     const { selectedShipment, fetchShipmentById } = useContext(ShipmentContext);

//     useEffect(() => {
//         fetchShipmentById(id);
//     }, [fetchShipmentById, id]);

//     if (!selectedShipment) return <p>Loading...</p>;

//     return (
//         <div>
//             <h1>Shipment Details</h1>
//             <p>Shipment ID: {selectedShipment.shipmentId}</p>
//             <p>Container ID: {selectedShipment.containerId}</p>
//             <p>Current Location: {selectedShipment.currentLocation}</p>
//             <p>Status: {selectedShipment.status}</p>
//             <p>ETA: {new Date(selectedShipment.eta).toLocaleString()}</p>
//             <ShipmentMap currentLocation={selectedShipment.currentLocation} />
//         </div>
//     );
// };

// export default ShipmentDetails;