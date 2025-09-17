// Simple PWA Calendar App - Main JavaScript File

// Wait for the page to load completely
document.addEventListener('DOMContentLoaded', function() {
    console.log('Calendar app is starting...');
    
    // Initialize the app
    initializeApp();
    
    // Initialize navigation
    initializeNavigation();
    
    // Initialize booking functionality
    initializeBooking();
});

// Main function to start the app
function initializeApp() {
    // Hide loading indicator immediately
    hideLoading();
    
    // Set up PWA features
    setupPWA();
    
    // Show calendars container by default (but don't load calendar content)
    showCalendarsContainer();
    
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

// Hide loading indicator
function hideLoading() {
    const loadingElement = document.getElementById('loading');
    if (loadingElement) {
        loadingElement.style.display = 'none';
    }
}

// Show calendars container (but don't load calendar content)
function showCalendarsContainer() {
    const calendarContainer = document.getElementById('calendar-container');
    if (calendarContainer) {
        calendarContainer.style.display = 'flex';
    }
}

// Hide loading and show calendars (legacy function for compatibility)
function showCalendars() {
    hideLoading();
    showCalendarsContainer();
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

// Navigation functionality
function initializeNavigation() {
    const navTabs = document.querySelectorAll('.nav-tab');
    const calendarContainer = document.getElementById('calendar-container');
    const bookingContainer = document.getElementById('booking-container');
    let calendarsLoaded = false;
    
    navTabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            const tabType = tab.getAttribute('data-tab');
            
            // Remove active class from all tabs
            navTabs.forEach(function(t) { t.classList.remove('active'); });
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Show/hide containers
            if (tabType === 'calendars') {
                calendarContainer.style.display = 'flex';
                bookingContainer.style.display = 'none';
                
                // Auto-load calendars when switching to calendar tab (only once)
                if (!calendarsLoaded) {
                    loadCalendarsOnDemand();
                    calendarsLoaded = true;
                }
            } else if (tabType === 'booking') {
                calendarContainer.style.display = 'none';
                bookingContainer.style.display = 'block';
            }
        });
    });
}

// Load calendars when switching to calendar tab
function loadCalendarsOnDemand() {
    const calendars = [
        { id: 'calendar1', dataAttr: 'data-src' },
        { id: 'calendar2', dataAttr: 'data-src' },
        { id: 'calendar3', dataAttr: 'data-src' }
    ];
    
    calendars.forEach(function(cal) {
        const iframe = document.getElementById(cal.id);
        if (iframe && iframe.getAttribute(cal.dataAttr)) {
            iframe.src = iframe.getAttribute(cal.dataAttr);
            iframe.removeAttribute(cal.dataAttr);
        }
    });
}

// Booking functionality
function initializeBooking() {
    const bookingButtons = document.querySelectorAll('.booking-btn');
    const roomButtons = document.querySelectorAll('.room-btn');
    let selectedRoom = 'meeting';
    let countdownInterval;
    
    // Handle booking button clicks
    bookingButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const duration = parseInt(button.getAttribute('data-duration'));
            bookRoom(selectedRoom, duration);
        });
    });
    
    // Handle room selection
    roomButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            roomButtons.forEach(function(btn) { btn.classList.remove('active'); });
            button.classList.add('active');
            
            selectedRoom = button.getAttribute('data-room');
            updateSelectedRoomName(selectedRoom);
        });
    });
    
    // Start countdown timer
    startCountdownTimer();
}

function bookRoom(room, duration) {
    const roomNames = {
        'meeting': 'Meeting Room',
        'training': 'Training Room',
        'dev': 'Dev Room'
    };
    
    const roomName = roomNames[room];
    const endTime = new Date(Date.now() + (duration * 60 * 1000));
    
    // Show booking confirmation
    alert('Booked ' + roomName + ' for ' + duration + ' minutes until ' + endTime.toLocaleTimeString());
    
    // Update countdown with new booking
    updateCountdownWithBooking(endTime);
}

function updateSelectedRoomName(room) {
    const roomNames = {
        'meeting': 'Meeting Room',
        'training': 'Training Room',
        'dev': 'Dev Room'
    };
    
    const selectedRoomNameElement = document.getElementById('selected-room-name');
    if (selectedRoomNameElement) {
        selectedRoomNameElement.textContent = roomNames[room];
    }
}

function startCountdownTimer() {
    // Default to next hour for demo
    const nextHour = new Date();
    nextHour.setHours(nextHour.getHours() + 1);
    nextHour.setMinutes(0);
    nextHour.setSeconds(0);
    
    updateCountdownDisplay(nextHour);
    
    countdownInterval = setInterval(function() {
        updateCountdownDisplay(nextHour);
    }, 1000);
}

function updateCountdownWithBooking(endTime) {
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }
    
    countdownInterval = setInterval(function() {
        updateCountdownDisplay(endTime);
    }, 1000);
}

function updateCountdownDisplay(targetTime) {
    const now = new Date();
    const timeDiff = targetTime - now;
    
    if (timeDiff <= 0) {
        document.getElementById('countdown-hours').textContent = '00';
        document.getElementById('countdown-minutes').textContent = '00';
        document.getElementById('countdown-seconds').textContent = '00';
        return;
    }
    
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    
    document.getElementById('countdown-hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('countdown-minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('countdown-seconds').textContent = seconds.toString().padStart(2, '0');
}

console.log('App JavaScript loaded successfully');
