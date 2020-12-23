import { APIWSEvents, ButtonText, Errors } from "./constants";
import io from "socket.io-client";
import { toastController } from "@ionic/core";
import {
    ILanguageData,
    ILoideRunData,
    IOutputData,
    IOutputProblemData,
} from "./LoideAPIInterfaces";
import { SocketStatusStore, UIStatusStore } from "./store";
import { Toast } from "./constants";

// LoIDE Web Server API URL
const APIUrl = "192.168.1.13:8084";

var socket: SocketIOClient.Socket | undefined = undefined;

const createSocket = () => {
    if (!socket) {
        socket = io(APIUrl, { reconnection: false });
        socket.io.on("error", async (error: any) => {
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
            SocketStatusStore.update((s) => {
                s.connected = false;
            });
            UIStatusStore.update((s) => {
                s.connectingToTheServer = false;
            });
            console.error(Errors.ConnectionError);
        });
    }
};

const setRunProjectListener = (
    callbackOutput: (output: IOutputData) => void
) => {
    if (socket) {
        socket.off(APIWSEvents.on.problem);
        socket.off(APIWSEvents.on.output);

        socket.on(
            APIWSEvents.on.problem,
            async (response: IOutputProblemData) => {
                SocketStatusStore.update((s) => {
                    s.connected = true;
                });
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
            }
        );

        socket.on(APIWSEvents.on.output, (response: IOutputData) => {
            SocketStatusStore.update((s) => {
                s.connected = true;
            });
            callbackOutput(response);
        });
    }
};

const setGetLanguagesListener = (
    callbackLanguages: (output: ILanguageData[]) => void
) => {
    if (socket) {
        socket.off(APIWSEvents.on.languages);
        socket.on(APIWSEvents.on.languages, (response: string) => {
            let data: ILanguageData[] = Array.from(JSON.parse(response));
            SocketStatusStore.update((s) => {
                s.connected = true;
            });
            UIStatusStore.update((s) => {
                s.connectingToTheServer = false;
            });
            callbackLanguages(data);
        });
    }
};

const emitGetLanguages = () => {
    if (socket) {
        if (socket.disconnected) {
            UIStatusStore.update((s) => {
                s.connectingToTheServer = true;
            });
            socket.connect();
        }
        socket.emit(APIWSEvents.emit.getLanguages);
    }
};

const emitRunProject = (data: ILoideRunData) => {
    if (socket) {
        if (socket.disconnected) {
            UIStatusStore.update((s) => {
                s.connectingToTheServer = true;
            });
            socket.connect();
        }
        socket.emit(APIWSEvents.emit.run, JSON.stringify(data));
    }
};

const isConnected = (): boolean => {
    if (socket) {
        return socket.connected;
    }
    return false;
};

const disconnectAndClearSocket = () => {
    if (socket) {
        socket.removeAllListeners();
        socket.disconnect();
    }
};

const API = {
    createSocket,
    isConnected,
    disconnectAndClearSocket,
    setRunProjectListener,
    setGetLanguagesListener,
    emitRunProject,
    emitGetLanguages,
};

export default API;
