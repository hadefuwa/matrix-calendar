// Simple Matrix Calendar App - Direct Calendar Embedding

console.log('Matrix Calendar loaded - Direct calendar embedding mode');

// Start the app when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Matrix Calendar starting - Direct calendar embedding...');
    
    // Show loading indicator briefly
    showLoadingIndicator();
    
    // Hide loading after a short delay to let calendars load
    setTimeout(() => {
        hideLoadingIndicator();
    }, 2000);
});

// Show loading indicator
function showLoadingIndicator() {
    const calendars = document.querySelectorAll('.calendar-content');
    calendars.forEach(container => {
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'loading-indicator';
        loadingDiv.innerHTML = `
            <div class="loading-spinner"></div>
            <p>Loading calendar...</p>
        `;
        container.appendChild(loadingDiv);
    });
}

// Hide loading indicator
function hideLoadingIndicator() {
    const loadingIndicators = document.querySelectorAll('.loading-indicator');
    loadingIndicators.forEach(indicator => {
        indicator.remove();
    });
}

// Simple utility functions
function formatDate(date) {
    return date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
    });
}

function formatTime(date) {
    return date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
    });
}

console.log('Matrix Calendar ready');