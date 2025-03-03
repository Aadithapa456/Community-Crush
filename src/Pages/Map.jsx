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
import {useContext, useEffect, useState} from "react";
import {getEvents} from "@/Helpers/LocalStorage.js";
import {GoogleMapsContext} from "@/Context/GoogleMapsProvider.jsx";

const mapContainerStyle = {
    width: '100%',
    height: '100vh',
};

function Map() {
    const {isLoaded} = useContext(GoogleMapsContext);
    const [mapCoords, setMapCoords] = useState([{lat: 27.7172, lng: 85.3240}, {lat: 27.6588, lng: 85.3247}]);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [direction, setDirection] = useState(null)
    const [userPosition, setUserPosition] = useState({lat: null, lng: null});
    const [markerAddress, setMarkerAddress] = useState(null)
    useEffect(() => {
        if (!isLoaded) return;
        eventMarkers();
        // Listening to changes in LocalStorage
        const handleStorageChange = (event) => {
            if (event.key === "events") {
                eventMarkers();
            }
        };
        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, [isLoaded]);
    if (!isLoaded) return <div>Loading....</div>;
    const geocoder = new google.maps.Geocoder();
    const markerIcon = {
        url: 'src/assets/pin.png',
        scaledSize: new window.google.maps.Size(50, 50),
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(25, 50),
    }
    const eventMarkers = async () => {
        const events = getEvents();
        const locations = events.map((item) => item.location);
        try {
            const geoCodedCoords = await Promise.all(locations.map(async (location) => {
                try {
                    return await geoCodeAddress(location);
                } catch (e) {
                    console.error(e);
                    return null;
                }
            }))
            setMapCoords(geoCodedCoords.filter(coord => coord !== null));
        } catch (e) {
            console.error(e);
        }
    }
    const geoCodeAddress = async (address) => {
        return new Promise((resolve, reject) => {

            geocoder.geocode({address}, (result, status) => {
                if (status === "OK" && result) {
                    const location = result[0].geometry.location;
                    resolve({lat: location.lat(), lng: location.lng()});
                } else {
                    reject("Gecoding API Failed")
                }
            })
        })
    }
    const geocodeMarker = (coord) => {
        geocoder.geocode({location: coord}, (results, status) => {
            if (status === google.maps.GeocoderStatus.OK) {
                setMarkerAddress(results[0].formatted_address);
            } else {
                setMarkerAddress("Not found");
            }
        })
    }
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
                        geocodeMarker(coord);
                    }}>
                        {selectedMarker === coord ? (
                            <InfoWindow position={coord} onCloseClick={() => setSelectedMarker(null)}>
                                <p>{markerAddress}</p>
                            </InfoWindow>
                        ) : null}
                    </Marker>
                ))
                }

                {direction && <DirectionsRenderer directions={direction}/>}
            </GoogleMap>
            {/*<div>*/}
            {/*    <MapForm onFormSubmit={handleFormSubmit}/>*/}
            {/*    <button onClick={fetchDirections} className="bg-blue-500 text-white px-4 py-2 mt-2">Show Directions*/}
            {/*    </button>*/}
            {/*</div>*/}
        </div>
    )
        ;
}

export default Map;