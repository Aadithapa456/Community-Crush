import React, {useContext, useState} from 'react';
import {X} from "lucide-react";
import {ModalContext} from "@/Context/ModalContext.jsx";
import {useForm} from "react-hook-form";
import {saveEvent} from "@/Helpers/LocalStorage.js";
import {v4} from "uuid";
import {useJsApiLoader, Autocomplete} from "@react-google-maps/api";
import {GoogleMapsContext} from "@/Context/GoogleMapsProvider.jsx";

const EventModal = () => {
    const {isLoaded} = useContext(GoogleMapsContext);

    const {closeModal} = useContext(ModalContext);
    const {register, handleSubmit} = useForm();
    const [autoComplete, setAutoComplete] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const onSubmit = (data) => {
        const eventWithId = {id: v4(), location: selectedLocation, ...data}
        saveEvent(eventWithId)
    }
    const handlePlaceSelect = () => {
        if (autoComplete) {
            const place = autoComplete.getPlace();
            if (place.geometry) {
                setSelectedLocation({
                    address: place.formatted_address || "",
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                });
            }
        }
    }
    if (!isLoaded) return <div>Loading...</div>;
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-30 backdrop-blur">
            <div className="modal-container bg-white rounded-[8px] overflow-hidden">
                <div
                    className="modal-header flex justify-between items-center bg-blue-500 py-4 px-6 text-white mb-8">
                    <div className="modal-header-title text-xl">Create Event</div>
                    <button className="modal-header-closer" onClick={closeModal}><X/></button>
                </div>
                <form action="" className="modal-form flex flex-col gap-6 px-6 mb-4"
                      onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group flex flex-col gap-1">
                        <label htmlFor="title">Event title</label>
                        <input type="text" placeholder="Describe the event" id="title" name="title"
                               className="p-2 outline-0 border border-gray-300 rounded-[6px]"
                               {...register('title', {required: true})}
                        />
                    </div>
                    <div className="form-group flex flex-col gap-1">
                        <label htmlFor="type">Event Type</label>
                        <select id="type" name="type"
                                className="p-2 outline-0 border border-gray-300 rounded-[6px]" {...register('type')}>
                            <option value="Cleanliness">Cleanliness Program</option>
                            <option value="Donation">Blood Donation</option>
                            <option value="Service">Community Service</option>
                            <option value="Education">Education</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="date-location-group flex justify-between gap-6 items-center">
                        <div className="form-group flex flex-col gap-1">
                            <label htmlFor="date">Event Date</label>
                            <input type="date" id="date" name="date"
                                   className="p-2 outline-0 border border-gray-300 rounded-[6px]"
                                   {...register('date')}
                            />
                        </div>
                        <div className="form-group flex flex-col gap-1">
                            <label htmlFor="location">Event title</label>
                            <Autocomplete onLoad={setAutoComplete}
                                          onPlaceChanged={handlePlaceSelect}>
                                <input
                                    type="text"
                                    id="location"
                                    placeholder="Search location..."
                                    className="p-2 outline-0 border border-gray-300 rounded-[6px]"
                                    {...register("location")}
                                />
                            </Autocomplete>
                        </div>
                    </div>
                    <div className="form-group flex flex-col gap-1">
                        <label htmlFor="description">Event Date</label>
                        <textarea placeholder="Event Date" id="description" name="description"
                                  className="p-2 outline-0 border border-gray-300 rounded-[6px]"
                                  {...register('description')}
                        />
                    </div>
                    <button type="Submit"
                            className="w-full bg-blue-400 text-white rounded-[6px] py-3 hover:bg-blue-500 transition duration-300">Submit
                        Now
                    </button>
                </form>
                <div className="modal-footer"></div>
            </div>
        </div>
    );
};

export default EventModal;