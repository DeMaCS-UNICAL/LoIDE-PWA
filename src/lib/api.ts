import { APIWSEvents, ButtonText, Errors, Toast } from "./constants";
import io from "socket.io-client";
import { toastController } from "@ionic/core";
import {
  ILanguageData,
  ILoideRunData,
  IOutputData,
  IOutputProblemData,
} from "./LoideAPIInterfaces";
import { store } from "../redux";
import { setConnectingToTheServer } from "../redux/slices/UIStatus";
import { setConnected } from "../redux/slices/SocketStatus";

// LoIDE Web Server API URL
const APIUrl = process.env.REACT_APP_LOIDE_API_SERVER || "localhost:8084";

let socket: SocketIOClient.Socket;

export const createSocket = () => {
  if (!socket) {
    socket = io(APIUrl, { reconnection: false });
    socket.io.on("error", async () => {
      await toastController
        .create({
          position: "top",
          header: Toast.Error.header,
          message: Errors.ConnectionError,
          color: "danger",
          duration: 3000,
          buttons: [ButtonText.OK],
        })
        .then((toast) => {
          toast.present();
        });

      store.dispatch(setConnected(false));

      store.dispatch(setConnectingToTheServer(false));

      console.error(Errors.ConnectionError);
    });
  }
};

export const setRunProjectListener = (callbackOutput: (output: IOutputData) => void) => {
  if (socket) {
    socket.off(APIWSEvents.on.problem);
    socket.off(APIWSEvents.on.output);

    socket.on(APIWSEvents.on.problem, async (response: IOutputProblemData) => {
      store.dispatch(setConnected(true));

      await toastController
        .create({
          position: "top",
          header: Toast.ExecutionError.header,
          message: response.reason,
          color: "danger",
          duration: 3000,
          buttons: [ButtonText.OK],
        })
        .then((toast) => {
          toast.present();
        });
    });

    socket.on(APIWSEvents.on.output, (response: IOutputData) => {
      store.dispatch(setConnected(true));
      callbackOutput(response);
    });
  }
};

export const setGetLanguagesListener = (callbackLanguages: (output: ILanguageData[]) => void) => {
  if (socket) {
    socket.off(APIWSEvents.on.languages);
    socket.on(APIWSEvents.on.languages, (response: string) => {
      const data: ILanguageData[] = Array.from(JSON.parse(response));
      store.dispatch(setConnected(true));

      store.dispatch(setConnectingToTheServer(false));

      callbackLanguages(data);
    });
  }
};

export const emitGetLanguages = () => {
  if (socket) {
    if (socket.disconnected) {
      store.dispatch(setConnectingToTheServer(true));
      socket.connect();
    }
    socket.emit(APIWSEvents.emit.getLanguages);
  }
};

export const emitRunProject = (data: ILoideRunData) => {
  if (socket) {
    if (socket.disconnected) {
      store.dispatch(setConnectingToTheServer(true));
      socket.connect();
    }
    socket.emit(APIWSEvents.emit.run, JSON.stringify(data));
  }
};

export const isConnected = (): boolean => {
  if (socket) {
    return socket.connected;
  }
  return false;
};

export const disconnectAndClearSocket = () => {
  if (socket) {
    socket.removeAllListeners();
    socket.disconnect();
  }
};
