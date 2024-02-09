import {AnimatePresence, motion} from "framer-motion";
import {Rezept} from "../models/Rezept.tsx";
import RezeptCard from "./RezeptCard.tsx";

type RecepieGalleryProps = {
    rezeptList: Rezept[]
}
const variants = {
    type: "slide",
    initial: {opacity: 0},
    animate: {opacity: 1},
    container: {
        animate: {
            type: "slide",
            transition: {
                staggerChildren: 0.5,
                delayChildren: 0.2,
                ease: "easeIn"
            }
        }
    }
};

export default function RezeptGallery({rezeptList}: RecepieGalleryProps) {
    return (
        <AnimatePresence>
            <motion.div className="RezeptGallery flex flex-wrap flex-row m-2 p-1" variants={variants.container}>

            {rezeptList && rezeptList.map(rezept => {
                return (
                    <motion.div className="Rezept Card basis-1/4 hover:basis-1/3 m-2 p-4" key={rezept.id}
                                variants={variants}>
                        <RezeptCard rezept={rezept}/>
                    </motion.div>)

            })}
            </motion.div>
        </AnimatePresence>)

}