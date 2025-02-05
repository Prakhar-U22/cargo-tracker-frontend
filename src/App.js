import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShipmentList from './components/ShipmentList';
import ShipmentForm from './components/ShipmentForm';
import ShipmentMap from './components/ShipmentMap';
// import Home from './components/Home.js';

const App = () => {
  return (

    // <Router>
      <div>
        <h1>Cargo Shipment Tracker</h1>
            <ShipmentForm />
            <ShipmentMap />
            <ShipmentList />
        {/* <Routes> */}
          {/* <Route path="/" element={<Home />} /> */}
          {/* <Route path="/add-shipment" element={<ShipmentForm />} />
          <Route path="/map" element={<ShipmentMap />} />
          <Route path="/shipments" element={<ShipmentList />} /> */}
        {/* </Routes> */}
      </div>
    // </Router>
  );
};

export default App;
