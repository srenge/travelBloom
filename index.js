// Global state to store the travel data - embedded directly
let travelData = {
    "countries": [
        {
            "id": 1,
            "name": "Australia",
            "cities": [
                {
                    "name": "Sydney, Australia",
                    "imageUrl": "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800",
                    "description": "A vibrant city known for its iconic landmarks like the Sydney Opera House and Sydney Harbour Bridge.",
                    "timezone": "Australia/Sydney"
                },
                {
                    "name": "Melbourne, Australia",
                    "imageUrl": "https://images.unsplash.com/photo-1514395462725-fb4566210144?w=800",
                    "description": "A cultural hub famous for its art, food, and diverse neighborhoods.",
                    "timezone": "Australia/Melbourne"
                }
            ]
        },
        {
            "id": 2,
            "name": "Japan",
            "cities": [
                {
                    "name": "Tokyo, Japan",
                    "imageUrl": "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800",
                    "description": "A bustling metropolis blending tradition and modernity, famous for its cherry blossoms and rich culture.",
                    "timezone": "Asia/Tokyo"
                },
                {
                    "name": "Kyoto, Japan",
                    "imageUrl": "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800",
                    "description": "Known for its historic temples, gardens, and traditional tea houses.",
                    "timezone": "Asia/Tokyo"
                }
            ]
        },
        {
            "id": 3,
            "name": "Brazil",
            "cities": [
                {
                    "name": "Rio de Janeiro, Brazil",
                    "imageUrl": "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800",
                    "description": "A lively city known for its stunning beaches, vibrant carnival celebrations, and iconic landmarks.",
                    "timezone": "America/Sao_Paulo"
                },
                {
                    "name": "São Paulo, Brazil",
                    "imageUrl": "https://images.unsplash.com/photo-1548963670-aaaa8f73a5e9?w=800",
                    "description": "The financial hub with diverse culture, arts, and a vibrant nightlife.",
                    "timezone": "America/Sao_Paulo"
                }
            ]
        },
        {
            "id": 4,
            "name": "Canada",
            "cities": [
                {
                    "name": "Toronto, Canada",
                    "imageUrl": "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=800",
                    "description": "A diverse and cosmopolitan city, Toronto is known for its iconic CN Tower, cultural events, and diverse neighborhoods.",
                    "timezone": "America/Toronto"
                },
                {
                    "name": "Vancouver, Canada",
                    "imageUrl": "https://images.unsplash.com/photo-1559511260-66a654ae982a?w=800",
                    "description": "A coastal seaport city known for its natural beauty, outdoor activities, and diverse culture.",
                    "timezone": "America/Vancouver"
                }
            ]
        }
    ],
    "temples": [
        {
            "id": 1,
            "name": "Angkor Wat, Cambodia",
            "imageUrl": "https://images.unsplash.com/photo-1548180673-7fc3c680c70f?w=800",
            "description": "A UNESCO World Heritage site and the largest religious monument in the world.",
            "timezone": "Asia/Phnom_Penh"
        },
        {
            "id": 2,
            "name": "Taj Mahal, India",
            "imageUrl": "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800",
            "description": "An iconic symbol of love and a masterpiece of Mughal architecture.",
            "timezone": "Asia/Kolkata"
        }
    ],
    "beaches": [
        {
            "id": 1,
            "name": "Bora Bora, French Polynesia",
            "imageUrl": "https://images.unsplash.com/photo-1589197331516-e4d15ad74a2c?w=800",
            "description": "An island known for its stunning turquoise waters and luxurious overwater bungalows.",
            "timezone": "Pacific/Tahiti"
        },
        {
            "id": 2,
            "name": "Copacabana Beach, Brazil",
            "imageUrl": "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800",
            "description": "A famous beach in Rio de Janeiro, Brazil, with a vibrant atmosphere and scenic views.",
            "timezone": "America/Sao_Paulo"
        }
    ]
};

let currentFilter = 'countries';

