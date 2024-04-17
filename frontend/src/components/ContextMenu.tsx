import * as React from 'react';
import {useContextMenu} from './useContextMenu';
import {Link} from "react-router-dom";


type Props = {
    items: Array<string>;
    loggedIn: boolean;

};

const ContextMenu = ({items, loggedIn}: Props) => {
    const {anchorPoint, isShown} = useContextMenu();

    if (!isShown) {
        return null;
    }

    function changeLogIn() {
        loggedIn = false;
    }


    return (
        <ul
            className="flex-col bg-white border border-gray-200 absolute z-10 w-32 shadow-lg rounded-lg p-3
            text-lg font-semibold text-textHeader text-center"
            style={{top: anchorPoint.y, left: anchorPoint.x}}
        >

            {!loggedIn && <li key={items[1]}><Link to={"/admin/login"}>{items[1]}</Link></li>}
            {loggedIn && <li key={items[2]}>
                <button onClick={changeLogIn}>{items[2]}</button>
            </li>}

        </ul>
    );
};

export {ContextMenu};