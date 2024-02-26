import React, {useState} from "react";
import {Rezept} from "../models/Rezept.tsx";
import {Kategorie} from "../models/Kategorie.tsx";
import {useNavigate} from "react-router-dom";
import {Autosuggest} from "react-autosuggest";

type SearchBarProps = {
    rezeptList: Rezept[],
    kategorieList: Kategorie[],
    setFilteredRezepte: (rezepte: Rezept[]) => void,
}


export function SearchBar({rezeptList, kategorieList, setFilteredRezepte}: SearchBarProps) {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();

    const getSuggestions = (value: string) => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0 ? [] : [...rezeptList, ...kategorieList].filter(item =>
            item.name.toLowerCase().slice(0, inputLength) === inputValue
        );
    };

    const onSuggestionsFetchRequested = ({value}: any) => {
        setSuggestions(getSuggestions(value));
    };

    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const getSuggestionValue = (suggestion: any) => suggestion.name;

    const renderSuggestion = (suggestion: any) => (
        <div>
            {suggestion.name}
        </div>
    );

    const onSuggestionSelected = (event: any, {suggestion}: any) => {
        if (kategorieList.includes(suggestion)) {
            setFilteredRezepte(rezeptList.filter(rezept => rezept.kategorieList.map(kategorie => kategorie.kategorieName.toLowerCase()).includes(suggestion.kategorieName.toLowerCase())));
        } else if (rezeptList.includes(suggestion)) {
            navigate(`/rezept/${suggestion.id}`);
        }
    };

    const inputProps = {
        placeholder: "Search...",
        value: query,
        onChange: (event: any, {newValue}: any) => {
            setQuery(newValue);
        }
    };

    return (
        <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
            onSuggestionSelected={onSuggestionSelected}
        />
    );
}