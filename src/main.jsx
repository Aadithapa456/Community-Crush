import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from "@/App.jsx";
import {BrowserRouter} from "react-router-dom";
import {ModalProvider} from "@/Context/ModalContext.jsx";
import {GoogleMapsProvider} from "@/Context/GoogleMapsProvider.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <GoogleMapsProvider>
                <ModalProvider>
                    <App/>
                </ModalProvider>
            </GoogleMapsProvider>
        </BrowserRouter>
    </StrictMode>,
)
