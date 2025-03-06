const routes = {
    "/":"/public/templates/home.html",
    "/add":"/public/templates/add.html",
    "/remove":"/public/templates/remove.html",
};

async function navigateTo(event) {
    if (event) event.preventDefault();
    const path = window.location.pathname;
    const route = routes[path] || routes ["/"];

    const content = await fetch(route).then(res => res.text());
    document.getElementById("app").innerHTML = content;
}

window.onpopstate = navigateTo;
document.addEventListener("DOMContentLoaded", navigateTo);
export { navigateTo };