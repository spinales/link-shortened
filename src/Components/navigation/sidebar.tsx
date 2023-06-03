import React from 'react';
import '@/app/globals.css';
import {BadgeHelpIcon, Book} from "lucide-react";

const Sidebar = () => {
    // poner que los botones aparezcan dependiendo del rol
    return (
        <div className="basis-1/6 bg-gray-700 h-screen">
                 <span className="flex items-center px-4 py-2 font-medium border-b-2 border-b-palette-accent mx-auto">
                     <Book className="mr-2 w-8 h-8 text-palette-primary"/>
                     <span className="bg-gradient-to-r from-palette-primary to-palette-accent text-transparent bg-clip-text text-3xl">Skool</span>
                 </span>
            <div className="flex justify-center items-center">
                <BadgeHelpIcon />
                <p></p>
            </div>
        </div>
    );
};

export default Sidebar;
