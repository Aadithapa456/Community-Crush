// import React from 'react';
import {
    GoogleMap,
    Marker,
    useJsApiLoader,
    Circle,
    InfoWindow,
    DirectionsRenderer,
    DirectionsService
} from '@react-google-maps/api';
import MapForm from "@/components/MapForm.jsx";
import {useState} from "react";

const mapContainerStyle = {
    width: '100%',
    height: '100vh',
};

function Map() {
    const [mapCoords, setMapCoords] = useState([{lat: 27.7172, lng: 85.3240}, {lat: 27.6588, lng: 85.3247}]);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [direction, setDirection] = useState(null)
    const [userPosition, setUserPosition] = useState({lat: null, lng: null});
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
    console.log(selectedMarker);
    const fetchDirections = () => {
        if (!selectedMarker) {
            console.log("Please select a marker for directions.");
            return;
        }
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const {latitude, longitude} = position.coords;
                setUserPosition({lat: parseFloat(latitude), lng: parseFloat(longitude)})
            });
        }
        const directionService = new google.maps.DirectionsService();
        directionService.route({
            origin: userPosition,
            destination: selectedMarker,
            travelMode: google.maps.TravelMode.DRIVING,
        }, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                setDirection(result);
            } else {
                console.log(status);
            }
        })
    }
    return (
        <div className="relative">
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={8}
                center={mapCoords[0]}
            >
                <Circle options={{center: mapCoords[0]}}/>
                {mapCoords.map((coord, index) => (

                    <Marker position={coord} icon={markerIcon} key={index} onClick={() => {
                        setSelectedMarker(coord);
                    }}>
                        {selectedMarker === coord ? (
                            <InfoWindow position={coord} onCloseClick={() => setSelectedMarker(null)}>
                                <p>Hello I am here in {coord.lng}</p>
                            </InfoWindow>
                        ) : null}
                    </Marker>
                ))
                }

                {direction && <DirectionsRenderer directions={direction}/>}
            </GoogleMap>
            <div>
                <MapForm onFormSubmit={handleFormSubmit}/>
                <button onClick={fetchDirections} className="bg-blue-500 text-white px-4 py-2 mt-2">Show Directions
                </button>
            </div>
        </div>
    )
        ;
}

export default Map;