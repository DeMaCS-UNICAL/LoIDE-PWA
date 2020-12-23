import React, { useEffect, useState } from "react";
import { ISolverOption } from "../lib/LoideInterfaces";
import { IOptionsData } from "../lib/LoideAPIInterfaces";
import {
    IonBadge,
    IonButton,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonSelect,
    IonSelectOption,
} from "@ionic/react";
import { trashOutline } from "ionicons/icons";
import OptionTextValue from "./OptionTextValue";
import { useCallback } from "react";

interface OptionProps {
    optionsAvailable: IOptionsData[];
    optionData: ISolverOption;
    disabled: boolean;
    onChangeOptionType?: (newValue: string, id: number) => void;
    onChangeOptionValues?: (newValues: string[], id: number) => void;
    onDeleteOption?: (id: number) => void;
    onChangeDisableOption: (id: number, value: boolean) => void;
}

const Option: React.FC<OptionProps> = (props) => {
    var option = props.optionData;
    var optionsAvailable = props.optionsAvailable;

    const [values, setValues] = useState([""]);

    const incompatibleCurrenOptionName = useCallback((): boolean => {
        for (let i = 0; i < optionsAvailable.length; i++) {
            if (optionsAvailable[i].value === option.name) return false;
        }
        return true;
    }, [optionsAvailable, option.name]);

    useEffect(() => {
        setValues(props.optionData.values);
    }, [props.optionData]);

    useEffect(() => {
        if (incompatibleCurrenOptionName() && props.onChangeOptionType) {
            props.onChangeOptionType(optionsAvailable[0].value, option.id);
        }
    }, [optionsAvailable, props, option.id, incompatibleCurrenOptionName]);

    const onChangeOptionType = (e: any) => {
        if (props.onChangeOptionType)
            props.onChangeOptionType(e.target.value, option.id);
    };

    const onChangeValues = (e: any, index: number) => {
        let newValue = e.target.value;
        let newValues = [...values];
        newValues[index] = newValue;
        setValues(newValues);
        if (props.onChangeOptionValues)
            props.onChangeOptionValues(newValues, option.id);
    };

    const addValue = () => {
        let newValues = [...values];
        newValues.push("");
        setValues(newValues);
        if (props.onChangeOptionValues)
            props.onChangeOptionValues(newValues, option.id);
    };

    const deleteValue = (index: number) => {
        let newValues = [...values];
        newValues.splice(index, 1);
        if (newValues.length === 0) newValues.push("");
        setValues(newValues);
        if (props.onChangeOptionValues)
            props.onChangeOptionValues(newValues, option.id);
    };

    const deleteOption = () => {
        if (props.onDeleteOption) props.onDeleteOption(option.id);
    };

    const wordArgument = (): boolean => {
        for (let opt of optionsAvailable) {
            if (opt.value === option.name && !opt.word_argument) {
                return false;
            }
        }
        return true;
    };

    const onDisableOption = () => {
        props.onChangeDisableOption(option.id, !props.disabled);
    };

    const options = [...optionsAvailable].map((opt, index) => (
        <IonSelectOption key={`${option.id}-option-${index}`} value={opt.value}>
            {opt.name}
        </IonSelectOption>
    ));

    const optionValues = [...values].map((opt, index) => {
        return (
            <OptionTextValue
                value={opt}
                indexItemOnArray={index}
                lastItem={index === values.length - 1}
                disabled={props.disabled}
                onDeleteValue={deleteValue}
                onAddValue={addValue}
                onChangeValues={onChangeValues}
                key={`${option.id}-option-value-${index}`}
            />
        );
    });

    return (
        <IonList className="ion-no-padding">
            <IonItem>
                <IonBadge
                    slot="start"
                    color={props.disabled ? "medium" : "primary"}
                    onClick={onDisableOption}
                    style={{ cursor: "pointer" }}
                >
                    Option {option.id + 1}
                </IonBadge>

                <IonButton
                    slot="end"
                    color="danger"
                    title="Delete option"
                    onClick={deleteOption}
                >
                    <IonIcon icon={trashOutline} />
                    Delete option
                </IonButton>
            </IonItem>

            <IonItem>
                <IonLabel>
                    <b>Name</b>
                </IonLabel>

                <IonSelect
                    data-testid="select-name-options"
                    onIonChange={onChangeOptionType}
                    value={option.name}
                    disabled={props.disabled}
                >
                    {options}
                </IonSelect>
            </IonItem>

            {wordArgument() && <>{optionValues}</>}
        </IonList>
    );
};

export default Option;
