import * as React from 'react';
import {useContextMenu} from './useContextMenu';
import {Link} from "react-router-dom";


type Props = {
    items: Array<string>;
    loggedIn: boolean;
    setLoggedIn: (value: boolean) => void;

};

const ContextMenu = ({items, setLoggedIn, loggedIn}: Props) => {
    const {anchorPoint, isShown} = useContextMenu();

    if (!isShown) {
        return null;
    }

    function changeLogIn() {
        setLoggedIn(false);
    }


    return (
        <ul
            className="flex-col bg-white border border-gray-200 absolute z-10 w-32 shadow-lg rounded-lg p-3
            text-lg font-semibold text-textHeader text-center"
            style={{top: anchorPoint.y, left: anchorPoint.x}}
        >

            {!loggedIn && <li key={items[0]}><Link to={"/admin/login"}>{items[0]}</Link></li>}
            {loggedIn && <li key={items[1]}>
                <button onClick={changeLogIn}>{items[1]}</button>
            </li>}

        </ul>
    );
};

export {ContextMenu};