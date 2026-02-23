import React from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonContent,
  IonButton,
  IonBadge,
} from "@ionic/react";
import { IExampleProgram } from "../../lib/examples";

interface ExampleDetailPageProps {
  example: IExampleProgram;
  onSelectExample: (example: IExampleProgram) => void;
}

const ExampleDetailPage: React.FC<ExampleDetailPageProps> = ({
  example,
  onSelectExample,
}) => {
  const renderSuggestedSolverBadge = () => {
    const raw = example.suggested_solver;

    if (!raw || raw.trim().length === 0) {
      return <IonBadge color="medium">N/A</IonBadge>;
    }

    const solvers = raw
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    if (solvers.length === 0) {
      return <IonBadge color="medium">N/A</IonBadge>;
    }

    return (
      <>
        {solvers.map((solver) => (
          <IonBadge key={solver} color="tertiary">
            {solver}
          </IonBadge>
        ))}
      </>
    );
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="#" />
          </IonButtons>
          <IonTitle>{example.title}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <p style={{ color: "var(--ion-color-medium)" }}>
          Language: <strong>{example.language}</strong>
        </p>

        <div style={{ marginBottom: "1rem" }}>
          <strong>Suggested solver:</strong>{" "}
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {renderSuggestedSolverBadge()}
          </div>
        </div>

        <p>{example.description}</p>

        <div
          style={{
            border: "1px solid var(--ion-color-step-150)",
            borderRadius: "8px",
            padding: "12px",
            marginTop: "16px",
            background: "var(--ion-color-light)",
            fontFamily: "monospace",
            fontSize: "0.9rem",
            whiteSpace: "pre",
            overflowX: "auto",
          }}
        >
          {example.code}
        </div>

        <IonButton
          expand="block"
          style={{ marginTop: "20px" }}
          onClick={() => onSelectExample(example)}
        >
          Load in editor
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default ExampleDetailPage;