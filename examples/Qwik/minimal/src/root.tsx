import { component$, useVisibleTask$, useStore } from "@builder.io/qwik";
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";

import "./global.css";

export default component$(() => {
  /**
   * The root of a QwikCity site should have the <RouterHead> and <RouterOutlet> components.
   * (DO NOT ADD ADDITIONAL <head> elements here, include them in your components instead.)
   *
   * Don't forget to add a <ServiceWorkerRegister> component to ensure good PWA performance.
   */
  return (
    <QwikCityProvider>
      <head>
        <RouterHead />
      </head>
      <body lang="en">
        <RouterOutlet />
        <ServiceWorkerRegister />
      </body>
    </QwikCityProvider>
  );
});
