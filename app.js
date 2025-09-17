// Simple PWA Calendar App - Main JavaScript File

// Wait for the page to load completely
document.addEventListener('DOMContentLoaded', function() {
    console.log('Calendar app is starting...');
    
    // Initialize the app
    initializeApp();
});

// Main function to start the app
function initializeApp() {
    // Show loading indicator
    showLoading();
    
    // Set up PWA features
    setupPWA();
    
    // Load calendars after a short delay to show loading
    setTimeout(function() {
        loadCalendars();
    }, 1500);
    
    // Set up install prompt
    setupInstallPrompt();
}

// Show loading spinner
function showLoading() {
    const loadingElement = document.getElementById('loading');
    const calendarContainer = document.getElementById('calendar-container');
    const errorMessage = document.getElementById('error-message');
    
    if (loadingElement) {
        loadingElement.style.display = 'block';
    }
    if (calendarContainer) {
        calendarContainer.style.display = 'none';
    }
    if (errorMessage) {
        errorMessage.style.display = 'none';
    }
}

// Hide loading and show calendars
function showCalendars() {
    const loadingElement = document.getElementById('loading');
    const calendarContainer = document.getElementById('calendar-container');
    
    if (loadingElement) {
        loadingElement.style.display = 'none';
    }
    if (calendarContainer) {
        calendarContainer.style.display = 'block';
    }
}

// Show error message
function showError() {
    const loadingElement = document.getElementById('loading');
    const calendarContainer = document.getElementById('calendar-container');
    const errorMessage = document.getElementById('error-message');
    
    if (loadingElement) {
        loadingElement.style.display = 'none';
    }
    if (calendarContainer) {
        calendarContainer.style.display = 'none';
    }
    if (errorMessage) {
        errorMessage.style.display = 'block';
    }
}

// Load and display calendars
function loadCalendars() {
    console.log('Loading calendars...');
    
    // Get all calendar iframes
    const calendar1 = document.getElementById('calendar1');
    const calendar2 = document.getElementById('calendar2');
    const calendar3 = document.getElementById('calendar3');
    
    // Counter to track loaded calendars
    let loadedCount = 0;
    const totalCalendars = 3;
    
    // Function to handle when a calendar loads
    function onCalendarLoad() {
        loadedCount++;
        console.log('Calendar loaded:', loadedCount + '/' + totalCalendars);
        
        // If all calendars are loaded, show them
        if (loadedCount === totalCalendars) {
            showCalendars();
        }
    }
    
    // Function to handle calendar load errors
    function onCalendarError() {
        console.log('Error loading calendar');
        // Even if some calendars fail, show what we can after timeout
        setTimeout(function() {
            if (loadedCount > 0) {
                showCalendars();
            } else {
                showError();
            }
        }, 3000);
    }
    
    // Set up event listeners for calendar iframes
    if (calendar1) {
        calendar1.addEventListener('load', onCalendarLoad);
        calendar1.addEventListener('error', onCalendarError);
    }
    
    if (calendar2) {
        calendar2.addEventListener('load', onCalendarLoad);
        calendar2.addEventListener('error', onCalendarError);
    }
    
    if (calendar3) {
        calendar3.addEventListener('load', onCalendarLoad);
        calendar3.addEventListener('error', onCalendarError);
    }
    
    // Fallback: show calendars after 10 seconds regardless
    setTimeout(function() {
        console.log('Timeout reached, showing calendars anyway');
        showCalendars();
    }, 10000);
}

// Set up PWA (Progressive Web App) features
function setupPWA() {
    // Register service worker if supported
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js')
            .then(function(registration) {
                console.log('Service Worker registered successfully');
            })
            .catch(function(error) {
                console.log('Service Worker registration failed:', error);
            });
    }
}

// Set up app install prompt
function setupInstallPrompt() {
    let deferredPrompt;
    const installPrompt = document.getElementById('install-prompt');
    const installButton = document.getElementById('install-button');
    const dismissButton = document.getElementById('dismiss-install');
    
    // Listen for the beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', function(event) {
        console.log('Install prompt available');
        
        // Prevent the default prompt
        event.preventDefault();
        
        // Save the event for later use
        deferredPrompt = event;
        
        // Show our custom install prompt
        if (installPrompt) {
            installPrompt.style.display = 'flex';
        }
    });
    
    // Handle install button click
    if (installButton) {
        installButton.addEventListener('click', function() {
            if (deferredPrompt) {
                // Show the install prompt
                deferredPrompt.prompt();
                
                // Wait for user choice
                deferredPrompt.userChoice.then(function(choiceResult) {
                    if (choiceResult.outcome === 'accepted') {
                        console.log('User accepted the install prompt');
                    } else {
                        console.log('User dismissed the install prompt');
                    }
                    
                    // Clear the prompt
                    deferredPrompt = null;
                    
                    // Hide our prompt
                    if (installPrompt) {
                        installPrompt.style.display = 'none';
                    }
                });
            }
        });
    }
    
    // Handle dismiss button click
    if (dismissButton) {
        dismissButton.addEventListener('click', function() {
            if (installPrompt) {
                installPrompt.style.display = 'none';
            }
        });
    }
    
    // Hide install prompt if app is already installed
    window.addEventListener('appinstalled', function() {
        console.log('App was installed');
        if (installPrompt) {
            installPrompt.style.display = 'none';
        }
    });
}

// Handle online/offline status
window.addEventListener('online', function() {
    console.log('App is online');
    // Reload calendars when coming back online
    location.reload();
});

window.addEventListener('offline', function() {
    console.log('App is offline');
    // You could show an offline message here if needed
});

// Simple error handling for the whole app
window.addEventListener('error', function(error) {
    console.log('App error:', error);
    // Don't show error for minor issues, just log them
});

// Handle page visibility changes (when user switches tabs)
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        console.log('Page is visible again');
        // You could refresh calendars here if needed
    }
});

console.log('App JavaScript loaded successfully');
