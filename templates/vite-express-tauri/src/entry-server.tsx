import { StrictMode } from "react";
import { StaticRouter } from "react-router";
import { App } from "./App";

export function render(url: string) {
  return (
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>
  );
}
