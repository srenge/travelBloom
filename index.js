// Global state to store the travel data
let travelData = null;
let currentFilter = 'countries';

// Fetch the travel data
async function fetchTravelData() {
    try {
        const response = await fetch('./travel_recommendation.json');
        travelData = await response.json();
        displayDestinations(currentFilter);
    } catch (error) {
        console.error('Error fetching travel data:', error);
    }
}

// Display destinations based on the current filter
function displayDestinations(filter) {
    const destinationsGrid = document.getElementById('destinations-grid');
    destinationsGrid.innerHTML = '';

    let items = [];
    if (filter === 'countries') {
        items = travelData.countries.flatMap(country => country.cities);
    } else {
        items = travelData[filter];
    }

    items.forEach(item => {
        const card = createDestinationCard(item);
        destinationsGrid.appendChild(card);
    });
}

// Create a destination card element
function createDestinationCard(destination) {
    const card = document.createElement('div');
    card.className = 'destination-card';
    
    card.innerHTML = `
        <img src="${destination.imageUrl}" alt="${destination.name}">
        <div class="destination-info">
            <h3>${destination.name}</h3>
            <p>${destination.description}</p>
        </div>
    `;
    
    return card;
}

// Handle filter button clicks
function handleFilterClick(event) {
    if (!event.target.matches('.filter-btn')) return;
    
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Update displayed destinations
    currentFilter = event.target.dataset.filter;
    displayDestinations(currentFilter);
}

// Handle search functionality
function handleSearch(event) {
    const searchQuery = event.target.value.toLowerCase();
    const destinationsGrid = document.getElementById('destinations-grid');
    const cards = destinationsGrid.getElementsByClassName('destination-card');

    Array.from(cards).forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(searchQuery) || description.includes(searchQuery)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Fetch initial data
    fetchTravelData();
    
    // Add event listeners
    document.querySelector('.filters').addEventListener('click', handleFilterClick);
    document.getElementById('search-destination').addEventListener('input', handleSearch);
    
    // Handle booking button click
    document.getElementById('book_now_btn').addEventListener('click', () => {
        alert('Booking feature coming soon!');
    });
});
