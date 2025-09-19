// Simple Calendar Import App - Clean and Simple

// Check if running in Electron
const isElectron = typeof require !== 'undefined';
let ipcRenderer;

if (isElectron) {
    const { ipcRenderer: electronIpc } = require('electron');
    ipcRenderer = electronIpc;
    console.log('Running in Electron');
}

// Configuration for web endpoint
const CONFIG = {
    // GitHub Gist URL for calendar data
    dataEndpoint: 'https://gist.githubusercontent.com/hadefuwa/627f54c72d2eeea07abb4f882c69434a/raw/f9d31fa607d84d7e6ae384238b50ebd6f0c1603d/matrix-calendar-data.json',
    refreshInterval: 5 * 60 * 1000 // 5 minutes
};

// Start the app when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Matrix Calendar starting - Live sync only mode...');
    setupSyncButtons();
    
    // Load live data on startup
    loadLiveData();
    
    // Set up auto-refresh every 5 minutes
    setInterval(loadLiveData, CONFIG.refreshInterval);
});

// Live sync only - no import functionality needed

// Set up sync button functionality
function setupSyncButtons() {
    const syncButtons = document.querySelectorAll('.sync-btn');
    
    syncButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const roomType = button.getAttribute('data-room');
            syncLiveData(roomType);
        });
    });
}

// Load live data from web endpoint
async function loadLiveData() {
    console.log('Loading live calendar data...');
    
    try {
        const response = await fetch(CONFIG.dataEndpoint);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('Live data loaded:', data);
        
        // Update both rooms with live data
        if (data.meetingRoom) {
            displayLiveEvents('meeting', data.meetingRoom, data.lastUpdated);
        }
        if (data.trainingRoom) {
            displayLiveEvents('training', data.trainingRoom, data.lastUpdated);
        }
        
        // Update sync button states
        updateSyncButtonStates('success');
        
    } catch (error) {
        console.error('Failed to load live data:', error);
        updateSyncButtonStates('error');
        
        // Show helpful message for first-time setup
        if (CONFIG.dataEndpoint.includes('YOUR_USERNAME')) {
            showSetupMessage();
        }
    }
}

// Sync live data for specific room
async function syncLiveData(roomType) {
    console.log('Syncing live data for room:', roomType);
    
    const button = document.querySelector(`.sync-btn[data-room="${roomType}"]`);
    if (button) {
        const originalText = button.textContent;
        button.textContent = '⏳ Syncing...';
        button.disabled = true;
    }
    
    try {
        await loadLiveData();
        
        if (button) {
            button.textContent = '✅ Synced';
            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
            }, 2000);
        }
        
    } catch (error) {
        if (button) {
            button.textContent = '❌ Failed';
            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
            }, 2000);
        }
    }
}

// Display live events from web endpoint
function displayLiveEvents(roomType, events, lastUpdated) {
    const container = document.getElementById(roomType + '-calendar');
    if (!container) return;
    
    // Convert events to our format
    const convertedEvents = events.map(event => ({
        summary: event.title,
        dtstart: new Date(event.start),
        dtend: new Date(event.end),
        location: event.location || ''
    }));
    
    // Filter for next 7 days
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    const upcomingEvents = convertedEvents.filter(event => 
        event.dtstart >= today && event.dtstart <= nextWeek
    );
    
    // Create HTML
    let html = `
        <div class="file-info">
            <strong>🔄 Live Data</strong>
            <span>Last updated: ${formatLastUpdated(lastUpdated)}</span>
        </div>
    `;
    
    if (upcomingEvents.length === 0) {
        html += '<div class="no-events">No events in the next 7 days</div>';
    } else {
        html += '<div class="events-list">';
        upcomingEvents.forEach(event => {
            const date = formatDate(event.dtstart);
            const time = formatTime(event.dtstart);
            const endTime = event.dtend ? formatTime(event.dtend) : '';
            
            html += `
                <div class="event">
                    <div class="event-date">${date}</div>
                    <div class="event-time">${time}${endTime ? ' - ' + endTime : ''}</div>
                    <div class="event-title">${escapeHtml(event.summary)}</div>
                    ${event.location ? `<div class="event-location">📍 ${escapeHtml(event.location)}</div>` : ''}
                </div>
            `;
        });
        html += '</div>';
    }
    
    container.innerHTML = html;
}

// Update sync button states
function updateSyncButtonStates(state) {
    const syncButtons = document.querySelectorAll('.sync-btn');
    
    syncButtons.forEach(button => {
        if (state === 'success') {
            button.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
            button.disabled = false;
        } else if (state === 'error') {
            button.style.background = '#dc3545';
            button.disabled = false;
        }
    });
}

// Show setup message for first-time users
function showSetupMessage() {
    const containers = ['meeting-calendar', 'training-calendar'];
    
    containers.forEach(containerId => {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = `
                <div class="setup-message">
                    <h3>🚀 Setup Required</h3>
                    <p>To enable live sync, you need to:</p>
                    <ol>
                        <li>Set up Power Automate flows</li>
                        <li>Create a GitHub Gist endpoint</li>
                        <li>Update the CONFIG in app.js</li>
                    </ol>
                    <p><strong>Check the setup guides for detailed instructions!</strong></p>
                    <p>The app will automatically refresh calendar data every 5 minutes once configured.</p>
                </div>
            `;
        }
    });
}

// Format last updated time
function formatLastUpdated(timestamp) {
    if (!timestamp || timestamp === 'never') {
        return 'Never';
    }
    
    const date = new Date(timestamp);
    const now = new Date();
    const diffMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffMinutes < 1) {
        return 'Just now';
    } else if (diffMinutes < 60) {
        return `${diffMinutes} min ago`;
    } else {
        const diffHours = Math.floor(diffMinutes / 60);
        return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    }
}

// Removed import functionality - live sync only

// All offline functionality removed - live sync only

// Format date for display
function formatDate(date) {
    const today = new Date();
    const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
    
    if (date.toDateString() === today.toDateString()) {
        return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
        return 'Tomorrow';
    } else {
        return date.toLocaleDateString('en-US', { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric' 
        });
    }
}

// Format time for display
function formatTime(date) {
    return date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
    });
}

// Escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

console.log('Matrix Calendar loaded');