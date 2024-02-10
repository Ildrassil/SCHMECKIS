import * as React from 'react';
import {Rezept} from '../models/Rezept.tsx';
import {useNavigate} from "react-router-dom";


type RezeptProps = {
    rezept: Rezept
}

export default function RezeptCard({rezept}: RezeptProps) {
    const navigate = useNavigate();

    function openDetails() {
        navigate("/rezept/" + rezept.id);
    }
    return (
        <div className="bg-offWhite rounded-xl shadow-doubleOut p-4 m-2 border-transparent">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">{rezept.rezeptName}</h2>
                <button className="bg-gray-200 rounded-full p-2" onClick={openDetails}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                         className="h-6 w-6 text-textPrime">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                </button>
            </div>
            <img className="w-50 border-transparent shadow-doubleIn object-cover mt-2 mb-2 rounded"
                 src={rezept.rezeptImageUrl} alt={rezept.rezeptName}/>
            <p className="text-textPrime mt-8">{rezept.rezeptKurzbeschreibung}</p>
            <div className="flex mt-4">
                {rezept.kategorieList.map(kategorie => (
                    <button key={kategorie.kategorieName}
                            className="flex-row shadow-hashtagbutton overflow-clip bg-offWhite rounded-full px-3 text-sm font-semibold text-textPrime mr-2 mb-2 p-1">#{kategorie.kategorieName}</button>
                ))}
            </div>
        </div>

    );
}
