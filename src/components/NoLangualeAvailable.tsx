import { IonButton, IonCol, IonProgressBar, IonRow } from "@ionic/react";
import React from "react";
import API from "../lib/api";
import { Offline, Online } from "react-detect-offline";
import { useSelector } from "react-redux";
import { UIStatusSelector } from "../redux/slices/UIStatus";
import { socketStatusSelector } from "../redux/slices/SocketStatus";

const NoLanguageAvailable: React.FC = () => {
  const { connectingToTheServer } = useSelector(UIStatusSelector);

  const { connected } = useSelector(socketStatusSelector);

  const onReconnect = () => {
    API.emitGetLanguages();
  };
  return (
    <>
      <IonProgressBar
        type="indeterminate"
        style={
          connectingToTheServer
            ? { position: "fixed" }
            : { opacity: 0, position: "fixed" }
        }
      ></IonProgressBar>
      <IonRow>
        <IonCol className="ion-text-center ion-padding">
          <h4 className="ion-margin-bottom">No language available</h4>
          <Online>
            {!connected && (
              <>
                <h5
                  className="ion-margin-bottom"
                  style={{ opacity: 0.6, minHeight: "50px" }}
                >
                  {!connectingToTheServer && !connected && (
                    <span>
                      You are disconnect from the server, try to reconnect
                    </span>
                  )}

                  {connectingToTheServer && (
                    <span>Reconnecting to the server...</span>
                  )}
                </h5>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <IonButton
                    onClick={onReconnect}
                    // disabled={connectingToTheServer}
                  >
                    Reconnect
                  </IonButton>
                </div>
              </>
            )}
          </Online>
          <Offline>
            <h5 className="ion-margin-bottom" style={{ opacity: 0.6 }}>
              You are offline, connect to the internet
            </h5>
          </Offline>
        </IonCol>
      </IonRow>
    </>
  );
};

export default NoLanguageAvailable;
