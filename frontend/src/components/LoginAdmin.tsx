import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

type LoginProps = {
    setLoggedIn: (loggedIn: boolean) => void
}

export default function Login({setLoggedIn}: LoginProps) {

    const Nav = useNavigate();
    const [displayError, setDisplayError] = useState<boolean>(false);
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    function onUsernameChange(event: React.ChangeEvent<HTMLInputElement>) {
        setUsername(event.target.value);
    }

    function onPasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value);
    }

    function authenticate(event: React.FormEvent<HTMLFormElement | HTMLButtonElement>) {
        event.preventDefault();

        axios.get("/api/admin/login", {
            auth: {
                username: username,
                password: password
            }
        }).then(response => {
            if (response.status === 202) {
                setLoggedIn(true);
                setDisplayError(false);
                Nav("/");

            } else {
                setLoggedIn(false);
                setDisplayError(true);
            }
        })
    }

    function cancel(event: React.FormEvent<HTMLButtonElement>) {
        event.preventDefault();
        Nav("/");
    }

    return (
        <div className="w-full h-full self-center flex">
            <div className="flex-col justify-center self-center align-middle w-1/3 h-fit shadow-doubleOut">
                {displayError && <p className=" justify-center text-center text-red-600
            text-4xl ">Invalid username or password</p>}
                <h1 className="text-textHeader text-4xl text-center">Login</h1>
                <form className="flex-col" onSubmit={() => {
                }}>
                    <label className=" flex-row text-center text-lg font-semibold text-textHeader"
                           htmlFor="username">Username:</label>
                    <input
                        className=" flex-row text-center border-none active:border-none hover:border-none border-transparent text-lg font-semibold text-textHeader bg-offWhite hover:shadow-hashtagbutton active:shadow-hashtagbutton"
                        type="text" id="username" name="username"
                        onChange={onUsernameChange} value={password} required/>

                    <label className=" flex-row text-center text-lg font-semibold text-textHeader"
                           htmlFor="password">Password:</label>
                    <input
                        className="flex-row text-center border-none active:border-none hover:border-none border-transparent text-lg font-semibold text-textHeader bg-offWhite hover:shadow-hashtagbutton active:shadow-hashtagbutton"
                        type="password" id="password" name="password"
                        value={password} onChange={onPasswordChange} required/>
                    <div className="flex-row justify-center">
                        <button className="content-center hover:shadow-hashtagbutton active:shadow-hashtagbutton
                shadow-hashtagbuttonOut bg-offWhite w-fit text-center text-xl
                flex-col" type="button" onClick={authenticate}>Login
                        </button>
                        <button className="content-center hover:shadow-hashtagbutton active:shadow-hashtagbutton
                shadow-hashtagbuttonOut bg-offWhite w-fit text-center text-xl
                flex-col" type="button" onClick={cancel}>Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}