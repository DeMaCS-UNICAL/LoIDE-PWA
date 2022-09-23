import {
  IonItemSliding,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonIcon,
  IonItemOptions,
  IonItemOption,
} from "@ionic/react";
import { addOutline } from "ionicons/icons";
import React, { useRef } from "react";

interface OptionTextValueProp {
  value: string;
  indexItemOnArray: number;
  lastItem: boolean;
  disabled: boolean;
  onChangeValues: (e: any, index: number) => void;
  onAddValue: () => void;
  onDeleteValue: (index: number) => void;
}

const OptionTextValue: React.FC<OptionTextValueProp> = (props) => {
  const slideOptions = useRef<HTMLIonItemSlidingElement>(null);

  const onSwipe = () => {
    props.onDeleteValue(props.indexItemOnArray);
  };

  return (
    <IonItemSliding ref={slideOptions}>
      <IonItem data-testid="option-text-value-item">
        <IonLabel style={props.disabled ? { opacity: 0.3 } : {}}>
          <b> Value </b>
        </IonLabel>
        <IonInput
          clearInput={true}
          enterkeyhint="done"
          color="tertiary"
          inputMode="text"
          placeholder="Insert a value"
          onIonChange={(e) => props.onChangeValues(e, props.indexItemOnArray)}
          value={props.value}
          disabled={props.disabled}
        />
        {props.lastItem && (
          <IonButton
            color="light"
            title="Add value"
            disabled={props.disabled}
            onMouseDown={(e) => e.preventDefault()}
            onClick={(e) => {
              e.preventDefault();
              props.onAddValue();
            }}
          >
            <IonIcon icon={addOutline} />
            <span> Add value </span>
          </IonButton>
        )}
      </IonItem>

      <IonItemOptions data-testid="swipe-delete" side="end" onIonSwipe={onSwipe}>
        <IonItemOption
          title="Delete option value"
          expandable={true}
          color="danger"
          onClick={() => {
            const opt = slideOptions.current;
            if (opt) opt.close();
            props.onDeleteValue(props.indexItemOnArray);
          }}
        >
          Delete
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default OptionTextValue;
