const routes = {
    "/":"/public/templates/home.html",
    "/add":"/public/templates/add.html",
    "/remove":"/public/templates/remove.html",
};

async function navigateTo(event) {
    if (event) event.preventDefault();
    history.pushState({}, "", path);

    const template = routes[path] || routes["/"];
    const content = await fetch(template).then(res => res.text());
    document.getElementById("app").innerHTML = content;
}

window.onpopstate = () => navigateTo(null, window.location.pathname);
document.addEventListener("DOMContentLoaded", () => navigateTo(null, window.location.pathname));
export { navigateTo };