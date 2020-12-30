import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { languagesDataSelector } from "../redux/slices/LanguagesData";

export const useLanguageAvailable = (): boolean => {
    const { languages } = useSelector(languagesDataSelector);

    const [available, setAvailable] = useState(false);

    useEffect(() => {
        setAvailable(languages.length > 0 ? true : false);
    }, [languages]);

    return available;
};
