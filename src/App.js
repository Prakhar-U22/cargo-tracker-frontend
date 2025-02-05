import React from 'react';
import ShipmentList from './components/ShipmentList';
import ShipmentForm from './components/ShipmentForm';
import ShipmentMap from './components/ShipmentMap';

const App = () => {
  return (
      <div>
        <h1>Cargo Shipment Tracker</h1>
            <ShipmentForm onShipmentAdded={() => console.log('Shipment added!')}/>
            <ShipmentMap />
            <ShipmentList />
      </div>
  );
};

export default App;
