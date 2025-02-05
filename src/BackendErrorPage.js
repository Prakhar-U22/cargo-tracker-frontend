import React from 'react';

const BackendErrorPage = () => {
  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', textAlign: 'center'
    }}>
      <h1>Backend is taking time to connect with the frontend. Please wait...</h1>
    </div>
  );
};

export default BackendErrorPage;
