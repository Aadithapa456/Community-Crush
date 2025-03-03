// import React, {useState} from 'react';
import {useForm} from "react-hook-form";

function MapForm({onFormSubmit}) {
    const {register, handleSubmit} = useForm();
    const onSubmit = (data) => {
        onFormSubmit(data)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}
              className="absolute bottom-4 w-3/4 justify-between left-1/2 transform -translate-x-1/2 flex gap-10 bg-blue-100 shadow-xl p-4 rounded-lg shadow-lg">
            <div className="form-field">
                <label htmlFor="lat" className="block text-sm font-semibold text-blue-700 mb-1"></label>
                <input type="text" id="lat" placeholder="Enter latitude" {...register("lat", {required: true})}
                       className="py-4 px-2 focus:border-0 border border-gray-200 rounded"/>
            </div>
            <div className="form-field">
                <label htmlFor="long" className="block text-sm font-semibold text-blue-700 mb-1"></label>
                <input type="text" id="long" placeholder="Enter latitude" {...register("long", {required: true})}
                       className="py-4 px-2 focus:border-0 border border-gray-200 rounded "/>
            </div>
            <button type="submit"
                    className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300">Submit
                now
            </button>
        </form>
    );
}

export default MapForm;