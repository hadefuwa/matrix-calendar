// Simple Calendar Import App - Clean and Simple

// Check if running in Electron
const isElectron = typeof require !== 'undefined';
let ipcRenderer;

if (isElectron) {
    const { ipcRenderer: electronIpc } = require('electron');
    ipcRenderer = electronIpc;
    console.log('Running in Electron');
}

// Start the app when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Matrix Calendar starting...');
    setupImportButtons();
});

// Set up import button functionality
function setupImportButtons() {
    const importButtons = document.querySelectorAll('.import-btn');
    
    importButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const roomType = button.getAttribute('data-room');
            importCalendar(roomType);
        });
    });
}

// Import calendar for a room
async function importCalendar(roomType) {
    console.log('Importing calendar for:', roomType);
    
    const button = document.querySelector(`[data-room="${roomType}"]`);
    const originalText = button.textContent;
    
    // Show loading state
    button.textContent = 'Importing...';
    button.disabled = true;
    
    try {
        if (isElectron && ipcRenderer) {
            // Use Electron file picker
            const result = await ipcRenderer.invoke('import-calendar-file');
            
            if (result && result.content) {
                const events = parseICSFile(result.content);
                displayEvents(roomType, events, result.fileName);
                
                button.textContent = '✅ Imported';
                button.style.backgroundColor = '#4CAF50';
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    button.textContent = originalText;
                    button.disabled = false;
                    button.style.backgroundColor = '';
                }, 3000);
            } else {
                // User cancelled or error
                button.textContent = originalText;
                button.disabled = false;
            }
        } else {
            // Web version - show instructions
            alert('Please use the desktop version to import calendar files.');
            button.textContent = originalText;
            button.disabled = false;
        }
        
    } catch (error) {
        console.error('Import failed:', error);
        alert('Import failed: ' + error.message);
        button.textContent = originalText;
        button.disabled = false;
    }
}

// Simple ICS parser
function parseICSFile(icsContent) {
    const events = [];
    const lines = icsContent.split('\n');
    let currentEvent = null;
    
    for (let line of lines) {
        line = line.trim();
        
        if (line === 'BEGIN:VEVENT') {
            currentEvent = {};
        } else if (line === 'END:VEVENT' && currentEvent) {
            if (currentEvent.summary && currentEvent.dtstart) {
                events.push(currentEvent);
            }
            currentEvent = null;
        } else if (currentEvent) {
            if (line.startsWith('SUMMARY:')) {
                currentEvent.summary = line.substring(8);
            } else if (line.startsWith('DTSTART')) {
                const match = line.match(/DTSTART[^:]*:(.+)/);
                if (match) {
                    currentEvent.dtstart = parseICSDate(match[1]);
                }
            } else if (line.startsWith('DTEND')) {
                const match = line.match(/DTEND[^:]*:(.+)/);
                if (match) {
                    currentEvent.dtend = parseICSDate(match[1]);
                }
            } else if (line.startsWith('LOCATION:')) {
                currentEvent.location = line.substring(9);
            }
        }
    }
    
    return events;
}

// Parse ICS date format
function parseICSDate(icsDate) {
    icsDate = icsDate.replace(/[TZ]/g, '');
    
    if (icsDate.length >= 8) {
        const year = icsDate.substring(0, 4);
        const month = icsDate.substring(4, 6);
        const day = icsDate.substring(6, 8);
        const hour = icsDate.substring(8, 10) || '00';
        const minute = icsDate.substring(10, 12) || '00';
        
        return new Date(year, month - 1, day, hour, minute);
    }
    
    return new Date();
}

// Display events for a room
function displayEvents(roomType, events, fileName) {
    const container = document.getElementById(roomType + '-calendar');
    if (!container) return;
    
    // Sort events by date
    events.sort((a, b) => a.dtstart - b.dtstart);
    
    // Filter for next 7 days
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    const upcomingEvents = events.filter(event => 
        event.dtstart >= today && event.dtstart <= nextWeek
    );
    
    // Create HTML
    let html = `
        <div class="file-info">
            <strong>📁 ${fileName}</strong>
            <span>${upcomingEvents.length} upcoming events</span>
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