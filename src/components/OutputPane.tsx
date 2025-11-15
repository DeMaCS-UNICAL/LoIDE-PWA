// src/components/OutputPane.tsx
import React from "react";
import { IonRow, IonCol } from "@ionic/react";
import Output from "./Output";
import { useSelector } from "react-redux";
import { UIStatusSelector } from "../redux/slices/UIStatus";
import { outputSelector } from "../redux/slices/Output";

const OutputPane: React.FC = () => {
  const { model, error } = useSelector(outputSelector);
  const { fontSizeOutput } = useSelector(UIStatusSelector);

  return (
    <IonRow style={{ height: "100%" }}>
      <IonCol
        size-md="8"
        offset-md="2"
        size-xl="6"
        offset-xl="3"
        className="ion-no-padding"
        style={{ height: "100%" }}
      >
        <Output model={model} error={error} fontSize={fontSizeOutput} />
      </IonCol>
    </IonRow>
  );
};

export default OutputPane;
