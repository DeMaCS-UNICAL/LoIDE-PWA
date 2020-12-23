import React, { useEffect } from "react";
import { UIStatusStore } from "../lib/store";

export const darkModeContext = React.createContext(false);

export const DarkModeProvider: React.FC = ({ children }) => {
    const darkMode = UIStatusStore.useState((u) => u.darkMode);

    useEffect(() => {
        if (darkMode) document.body.classList.add("dark");
        else document.body.classList.remove("dark");
    }, [darkMode]);

    const handleDarkModeChange = (e: MediaQueryListEvent) => {
        UIStatusStore.update((u) => {
            u.darkMode = e.matches;
        });
    };

    React.useEffect(() => {
        UIStatusStore.update((u) => {
            u.darkMode = window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches;
        });

        window
            .matchMedia("(prefers-color-scheme: dark)")
            .addEventListener("change", handleDarkModeChange);
        return () =>
            window
                .matchMedia("(prefers-color-scheme: dark)")
                .removeEventListener("change", handleDarkModeChange);
    }, []);

    return (
        <darkModeContext.Provider value={darkMode}>
            {children}
        </darkModeContext.Provider>
    );
};
