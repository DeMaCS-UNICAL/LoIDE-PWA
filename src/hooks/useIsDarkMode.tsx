import React from "react";
import { darkModeContext } from "../providers/DarkModeProvider";

export const useIsDarkMode = (): boolean => {
    const darkMode: boolean = React.useContext(darkModeContext);
    return darkMode;
};
