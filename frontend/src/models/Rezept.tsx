import {Kategorie} from "./Kategorie.tsx";

export type Rezept = {
    id: string,
    rezeptName: string,
    rezeptImageUrl: string,
    rezeptKurzbeschreibung: string,
    rezeptBeschreibung: string,
    kategorieList: Kategorie[]
}