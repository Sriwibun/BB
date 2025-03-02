if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js");
}

import { navigateTo } from "./routes.js";

// Load the correct page when the app starts
window.addEventListener("load", () => {
    const route = window.location.hash.substring(1) || "home";
    navigateTo(route);
});

// Update the view when the user changes the URL
window.addEventListener("hashchange", () => {
    const route = window.location.hash.substring(1);
    navigateTo(route);
});
