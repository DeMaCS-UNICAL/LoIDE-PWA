import { setupIonicReact } from '@ionic/react';
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { DarkModeProvider } from "./providers/DarkModeProvider";
import { ViewportProvider } from "./providers/ViewportProvider";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./redux";

setupIonicReact({
    // mode: "ios",
});

ReactDOM.render(
    <Provider store={store}>
        <DarkModeProvider>
            <ViewportProvider>
                <App />
            </ViewportProvider>
        </DarkModeProvider>
    </Provider>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
