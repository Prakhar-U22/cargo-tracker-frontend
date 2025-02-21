import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Autocomplete } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '500px',
};

const defaultCenter = { lat: 51.505, lng: -0.09 }; // Default location

// Moved outside component to avoid performance warning
const libraries = ['places'];

const ShipmentMap = ({ currentLocation }) => {
  // Load Google Maps Script
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  });

  const [selectedLocation, setSelectedLocation] = useState(defaultCenter);
  const [autocomplete, setAutocomplete] = useState(null);

  // Convert currentLocation (string) to coordinates
  useEffect(() => {
    if (currentLocation) {
      const coordinates = currentLocation.split(',').map(Number);
      if (coordinates.length === 2) {
        setSelectedLocation({ lat: coordinates[0], lng: coordinates[1] });
      }
    }
  }, [currentLocation]);

  // Handle place selection from Autocomplete
  const onPlaceChanged = useCallback(() => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        setSelectedLocation({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
      }
    }
  }, [autocomplete]);

  // Handle loading of Autocomplete instance
  const onAutocompleteLoad = useCallback((autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
  }, []);

  if (loadError) {
    console.error('Google Maps Load Error:', loadError);
    return <div>Error loading maps. Check console for details.</div>;
  }

  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <div className="map-container">
      {/* Search Bar */}
      <Autocomplete onLoad={onAutocompleteLoad} onPlaceChanged={onPlaceChanged}>
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
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={selectedLocation}
        options={{
          gestureHandling: 'greedy',
          disableDefaultUI: true,
        }}
      >
        {/* Using AdvancedMarkerElement to replace Marker */}
        <div
          className="marker"
          style={{
            position: 'absolute',
            transform: 'translate(-50%, -100%)',
            backgroundColor: 'red',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
          }}
          lat={selectedLocation.lat}
          lng={selectedLocation.lng}
        />
      </GoogleMap>
    </div>
  );
};

export default ShipmentMap;
