import React from 'react';
import {GoogleMap, Marker, useJsApiLoader} from '@react-google-maps/api';

const mapContainerStyle = {
    width: '100%',
    height: '100vh',
};

const center = {
    lat: 27.7172, // Kathmandu, Nepal
    lng: 85.3240,
};

function App() {
    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    })
    if (!isLoaded) return <div>Loading...</div>;
    return (
        <>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={8}
                center={center}
            >
                <Marker position={center}/>
            </GoogleMap>
        </>
    );
}

export default App;