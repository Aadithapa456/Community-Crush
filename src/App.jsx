// import React from 'react';
import {GoogleMap, Marker, useJsApiLoader, Circle, InfoWindow} from '@react-google-maps/api';
import MapForm from "@/components/MapForm.jsx";
import {useState} from "react";

const mapContainerStyle = {
    width: '100%',
    height: '100vh',
};
const center = {
    lat: 27.7172, // Kathmandu, Nepal
    lng: 85.3240,
};
// const circleOptions = {
//     strokeColor: '#ffffff',
//     strokeOpacity: 0.8,
//     strokeWeight: 2,
//     fillColor: '#ffffff',
//     fillOpacity: 0.35,
//     clickable: false,
//     draggable: false,
//     editable: false,
//     visible: true,
//     radius: 3000,
//     center: center,
// };

function App() {
    const [mapCoords, setMapCoords] = useState([{lat: 27.7172, lng: 85.3240}, {lat: 27.6588, lng: 85.3247}]);
    const [viewMarkerInfo, setViewMarkerInfo] = useState(false);
    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    })
    if (!isLoaded) return <div>Loading...</div>;
    const markerIcon = {
        url: 'src/assets/pin.png',
        scaledSize: new window.google.maps.Size(50, 50),
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(25, 50),
    }
    const handleFormSubmit = (data) => {
        setMapCoords((prevCoords) => [...prevCoords, {lat: parseFloat(data.lat), lng: parseFloat(data.long)}])
    };
    console.log(mapCoords);
    return (
        <div className="relative">
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={8}
                center={mapCoords[0]}
            >
                <Circle options={{center: mapCoords[0]}}/>
                {mapCoords.map((coord, index) => (

                    <Marker position={coord} icon={markerIcon} key={index} onClick={() => setViewMarkerInfo(true)}>
                        {viewMarkerInfo &&
                            <InfoWindow position={coord} onCloseClick={() => setViewMarkerInfo(false)}>
                            <p>Hello I am here in {coord.lng}</p>
                    </InfoWindow>}
            </Marker>
            ))
            }
        </GoogleMap>
    <div>
        <MapForm onFormSubmit={handleFormSubmit}/>
    </div>
</div>
)
    ;
}

export default App;