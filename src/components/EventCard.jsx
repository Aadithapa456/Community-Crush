import React from 'react';
import {ArrowRightIcon, CalendarIcon, MapPin, PersonStandingIcon} from "lucide-react";

const EventCard = () => {
    return (
        <div className="event-card bg-white max-w-sm rounded-lg shadow-md">
            <div className="card-header">
                <img src="https://placehold.co/600x400/png" alt=""/>
            </div>
            <div className="card-content flex flex-col px-4 py-2 gap-6 mt-4">
                <div className="card-meta flex gap-4 items-center">
                    <div className="card-label bg-blue-200 text-blue-600 rounded-full px-4 py-1 text-xs">
                        Green Earth
                    </div>
                    <div className="card-people flex gap-2 items-center">
                        <PersonStandingIcon/>
                        <span>24</span>
                    </div>
                </div>
                <div className="card-title text-xl font-bold">
                    Community Cleanup Dive
                </div>
                <div className="card-description text-gray-600 text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit, unde.
                </div>
                <div className="card-details flex gap-4">
                    <div className="card-date flex gap-2 items-center">
                        <CalendarIcon size={20} className="text-blue-600"/>
                        <span>3/1/2024</span>
                    </div>
                    <div className="card-location flex gap-2 items-center">
                        <MapPin size={20} className="text-blue-600"/>
                        <span>Biratnagar</span>
                    </div>
                </div>
            </div>
            <div className="card-footer mb-10 mx-4 py-4">
                <button
                    className="flex gap-2 justify-center items-center border border-gray-200 w-full rounded-xl hover:border-blue-200 hover:text-blue-600 transition duration-300 py-2">
                    View Details
                    <ArrowRightIcon size={20}/>
                </button>
            </div>
        </div>
    )
        ;
};

export default EventCard;