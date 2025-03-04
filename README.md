Here is a README guide for integrating the Google Maps functionality in your hackathon project:

---

# Google Maps Integration Guide

## Overview
This guide provides instructions on how to integrate Google Maps with markers, geolocation, and directions into your React application. The example below utilizes `@react-google-maps/api` for loading the map and rendering markers, circles, and directions.

### Features:
- Displaying a map with dynamic markers based on events.
- Geocoding event locations to show on the map.
- Fetching directions from the user’s location to a selected marker.

## Prerequisites
- React application setup.
- Google Maps API key. (You can obtain it from the [Google Cloud Console](https://console.cloud.google.com/))
- The following npm dependencies:
    - `@react-google-maps/api` for Google Maps integration.

### Install the necessary package:
```bash
npm install @react-google-maps/api
```

## Setup the Google Maps API Key
Create a `.env` file in the root directory of your project and add your API key:
```
REACT_APP_GOOGLE_MAPS_API_KEY=your-google-maps-api-key-here
```

In your `index.html`, add the Google Maps API script inside the `<head>` tag:
```html
<script src={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`} />
```

## Code Explanation

### Importing Dependencies
```jsx
import React, { useState, useEffect, useContext } from 'react';
import {
  GoogleMap,
  Marker,
  Circle,
  InfoWindow,
  DirectionsRenderer
} from '@react-google-maps/api';
import { getEvents } from "@/Helpers/LocalStorage.js";
import { GoogleMapsContext } from "@/Context/GoogleMapsProvider.jsx";
```

- **GoogleMap**: Displays the Google Map component.
- **Marker**: Represents locations on the map.
- **Circle**: Adds a circle around a specified location on the map.
- **InfoWindow**: Shows additional information when a marker is clicked.
- **DirectionsRenderer**: Displays the directions route on the map.

### State Management
```jsx
const [mapCoords, setMapCoords] = useState([{ lat: 27.7172, lng: 85.3240 }]); // Default location.
const [selectedMarker, setSelectedMarker] = useState(null);
const [direction, setDirection] = useState(null);
const [userPosition, setUserPosition] = useState({ lat: null, lng: null });
const [markerAddress, setMarkerAddress] = useState(null);
```

These states store the map coordinates, selected marker, user location, and direction data.

### Fetching Event Locations
The `eventMarkers` function gets event locations from `LocalStorage`, geocodes them, and sets them on the map:
```jsx
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
        }));
        setMapCoords(geoCodedCoords.filter(coord => coord !== null));
    } catch (e) {
        console.error(e);
    }
}
```

### Geocoding Locations
```jsx
const geoCodeAddress = async (address) => {
    return new Promise((resolve, reject) => {
        geocoder.geocode({ address }, (result, status) => {
            if (status === "OK" && result) {
                const location = result[0].geometry.location;
                resolve({ lat: location.lat(), lng: location.lng() });
            } else {
                reject("Geocoding API Failed");
            }
        });
    });
}
```
This function converts an address into latitude and longitude coordinates.

### Fetching Directions
The `fetchDirections` function calculates directions from the user's location to a selected marker:
```jsx
const fetchDirections = () => {
    if (!selectedMarker) {
        console.log("Please select a marker for directions.");
        return;
    }
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            setUserPosition({ lat: parseFloat(latitude), lng: parseFloat(longitude) });
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
    });
}
```

### Rendering the Map
The map is rendered with the following JSX:
```jsx
<GoogleMap
    mapContainerStyle={mapContainerStyle}
    zoom={8}
    center={mapCoords[0]}
>
    <Circle options={{ center: mapCoords[0] }} />
    {mapCoords.map((coord, index) => (
        <Marker
            position={coord}
            icon={markerIcon}
            key={index}
            onClick={() => {
                setSelectedMarker(coord);
                geocodeMarker(coord);
            }}
        >
            {selectedMarker === coord ? (
                <InfoWindow position={coord} onCloseClick={() => setSelectedMarker(null)}>
                    <p>{markerAddress}</p>
                </InfoWindow>
            ) : null}
        </Marker>
    ))}
    {direction && <DirectionsRenderer directions={direction} />}
</GoogleMap>
```

### Event Handlers
- `onClick` on the `Marker` sets the selected marker and fetches its address.
- `InfoWindow` shows the address of the selected marker.
- `DirectionsRenderer` renders directions from the user's location to the selected marker.

## Conclusion
This integration will allow you to add interactive maps with geolocation, event markers, and navigation directions to your hackathon project. Ensure you replace placeholders with your actual API key and adapt the components to fit your use case.