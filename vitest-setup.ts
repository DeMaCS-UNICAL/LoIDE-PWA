// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/vitest";
// import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

// Defer importing @ionic/react until after we apply DOM polyfills/mocks.
// Importing it earlier leads to @ionic/core (Stencil) code running which
// expects newer DOM APIs and throws in our test environment.
void (async () => {
  const { setupIonicReact } = await import("@ionic/react");
  setupIonicReact();
})();

// Ensure cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock matchmedia
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,

      addListener: function () {},

      removeListener: function () {},
    };
  };

vi.useRealTimers();

const ResizeObserver = vi.fn(() => ({
  observe: function () {},
  unobserve: function () {},
  disconnect: function () {},
}));

vi.stubGlobal("ResizeObserver", ResizeObserver);

// Polyfill scrollTo for JSDOM (used by IonSegmentView)
if (!Element.prototype.scrollTo) {
  Element.prototype.scrollTo = function () {
    // no-op: tests don't need actual scrolling
  };
}

// Polyfill/stub CSSStyleSheet and adoptedStyleSheets for test environment
// Stencil/ionic code checks for constructable stylesheets and adoptedStyleSheets
// which may be undefined in Node/JSDOM-like test envs. We provide a minimal
// stub so that the APIs Ionic expects exist and the code paths don't throw.
/* eslint-disable @typescript-eslint/no-explicit-any */
if (!("CSSStyleSheet" in globalThis)) {
  class CSSStyleSheetStub {
    replaceSync() {
      // no-op: tests don't depend on actual CSS
    }
  }
  (globalThis as any).CSSStyleSheet = CSSStyleSheetStub;
}

if (!Object.prototype.hasOwnProperty.call(document, "adoptedStyleSheets")) {
  // ensure adoptedStyleSheets is an array so that calls like
  // Object.getOwnPropertyDescriptor(document.adoptedStyleSheets, "length")
  // don't fail with TypeError
  Object.defineProperty(document, "adoptedStyleSheets", {
    configurable: true,
    enumerable: true,
    get() {
      return [] as CSSStyleSheet[];
    },
  });
}
// Make sure ShadowRoot and Element also expose adoptedStyleSheets to prevent
// errors when Stencil/ionic code checks or mutates these arrays.
if (typeof (globalThis as any).ShadowRoot !== "undefined") {
  if (
    !Object.prototype.hasOwnProperty.call(
      (globalThis as any).ShadowRoot.prototype,
      "adoptedStyleSheets",
    )
  ) {
    Object.defineProperty((globalThis as any).ShadowRoot.prototype, "adoptedStyleSheets", {
      configurable: true,
      enumerable: true,
      get() {
        return [] as CSSStyleSheet[];
      },
    });
  }
}
if (!Object.prototype.hasOwnProperty.call(Element.prototype, "adoptedStyleSheets")) {
  Object.defineProperty(Element.prototype, "adoptedStyleSheets", {
    configurable: true,
    enumerable: true,
    get() {
      return [] as CSSStyleSheet[];
    },
  });
}
/* eslint-enable @typescript-eslint/no-explicit-any */
