import {ChangeEvent} from "react";


export function SearchBar({handleOnChange}: { handleOnChange: (event: ChangeEvent<HTMLInputElement>) => void }) {


    return (
        <div className="flex flex-wrap w-full h-fit justify-center">
            <input className="flex w-1/4 text-center text-xl active:border-none active:border-transparent
            justify-center bg-offWhite active:shadow-hashtagbutton hover:shadow-hashtagbuttonOut border-none align-middle my-8"
                   type="text" placeholder="Suche..." onChange={handleOnChange}/>
        </div>
    )
}

