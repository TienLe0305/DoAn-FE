import React from "react";
import { createRoot } from "react-dom/client";
import ContentScript from "./components/ContentScript";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import "./index.css";

function init() {
  const appContainer = document.createElement("div");
  document.body.appendChild(appContainer);
  if (!appContainer) {
    throw new Error("Can not find AppContainer");
  }
  const root = createRoot(appContainer);
  root.render(
    <I18nextProvider i18n={i18n}>
      <ContentScript />
    </I18nextProvider>
  );
}

init();