// Initialize data - no need to fetch anymore
function fetchTravelData() {
    console.log('Travel data loaded successfully:', {
        countries: travelData.countries?.length || 0,
        temples: travelData.temples?.length || 0,
        beaches: travelData.beaches?.length || 0
    });
    displayDestinations(currentFilter);
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

// Get local time for a timezone
function getLocalTime(timezone) {
    try {
        const options = {
            timeZone: timezone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        };
        return new Date().toLocaleTimeString('en-US', options);
    } catch (error) {
        return 'Time not available';
    }
}

// Create a search result card
function createSearchResultCard(item) {
    const card = document.createElement('div');
    card.className = 'search-result-card';
    
    const localTime = item.timezone ? getLocalTime(item.timezone) : 'Time not available';
    const locationName = item.timezone ? item.timezone.split('/')[1].replace('_', ' ') : '';
    
    card.innerHTML = `
        <div class="search-result-time">
            Current Local Time (${locationName}): ${localTime}
        </div>
        <img src="${item.imageUrl}" alt="${item.name}" class="search-result-image">
        <div class="search-result-content">
            <h3 class="search-result-name">${item.name}</h3>
            <p class="search-result-description">${item.description}</p>
            <button class="visit-button">Visit</button>
        </div>
    `;
    
    return card;
}

// Perform search based on keyword
function performSearch(keyword) {
    console.log('Searching for:', keyword);
    
    if (!travelData) {
        console.error('Travel data not loaded');
        return [];
    }
    
    if (!keyword.trim()) {
        return [];
    }
    
    const searchTerm = keyword.toLowerCase().trim();
    let results = [];
    let addedNames = new Set(); // Track added items to avoid duplicates
    
    // Helper function to add unique results
    const addResult = (item) => {
        if (!addedNames.has(item.name)) {
            results.push(item);
            addedNames.add(item.name);
        }
    };
    
    // Search for "beach" or "beaches" keyword
    if (searchTerm === 'beach' || searchTerm === 'beaches') {
        travelData.beaches.forEach(beach => addResult(beach));
        console.log('Found beaches:', results.length);
        return results;
    }
    
    // Search for "temple" or "temples" keyword
    if (searchTerm === 'temple' || searchTerm === 'temples') {
        travelData.temples.forEach(temple => addResult(temple));
        console.log('Found temples:', results.length);
        return results;
    }
    
    // Search for "country" or "countries" keyword - show all cities
    if (searchTerm === 'country' || searchTerm === 'countries') {
        travelData.countries.forEach(country => {
            country.cities.forEach(city => addResult(city));
        });
        console.log('Found all cities:', results.length);
        return results;
    }
    
    // Search for specific country names
    travelData.countries.forEach(country => {
        if (country.name.toLowerCase().includes(searchTerm)) {
            country.cities.forEach(city => addResult(city));
        }
    });
    
    // Search within city names
    travelData.countries.forEach(country => {
        country.cities.forEach(city => {
            if (city.name.toLowerCase().includes(searchTerm)) {
                addResult(city);
            }
        });
    });
    
    // Search within beach names
    travelData.beaches.forEach(beach => {
        if (beach.name.toLowerCase().includes(searchTerm)) {
            addResult(beach);
        }
    });
    
    // Search within temple names
    travelData.temples.forEach(temple => {
        if (temple.name.toLowerCase().includes(searchTerm)) {
            addResult(temple);
        }
    });
    
    // Search in descriptions if no results yet
    if (results.length === 0) {
        // Search city descriptions
        travelData.countries.forEach(country => {
            country.cities.forEach(city => {
                if (city.description.toLowerCase().includes(searchTerm)) {
                    addResult(city);
                }
            });
        });
        
        // Search beach descriptions
        travelData.beaches.forEach(beach => {
            if (beach.description.toLowerCase().includes(searchTerm)) {
                addResult(beach);
            }
        });
        
        // Search temple descriptions
        travelData.temples.forEach(temple => {
            if (temple.description.toLowerCase().includes(searchTerm)) {
                addResult(temple);
            }
        });
    }
    
    console.log('Search results:', results.length);
    return results;
}

// Display search results
function displaySearchResults(results) {
    const searchResultsSection = document.getElementById('search-results');
    const searchResultsGrid = document.getElementById('search-results-grid');
    
    // Clear previous results
    searchResultsGrid.innerHTML = '';
    
    if (results.length === 0) {
        searchResultsGrid.innerHTML = '<div class="no-results">No destinations found. Try searching for countries, cities, beaches, or temples.</div>';
        searchResultsSection.style.display = 'block';
        // Scroll to results
        searchResultsSection.scrollIntoView({ behavior: 'smooth' });
        return;
    }
    
    // Create cards for each result
    results.forEach(result => {
        const card = createSearchResultCard(result);
        searchResultsGrid.appendChild(card);
    });
    
    // Show results section
    searchResultsSection.style.display = 'block';
    
    // Scroll to results
    searchResultsSection.scrollIntoView({ behavior: 'smooth' });
}

// Handle search button click
function handleSearchClick() {
    const searchInput = document.getElementById('search-destination');
    const keyword = searchInput.value;
    
    console.log('Search button clicked, keyword:', keyword);
    
    if (keyword.trim()) {
        const results = performSearch(keyword);
        console.log('Displaying', results.length, 'results');
        displaySearchResults(results);
    } else {
        alert('Please enter a search term');
    }
}

// Handle clear button click
function handleClearClick() {
    const searchInput = document.getElementById('search-destination');
    const searchResultsSection = document.getElementById('search-results');
    
    // Clear input
    searchInput.value = '';
    
    // Hide results section
    searchResultsSection.style.display = 'none';
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Handle Enter key in search input
function handleSearchKeyPress(event) {
    if (event.key === 'Enter') {
        handleSearchClick();
    }
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

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Fetch initial data
    fetchTravelData();
    
    // Add event listeners
    document.querySelector('.filters').addEventListener('click', handleFilterClick);
    
    // Search functionality
    document.getElementById('search-btn').addEventListener('click', handleSearchClick);
    document.getElementById('clear-btn').addEventListener('click', handleClearClick);
    document.getElementById('search-destination').addEventListener('keypress', handleSearchKeyPress);
    
    // Handle booking button click
    document.getElementById('book_now_btn').addEventListener('click', () => {
        alert('Booking feature coming soon!');
    });
    
    // Handle contact form submission
    document.getElementById('contactForm').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (name && email && message) {
            alert(`Thank you, ${name}! Your message has been received. We'll get back to you at ${email} soon.`);
            // Reset form
            document.getElementById('contactForm').reset();
        }
    });
});
