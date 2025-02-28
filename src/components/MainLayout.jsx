import React from 'react';
import SideBar from "@/components/SideBar.jsx";
import {Outlet} from "react-router-dom";


const MainLayout = () => {
    return (
        <div className="flex">
            <SideBar/>
            <div className="flex-1 ml-64">
                <Outlet/>
            </div>
        </div>
    );
};

export default MainLayout;