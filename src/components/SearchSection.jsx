import React from 'react';

const SearchSection = () => {
    return (
        <div
            className="search-event-wrapper bg-gradient-to-r from-blue-600 to-indigo-700 opacity-90 py-8 flex flex-col text-white">
            <div className="search-event max-w-3xl px-14">
                <div className="search-title text-2xl font-bold py-4">
                    Find Events That Matter
                </div>
                <div className="search-event-input">
                    <input type="text" placeholder="Search for events" className="py-2 px-4 w-full"/>
                </div>
            </div>
        </div>
    );
};

export default SearchSection;