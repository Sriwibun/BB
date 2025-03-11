const routes = {
    "/":"/public/templates/home.html",
    "/add":"/public/templates/add.html",
    "/remove":"/public/templates/remove.html",
};

async function navigateTo(path) {
    history.pushState({}, "", path);

    const response = await fetch(routes[path]);
    const html = await response.text();

    document.getElementById("app").innerHTML = html;
}

window.onpopstate = () => {
    navigateTo(window.location.pathname);
};

document.addEventListener("DOMContentLoaded", () => {
    navigateTo(window.location.pathname);
});