import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LocalStorageItems } from "../lib/constants";
import { setDarkMode, UIStatusSelector } from "../redux/slices/UIStatus";

export const darkModeContext = React.createContext(false);

export const DarkModeProvider: React.FC = ({ children }) => {
    const dispatch = useDispatch();

    const { darkMode } = useSelector(UIStatusSelector);

    useEffect(() => {
        if (darkMode) document.body.classList.add("dark");
        else document.body.classList.remove("dark");
    }, [darkMode]);

    const handleDarkModeChange = useCallback(
        (e: MediaQueryListEvent) => {
            dispatch(setDarkMode(e.matches));
        },
        [dispatch]
    );

    React.useEffect(() => {
        let darkModeString = localStorage.getItem(LocalStorageItems.darkMode);
        if (darkModeString) {
            dispatch(setDarkMode(darkModeString === "true"));
        } else {
            dispatch(
                setDarkMode(
                    window.matchMedia("(prefers-color-scheme: dark)").matches
                )
            );
        }

        window
            .matchMedia("(prefers-color-scheme: dark)")
            .addEventListener("change", handleDarkModeChange);
        return () =>
            window
                .matchMedia("(prefers-color-scheme: dark)")
                .removeEventListener("change", handleDarkModeChange);
    }, [dispatch, handleDarkModeChange]);

    return (
        <darkModeContext.Provider value={darkMode}>
            {children}
        </darkModeContext.Provider>
    );
};
