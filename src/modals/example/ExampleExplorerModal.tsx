import React, { useRef } from "react";
import { IonModal, IonNav } from "@ionic/react";
import { IExampleProgram } from "../../lib/examples";
import ExampleListPage from "./ExampleListPage";

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
  const navRef = useRef<HTMLIonNavElement>(null);

  const handleSelectExample = (example: IExampleProgram) => {
    onSelectExample(example);
    onDismiss(false); // 🔥 chiude automaticamente la modal
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={() => onDismiss(false)}>
      <IonNav
        ref={navRef}
        root={ExampleListPage}
        rootParams={{
          navRef,
          onDismiss: () => onDismiss(false),
          onSelectExample: handleSelectExample,
        }}
      />
    </IonModal>
  );
};

export default ExampleExplorerModal;
