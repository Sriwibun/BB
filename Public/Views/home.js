export default function homeView() {
    return `
        <h1>Available Pets for Adoption</h1>
        <div id="pet-list">Loading pets...</div>
    `;
}

// Function to fetch and display pets
async function loadPets() {
    if (window.location.hash === "#home" || window.location.hash === "") {
        const pets = await getPets();
        const petListContainer = document.getElementById("pet-list");

        petListContainer.innerHTML = pets.map(pet => `
            <div class="pet-card">
                <img src="${pet.image}" alt="${pet.name}" class="pet-image">
                <h3>${pet.name}</h3>
                <p>${pet.breed} - ${pet.age} years old</p>
                <button onclick="window.location.hash='#pet/${pet.id}'">View Details</button>
            </div>
        `).join("");
    }
}

// Load pets when the page loads
window.addEventListener("load", loadPets);
