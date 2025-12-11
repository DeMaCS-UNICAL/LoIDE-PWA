import { setupIonicReact } from "@ionic/react";
import App from "./App";
import { DarkModeProvider } from "./providers/DarkModeProvider";
import { ViewportProvider } from "./providers/ViewportProvider";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./redux";

import { createRoot } from "react-dom/client";

setupIonicReact({
  // mode: "ios",
});

const container = document.getElementById("root");

if (container) {
  const root = createRoot(container);

  root.render(
    <Provider store={store}>
      <DarkModeProvider>
        <ViewportProvider>
          <App />
        </ViewportProvider>
      </DarkModeProvider>
    </Provider>,
  );
}

// Service worker registration is handled automatically by vite-plugin-pwa

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
