import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const ShipmentContext = createContext();

export const ShipmentProvider = ({ children }) => {
    const [shipments, setShipments] = useState([]);
    const [selectedShipment, setSelectedShipment] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch all shipments
    const fetchShipments = async () => {
        setLoading(true);
        try {
            // const response = await axios.get('/api/shipments');
            const response = await axios.get('https://cargo-tracker-backend-qjit.onrender.com/api/shipments'|| 'http://localhost:5001/api/shipments');
            setShipments(response.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Fetch a single shipment by ID
    const fetchShipmentById = async (id) => {
        setLoading(true);
        try {
            const response = await axios.post(`https://cargo-tracker-backend-qjit.onrender.com/api/shipment/${id}`);
            // const response = await axios.get(`/api/shipment/${id}`);
            setSelectedShipment(response.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Update shipment location
    const updateShipmentLocation = async (id, currentLocation) => {
        setLoading(true);
        try {
            // const response = await axios.post(`/api/shipment/${id}/update-location`, { currentLocation });
            const response = await axios.post(`https://cargo-tracker-backend-qjit.onrender.com/api/shipment/${id}/update-location`, { currentLocation });
            setSelectedShipment(response.data);
            fetchShipments(); // Refresh the list
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Create a new shipment
    const createShipment = async (shipmentData) => {
        setLoading(true);
        try {
            const response = await axios.post('https://cargo-tracker-backend-qjit.onrender.com/api/shipments', shipmentData);
            // const response = await axios.post('/api/shipment', shipmentData);
            setShipments([...shipments, response.data]);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ShipmentContext.Provider
            value={{
                shipments,
                selectedShipment,
                loading,
                error,
                fetchShipments,
                fetchShipmentById,
                updateShipmentLocation,
                createShipment,
            }}
        >
            {children}
        </ShipmentContext.Provider>
    );
};

export default ShipmentContext;