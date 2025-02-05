import React, { useState } from 'react';
import { GoogleMap, Marker, useLoadScript, Autocomplete } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '500px',
};

const defaultCenter = { lat: 51.505, lng: -0.09 }; // Default location

const ShipmentMap = ({ currentLocation }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places'], // Enables Places API for searchF
  });

  const [selectedLocation, setSelectedLocation] = useState(defaultCenter);
  const [autocomplete, setAutocomplete] = useState(null);

  // Convert currentLocation (string) to coordinates
  const coordinates = currentLocation
    ? currentLocation.split(',').map(Number)
    : null;

  // Set center to currentLocation if available
  const center = coordinates
    ? { lat: coordinates[0], lng: coordinates[1] }
    : selectedLocation;

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        setSelectedLocation({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
      }
    }
  };

  if (loadError) {
    console.error('Google Maps Load Error:', loadError);
    return <div>Error loading maps. Check console for details.</div>;
  }
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <div className="map-container">
      {/* Search Bar */}
      <Autocomplete onLoad={setAutocomplete} onPlaceChanged={onPlaceChanged}>
        <input
          type="text"
          placeholder="Search a location..."
          style={{
            width: '300px',
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
        />
      </Autocomplete>

      {/* Google Map */}
      <GoogleMap mapContainerStyle={mapContainerStyle} zoom={12} center={center}>
        <Marker position={center} />
      </GoogleMap>
    </div>
  );
};

export default ShipmentMap;
