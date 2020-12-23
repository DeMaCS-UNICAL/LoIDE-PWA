import { useEffect, useState } from "react";
import { LanguagesDataStore } from "../lib/store";

export const useLanguageAvailable = (): boolean => {
    const languages = LanguagesDataStore.useState((l) => l.languages);
    const [available, setAvailable] = useState(false);

    useEffect(() => {
        setAvailable(languages.length > 0 ? true : false);
    }, [languages]);

    return available;
};
