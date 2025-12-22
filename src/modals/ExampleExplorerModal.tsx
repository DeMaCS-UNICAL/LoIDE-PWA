// src/modals/ExampleExplorerModal.tsx
import React, { useEffect, useState } from "react";
import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonRow,
  IonTitle,
  IonToolbar,
  IonBadge,
} from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import { EXAMPLE_PROGRAMS, IExampleProgram } from "../lib/examples";

interface ExampleExplorerModalProps {
  isOpen: boolean;
  onDismiss: (open: boolean) => void;
  onSelectExample: (example: IExampleProgram) => void;
}

const ExampleExplorerModal: React.FC<ExampleExplorerModalProps> = ({
  isOpen,
  onDismiss,
  onSelectExample,
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Quando apro la modal, seleziono il primo esempio (se esiste)
      if (EXAMPLE_PROGRAMS.length > 0) {
        setSelectedId(EXAMPLE_PROGRAMS[0].id);
      } else {
        setSelectedId(null);
      }
    }
  }, [isOpen]);

  const selectedExample = EXAMPLE_PROGRAMS.find((e) => e.id === selectedId) || null;

  const handleUseExample = () => {
    if (selectedExample) {
      onSelectExample(selectedExample);
      onDismiss(false);
    }
  };

  // 👇 Helper per mostrare uno o più badge "Suggested solver"
  const renderSuggestedSolverBadge = (example: IExampleProgram) => {
    const raw = example.suggested_solver;

    if (!raw || raw.trim().length === 0) {
      // Nessun solver suggerito → N/A
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "0.75rem",
          }}
        >
          <span style={{ color: "var(--ion-color-medium)" }}>Suggested solver:</span>
          <IonBadge color="medium">N/A</IonBadge>
        </div>
      );
    }

    // Supporta "clingo, dlv,solverx ,  solvery"
    const solvers = raw
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    if (solvers.length === 0) {
      // Stringa sporca ma senza valori utili → fallback N/A
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "0.75rem",
          }}
        >
          <span style={{ color: "var(--ion-color-medium)" }}>Suggested solver:</span>
          <IonBadge color="medium">N/A</IonBadge>
        </div>
      );
    }

    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          marginBottom: "0.75rem",
          flexWrap: "wrap",
        }}
      >
        <span style={{ color: "var(--ion-color-medium)" }}>Suggested solver:</span>
        <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap" }}>
          {solvers.map((solver) => (
            <IonBadge key={solver} color="tertiary">
              {solver}
            </IonBadge>
          ))}
        </div>
      </div>
    );
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={() => onDismiss(false)}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Examples Explorer</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => onDismiss(false)}>
              <IonIcon icon={closeOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonGrid style={{ height: "100%" }}>
          <IonRow style={{ height: "100%" }}>
            {/* Colonna sinistra: lista esempi */}
            <IonCol
              size="12"
              sizeMd="4"
              className="ion-no-padding"
              style={{ borderRight: "1px solid var(--ion-color-step-150)" }}
            >
              <IonList inset={false}>
                {EXAMPLE_PROGRAMS.map((example) => (
                  <IonItem
                    key={example.id}
                    button
                    detail={false}
                    onClick={() => setSelectedId(example.id)}
                    color={example.id === selectedId ? "light" : undefined}
                  >
                    <IonLabel>
                      <h2>{example.title}</h2>
                      <p>{example.description}</p>
                    </IonLabel>
                  </IonItem>
                ))}
              </IonList>
            </IonCol>

            {/* Colonna destra: anteprima */}
            <IonCol size="12" sizeMd="8" className="ion-padding">
              {selectedExample ? (
                <>
                  <h2 style={{ marginTop: 0 }}>{selectedExample.title}</h2>

                  <p style={{ marginBottom: "0.5rem", color: "var(--ion-color-medium)" }}>
                    Language: <strong>{selectedExample.language}</strong>
                  </p>

                  {/* 👇 Badge "Suggested solver" (uno o più) */}
                  {renderSuggestedSolverBadge(selectedExample)}

                  <p style={{ marginBottom: "1rem" }}>{selectedExample.description}</p>

                  <div
                    style={{
                      border: "1px solid var(--ion-color-step-150)",
                      borderRadius: "4px",
                      padding: "0.75rem",
                      height: "50vh",
                      overflow: "auto",
                      background: "var(--ion-color-light)",
                      fontFamily: "var(--ion-font-family, monospace)",
                      fontSize: "0.9rem",
                      whiteSpace: "pre",
                    }}
                  >
                    {selectedExample.code}
                  </div>

                  <div
                    style={{
                      marginTop: "1rem",
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: "0.5rem",
                    }}
                  >
                    <IonButton
                      fill="outline"
                      color="medium"
                      onClick={() => onDismiss(false)}
                    >
                      Close
                    </IonButton>
                    <IonButton color="primary" onClick={handleUseExample}>
                      Load in editor
                    </IonButton>
                  </div>
                </>
              ) : (
                <p>No example selected.</p>
              )}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonModal>
  );
};

export default ExampleExplorerModal;
