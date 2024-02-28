import {ChangeEvent, useRef} from "react";
import {SlCloudUpload} from "react-icons/sl";

type RezeptPhotoProps = {
    onChangePhoto: (file: File) => void
}

export default function RezeptPhotoUpload(props: RezeptPhotoProps) {

    function savePhoto(event: ChangeEvent<HTMLInputElement>) {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            props.onChangePhoto(file);
        }
    }

    const handleClick = () => {
        hiddenFileInput.current!.click();
    };
    const hiddenFileInput = useRef<HTMLInputElement>(null);
    return (
        <>
            <button
                type={"button"}
                className="flex-row justify-center align-middle w-fit h-14 p-4 m-4 text-center font-semibold rounded-2xl shadow-buttonOut active:shadow-buttonIn hover:shadow-buttonIn"
                onClick={handleClick}>
                UPLOAD PHOTO HERE
                <SlCloudUpload className="inline mx-4" width={20} height={20}/>
            </button>
            <input ref={hiddenFileInput}
                   style={{display: "none"}} type="file" id="rezeptLook" accept="image/png, image/jpeg" capture="user"
                   onChange={savePhoto}/>
        </>
    )
}