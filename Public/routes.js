import homeView from "../views/home.js";
import categoryView from "../views/category.js";
import petDetailView from "../views/petDetail.js";
import contactView from "../views/contact.js";

const routes = {
    home: homeView,
    cats: () => categoryView('cats'),
    dogs: () => categoryView('dogs'),
    contact: contactView,
    pet: petDetailView
};

// Function to switch views dynamically
export function navigateTo(route, id = null) {
    const view = routes[route] || homeView;
    document.getElementById("app").innerHTML = view(id);
}
