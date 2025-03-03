import React, {useContext, useState} from 'react';
import {CalendarIcon, HeartIcon, MapPinIcon, PersonStandingIcon} from "lucide-react";
import {Link, useNavigate} from "react-router-dom";
import {ModalContext} from "@/Context/ModalContext.jsx";

const sidebarItems = [
    {icon: CalendarIcon, path: "/discover", label: "Discover"},
    {icon: MapPinIcon, path: "/live-map", label: "Live Map"},
    {icon: PersonStandingIcon, path: "/my-events", label: "My Events"},
    {icon: HeartIcon, path: "/saved", label: "Saved"},
]
const iconSize = 20
const SideBar = () => {
    const [active, setActive] = useState("Discover");
    const navigate = useNavigate();
    const {openModal} = useContext(ModalContext);
    return (
        <aside className="w-64 px-4 fixed flex flex-col gap-20 bg-white h-full py-10 shadow-xl">
            <div className="sidebar-header">
                <div className="sidebar-title text-xl font-bold text-blue-600">
                    Community Crush
                </div>
                <div className="sidebar-description text-xs text-gray-600 mt-2">
                    Lorem adipisicing elit akde
                </div>
            </div>
            <div className="sidebar-contents flex flex-col gap-4 flex-1">
                {sidebarItems.map((item, index) => (
                    <Link to={item.path} key={index}
                          className={`flex gap-2 items-center py-2.5 px-4 rounded-xs ${item.label === active ? "bg-blue-100" : "hover:bg-gray-100"}`}
                          onClick={() => setActive(item.label)}
                    >
                        <item.icon size={iconSize}/>
                        <span>
                        {item.label}
                    </span>
                    </Link>
                ))}
            </div>
            <div className="create-event px-4">
                <button
                    className="bg-blue-500 text-white px-4 py-2 w-full rounded-[6px] hover:bg-blue-600 transition duration-300"
                    onClick={openModal}>
                    Create Event +
                </button>
            </div>
        </aside>);
};

export default SideBar;