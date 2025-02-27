import React from 'react';
import {BellIcon, Menu} from "lucide-react";

const Header = () => {
    return (
        <header className="flex justify-between items-center">
            <div className="sidebar">
                <Menu/>
            </div>
            <div className="header-title">
                Community Crush
            </div>
            <div className="header-notification">
                <BellIcon/>
            </div>
        </header>
    );
};

export default Header;