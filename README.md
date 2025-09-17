# Matrix Calendar - Outlook Calendars PWA

A Progressive Web App (PWA) that displays multiple Outlook calendars in one convenient view. Perfect for viewing multiple team calendars or different calendar views simultaneously.

## 🚀 Features

- **Multiple Calendar View**: Display up to 3 Outlook calendars side by side
- **Progressive Web App**: Install on any device for native app-like experience
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Offline Ready**: Basic functionality available even without internet connection
- **Easy Installation**: One-click install on supported devices
- **GitHub Pages Ready**: Deployed and hosted for free on GitHub Pages

## 📱 Installation

### As a Web App
1. Visit the live site: `https://hadefuwa.github.io/matrix-calendar/`
2. Click the "Install App" button when prompted
3. The app will be added to your device's home screen

### Local Development
1. Clone this repository
2. Open `create-icons.html` in your browser
3. Download all the required icon sizes (72, 96, 128, 144, 152, 192, 384, 512)
4. Save the icons in the root directory
5. Open `index.html` in your browser

## 🛠️ Setup Instructions

### 1. Get Your Outlook Calendar URLs
1. Go to Outlook Web App (outlook.office365.com)
2. Navigate to Calendar
3. Click "Share" on the calendar you want to display
4. Choose "Publish a calendar" 
5. Select "Can view all details"
6. Copy the HTML embed URL

### 2. Update Calendar URLs
Edit the `index.html` file and replace the calendar URLs in the iframe `src` attributes:

```html
<!-- Replace these URLs with your actual calendar URLs -->
<iframe 
    id="calendar1" 
    src="YOUR_CALENDAR_1_URL_HERE"
    title="Outlook Calendar 1">
</iframe>
```

### 3. Deploy to GitHub Pages
1. Create a new repository on GitHub
2. Upload all files to the repository
3. Go to repository Settings > Pages
4. Select "Deploy from a branch"
5. Choose "main" branch and "/ (root)" folder
6. Click Save
7. Your app will be available at `https://yourusername.github.io/repository-name`

## 📁 File Structure

```
matrix-calendar/
├── index.html          # Main app page
├── styles.css          # App styling
├── app.js             # App functionality
├── manifest.json      # PWA manifest
├── service-worker.js  # Offline functionality
├── create-icons.html  # Icon generator tool
├── icon-*.png        # App icons (various sizes)
└── README.md         # This file
```

## 🔧 Customization

### Changing Calendar Titles
Edit the `<h2>` tags in `index.html`:
```html
<h2>Your Custom Calendar Name</h2>
```

### Updating App Name
1. Change the title in `index.html`
2. Update the name in `manifest.json`
3. Modify the header text in `index.html`

### Styling Changes
Edit `styles.css` to customize:
- Colors and themes
- Layout and spacing
- Responsive breakpoints
- Animation effects

## 🌐 Browser Support

- ✅ Chrome 67+
- ✅ Firefox 63+
- ✅ Safari 11.1+
- ✅ Edge 79+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📋 Requirements

- Modern web browser with JavaScript enabled
- Internet connection for calendar data
- HTTPS hosting for PWA features (GitHub Pages provides this automatically)

## 🔒 Privacy & Security

- No data is stored on external servers
- Calendar data comes directly from Microsoft Outlook
- All caching is done locally on your device
- No tracking or analytics included

## 🐛 Troubleshooting

### Calendars Not Loading
1. Check that your calendar URLs are correct and publicly accessible
2. Ensure calendars are published with "Can view all details" permission
3. Try refreshing the page or clearing browser cache

### PWA Install Not Working
1. Make sure you're accessing via HTTPS
2. Check that all icon files are present
3. Verify manifest.json is valid

### Mobile Display Issues
1. The app is designed to be responsive
2. On mobile, calendars stack vertically for better viewing
3. Pinch to zoom is supported for detailed calendar viewing

## 🔄 Updates

To update the app:
1. Make changes to your files
2. Commit and push to your GitHub repository
3. GitHub Pages will automatically deploy the updates
4. Users will get the update next time they visit or refresh

## 📞 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review browser console for error messages
3. Ensure all files are uploaded correctly to GitHub

## 📄 License

This project is open source and available under the MIT License.

---

**Note**: This app requires your Outlook calendars to be published and publicly accessible. Make sure you're comfortable with the privacy implications before publishing sensitive calendar information.
