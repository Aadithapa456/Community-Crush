import React from 'react';
import SocialEventsApp from "@/components/SocialEventsApp.jsx";
import {Routes, Route} from "react-router-dom";
import MainLayout from "@/components/MainLayout.jsx";
import Home from "@/Pages/Home.jsx";
// import EventCard from "@/components/EventCard.jsx";

const App = () => {
    return (
        // <div className="flex flex-col">
        //     <Header/>
        //     <SearchSection/>
        // </div>
        <Routes>
            <Route path="/test" element={<SocialEventsApp/>}/>
            <Route path="/" element={<MainLayout/>}>
                <Route path="/teas" element={<Home/>}/>
            </Route>
        </Routes>
    );
};

export default App;