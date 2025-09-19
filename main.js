// Matrix Calendar - Electron Main Process
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;

// Create the main window
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        minWidth: 800,
        minHeight: 600,
        icon: path.join(__dirname, 'assets', 'matrix-logo.png'),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        show: false
    });

    mainWindow.loadFile('index.html');
    
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

// App event handlers
app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// Handle calendar file import
ipcMain.handle('import-calendar-file', async () => {
    try {
        const result = await dialog.showOpenDialog(mainWindow, {
            title: 'Select Calendar File',
            filters: [
                { name: 'Calendar Files', extensions: ['ics', 'ical'] },
                { name: 'All Files', extensions: ['*'] }
            ],
            properties: ['openFile']
        });

        if (result.canceled) {
            return null;
        }

        const filePath = result.filePaths[0];
        const fileContent = fs.readFileSync(filePath, 'utf8');
        
        return {
            fileName: path.basename(filePath),
            content: fileContent,
            filePath: filePath
        };
        
    } catch (error) {
        return { error: error.message };
    }
});
