import { IonButton, IonCol, IonInput, IonItem, IonList, IonRow } from "@ionic/react";
import React, { useState } from "react";
import { defaultProjectName } from "../lib/constants";
import Utils from "../lib/utils";

const SaveProject: React.FC = () => {
  const [nameProject, setNameProject] = useState<string>(defaultProjectName);

  const donwloadFile = () => {
    const loideProjectData = Utils.getLoideProjectData();
    const fileContent = JSON.stringify(loideProjectData);

    const element = document.createElement("a");
    const file = new Blob([fileContent], {
      type: "application/json",
    });
    element.href = URL.createObjectURL(file);
    element.download = nameProject;
    document.body.appendChild(element);
    element.click();
  };

  return (
    <>
      <IonRow>
        <IonCol sizeMd="10" offsetMd="1" sizeLg="8" offsetLg="2">
          <IonList>
            <IonItem>
              <IonInput
                label="Project name"
                labelPlacement="floating"
                placeholder="Insert a project name"
                value={nameProject}
                clearInput={true}
                onIonChange={(e) => {
                  const text = e.detail.value;
                  if (typeof text === "string") setNameProject(text);
                }}
              />
            </IonItem>
          </IonList>
          <IonButton
            disabled={nameProject.length === 0 ? true : false}
            expand="block"
            className="ion-margin-top"
            title="Download"
            onClick={donwloadFile}
          >
            Download
          </IonButton>
        </IonCol>
      </IonRow>
    </>
  );
};

export default SaveProject;
