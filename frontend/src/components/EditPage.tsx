import {Rezept} from "../models/Rezept.tsx";
import {useAnimate} from "framer-motion";
import {Link} from "react-router-dom";


type DetailPageProps = {
    rezept: Rezept
}

const animateDetaisl = {
    initial: {opacity: 0, y: -50},
    animate: {opacity: 1, y: 0}
}

export default function DetailPage({rezept}: DetailPageProps) {
    const [scope, animate] = useAnimate();

    return (<div>
        <Link className="mt-4 align-middle self-center justify-center text-textHeader" to={"/"}><h1>SCHMECKIS</h1>
        </Link>
        <div ref={scope} className="flex flex-col shadow-doubleOut mt-10 mx-10 content-center align-middle">
            <h2>{rezept.rezeptName}</h2>
            <img src={rezept.rezeptImageUrl} alt={rezept.rezeptName}/>
            <p>{rezept.rezeptBeschreibung}</p>
            <div>
                {rezept.kategorieList.map(kategorie => (
                    <button
                        className="fflex-row shadow-hashtagbutton overflow-clip bg-offWhite rounded-full px-3 text-sm font-semibold text-textPrime mr-2 mb-2 p-1"
                        key={kategorie.kategorieName}>{kategorie.kategorieName}</button>
                ))}
            </div>
        </div>
    </div>);

}