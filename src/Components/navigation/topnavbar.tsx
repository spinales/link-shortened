"use client";

import React from 'react';
import Sidebar from "@/Components/navigation/sidebar";
import Userbar from "@/Components/navigation/userbar";

const Navbar = () => {

    return (
        <nav className="flex flex-row">
            <Sidebar />
            <div className="basis-5/6 bg-gray-100">
                <Userbar />
            </div>
        </nav>
    );
};

export default Navbar;