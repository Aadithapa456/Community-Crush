import {useJsApiLoader} from "@react-google-maps/api";
import {createContext} from "react";

export const GoogleMapsContext = createContext();

export const GoogleMapsProvider = ({children}) => {
    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
        libraries:["places"],
    });

    return (
        <GoogleMapsContext.Provider value={{isLoaded}}>
            {children}
        </GoogleMapsContext.Provider>
    );
};

