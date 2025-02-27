import React from 'react';
import Header from "@/components/Header.jsx";
import SearchSection from "@/components/SearchSection.jsx";
import SocialEventsApp from "@/components/SocialEventsApp.jsx";
import {Routes, Route} from "react-router-dom";
import {Home} from "lucide-react";
import SideBar from "@/components/SideBar.jsx";
// import EventCard from "@/components/EventCard.jsx";

const App = () => {
    return (
        // <div className="flex flex-col">
        //     <Header/>
        //     <SearchSection/>
        // </div>
        <Routes>
            <Route path="/test" element={<SocialEventsApp/>}/>
            <Route path="/main" element={<SideBar/>}/>
        </Routes>
    );
};

export default App;