import React from 'react';

const SearchSection = () => {
    return (
        <div
            className="search-event-wrapper bg-gradient-to-r from-blue-600 to-indigo-700 opacity-90 py-14 flex flex-col">
            <div className="search-event max-w-3xl mx-auto w-full px-14">
                <div className="search-title text-3xl font-bold py-4 text-white">
                    Find Events That Matter
                </div>
                <div className="search-event-input">
                    <input type="text" placeholder="Search for events"
                           className="py-3 px-4 w-full rounded-[6px] border border-transparent focus:outline-none"/>
                </div>
            </div>
        </div>
    );
};

export default SearchSection;