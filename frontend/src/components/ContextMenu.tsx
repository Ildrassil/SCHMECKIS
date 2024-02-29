import * as React from 'react';
import {useContextMenu} from './useContextMenu';
import {Link} from "react-router-dom";


type Props = {
    items: Array<string>;

};

const ContextMenu = ({items}: Props) => {
    const {anchorPoint, isShown} = useContextMenu();

    if (!isShown) {
        return null;
    }


    return (
        <ul
            className="flex-col bg-white border border-gray-200 absolute z-10 w-32 shadow-lg rounded-lg p-3
            text-lg font-semibold text-textHeader text-center"
            style={{top: anchorPoint.y, left: anchorPoint.x}}
        >
            {items.map((item) => (
                <li key={item}><Link to={"/admin/login"}>{item}</Link></li>
            ))}
        </ul>
    );
};

export {ContextMenu};