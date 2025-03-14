import { navigateTo } from '../router.mjs';

console.log('app.mjs is loaded successfully');

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js")
    .then((reg) => {
        console.log('Service worker registered', reg);
    });
}

window.addEventListener("load", () => {
    const route = window.location.pathname; // Define the route variable
    navigateTo(route);
});