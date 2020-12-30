import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { languagesDataSelector } from "../redux/slices/LanguagesData";
import {
    runSettingsSelector,
    setCurrentExecutor,
    setCurrentLanguage,
    setCurrentSolver,
} from "../redux/slices/RunSettings";

export const useSetRunSettings = () => {
    const dispatch = useDispatch();
    const { languages } = useSelector(languagesDataSelector);

    const { currentLanguage, currentSolver, currentExecutor } = useSelector(
        runSettingsSelector
    );

    useEffect(() => {
        if (languages.length > 0) {
            let firstLanguage = languages[0];

            if (currentLanguage.length === 0)
                dispatch(setCurrentLanguage(firstLanguage.value));

            if (currentSolver.length === 0)
                dispatch(setCurrentSolver(firstLanguage.solvers[0].value));

            if (currentExecutor.length === 0)
                dispatch(
                    setCurrentExecutor(
                        firstLanguage.solvers[0].executors[0].value
                    )
                );
        }
    }, [languages, currentLanguage, currentSolver, currentExecutor, dispatch]);
};
