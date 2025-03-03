import React, {useContext} from 'react';
import {X} from "lucide-react";
import {ModalContext} from "@/Context/ModalContext.jsx";
import {useForm} from "react-hook-form";


const EventModal = () => {
    const {closeModal} = useContext(ModalContext);
    const {register, handleSubmit} = useForm();
    const onSubmit = (e) => {
        console.log(e)
    }
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-30 backdrop-blur">
            <div className="modal-container bg-white rounded-[8px] overflow-hidden">
                <div className="modal-header flex justify-between items-center bg-blue-500 py-4 px-6 text-white mb-8">
                    <div className="modal-header-title text-xl">Create Event</div>
                    <button className="modal-header-closer" onClick={closeModal}><X/></button>
                </div>
                <form action="" className="modal-form flex flex-col gap-6 px-6 mb-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group flex flex-col gap-1">
                        <label htmlFor="title">Event title</label>
                        <input type="text" placeholder="Describe the event" id="title" name="title"
                               className="p-2 outline-0 border border-gray-300 rounded-[6px]"
                               {...register('title')}
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
                            <input type="text" placeholder="Event Location" id="location" name="location"
                                   className="p-2 outline-0 border border-gray-300 rounded-[6px]"
                                   {...register('location')}
                            />
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