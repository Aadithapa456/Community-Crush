import React, {useState} from 'react';
import Header from "@/components/Header.jsx";
import SearchSection from "@/components/SearchSection.jsx";
import EventCard from "@/components/EventCard.jsx";

const tabItems = ["Trending", "Upcoming", "For You", "Popular"];
const Home = () => {
    const [selectedTab, setSelectedTab] = useState("Trending");
    return (
        <>
            {/*<Header/>*/}
            <div className="main-content flex flex-col">
                <SearchSection/>
                <div className="tab-component bg-white shadow-sm py-2 px-6">
                    <ul className="flex justify-between">
                        {tabItems.map((tab, index) => (
                            <li key={index}
                                className={`py-2 px-4 ${tab === selectedTab ? "text-blue-500" : "text-black"}`}>
                                <button onClick={() => setSelectedTab(tab)}>
                                    {tab}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="card-container grid grid-cols-3 gap-x-10 gap-y-10 px-6 mt-10">
                    <EventCard/>
                    <EventCard/>
                    <EventCard/>
                    <EventCard/>
                </div>
            </div>
        </>
    );
};

export default Home;