import * as React from 'react';
import {Rezept} from '../models/Rezept.tsx';
import {useNavigate} from "react-router-dom";
import {MdInfoOutline} from 'react-icons/md';
import {generateHTML} from "@tiptap/react";
import {Color} from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import ListItem from "@tiptap/extension-list-item";
import StarterKit from "@tiptap/starter-kit";
import TipTapRender from "../utilTiptap/TipTapRender.tsx";


type RezeptProps = {
    rezept: Rezept
}

export default function RezeptCard({rezept}: RezeptProps) {

    const navigate = useNavigate();

    const outputHTML = generateHTML(JSON.parse(rezept.rezeptKurzbeschreibung), [

            Color.configure({types: [TextStyle.name, ListItem.name]}),
            TextStyle.configure({types: [ListItem.name]}),
            StarterKit.configure({
                bulletList: {
                    keepMarks: true,
                    keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
                },
                orderedList: {
                    keepMarks: true,
                    keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
                },
            }),
        ],
    );

    function openDetails() {
        navigate("/rezept/" + rezept.id);
    }

    return (
        <div className="bg-offWhite rounded-xl shadow-doubleOut p-10 m-2 border-none hover:shadow-doubleIn">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-center justify-center text-textHeader ml-4">{rezept.rezeptName}</h2>
                <button className="bg-offWhite hover:shadow-buttonIn
                                   rounded-full p-2 w-auto"
                        onClick={openDetails}>
                    <MdInfoOutline size="30" color="#646464"/>
                </button>
            </div>
            <img className="w-50 border-transparent shadow-doubleIn object-cover mt-2 mb-2 rounded"
                 src={rezept.rezeptImageUrl} alt={rezept.rezeptName}/>
            <TipTapRender content={outputHTML}/>
            <div className="flex mt-4">
                {rezept.kategorieList.map(kategorie => (
                    <button key={kategorie.kategorieName}
                            onClick={() => navigate("/kategorie/" + kategorie.kategorieName)}
                            className="flex-row shadow-hashtagbutton active:shadow-hashtagbutton hover:shadow-hashtagbuttonOut
                             bg-offWhite rounded-full px-6 py-1.5 text-m font-semibold text-textPrime mr-2 mb-2 ">
                        #{kategorie.kategorieName.toUpperCase()}
                    </button>
                ))}
            </div>
        </div>
    );
}
