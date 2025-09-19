# Matrix Calendar - Outlook Add-in

## 🎯 **Live Calendar Access for Meeting Rooms**

This Outlook add-in gives you **real-time access** to your meeting room calendars directly within Outlook - no admin privileges required!

## ✨ **Features**

- ✅ **Live calendar data** - Always up-to-date
- ✅ **Side panel in Outlook** - Convenient access
- ✅ **Multiple room calendars** - Meeting Room & Training Room
- ✅ **Auto-refresh** - Updates every 5 minutes
- ✅ **No admin approval needed** - Uses your existing permissions
- ✅ **Works in Outlook Web & Desktop** - Universal compatibility

## 🚀 **Quick Installation**

### **Step 1: Host Your Add-in**

You need to host the add-in files online. **GitHub Pages** is free and perfect for this:

1. **Create a new GitHub repository** called `matrix-calendar-addin`
2. **Upload these files** to the repository:
   ```
   outlook-addin/
   ├── index.html
   ├── manifest.xml
   └── assets/
       ├── icon-16.png
       ├── icon-32.png
       ├── icon-64.png
       └── icon-80.png
   ```
3. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Select "Deploy from a branch" → "main" → "/ (root)"
   - Your add-in will be available at: `https://your-username.github.io/matrix-calendar-addin/`

### **Step 2: Update Manifest URLs**

Edit `manifest.xml` and replace all instances of:
```xml
https://your-github-username.github.io/matrix-calendar-addin/
```

With your actual GitHub Pages URL.

### **Step 3: Install in Outlook**

#### **Outlook Web (outlook.office365.com):**
1. Go to outlook.office365.com
2. Click the **Settings gear** → **View all Outlook settings**
3. Go to **General** → **Manage add-ins**
4. Click **+ Add a custom add-in** → **Add from file**
5. Upload your `manifest.xml` file
6. Click **Install**

#### **Outlook Desktop:**
1. Open Outlook desktop app
2. Go to **File** → **Manage Add-ins**
3. Click **+ Add a custom add-in** → **Add from file**
4. Select your `manifest.xml` file
5. Click **Install**

### **Step 4: Use the Add-in**

1. **In Outlook**, you'll see a new **"Room Calendars"** button in the ribbon
2. **Click the button** to open the Matrix Calendar side panel
3. **View your meeting rooms** with live calendar data
4. **Refresh anytime** using the 🔄 buttons

## 🔧 **Customization**

### **Adding More Rooms**

Edit `index.html` and add new calendar sections:

```html
<div class="calendar-section">
    <div class="calendar-header">
        <span>🏢 Your New Room</span>
        <button class="refresh-btn" onclick="refreshCalendar('newroom')">🔄</button>
    </div>
    <div class="calendar-content" id="newroom-events">
        <div class="no-events">No events loaded</div>
    </div>
</div>
```

### **Changing Room Names**

Update the room names in the HTML to match your actual room calendars:
- "Upstairs Meeting Room" → Your actual room name
- "Training Room" → Your actual room name

### **Styling**

The add-in uses your Matrix theme colors. You can customize the CSS in the `<style>` section of `index.html`.

## 🔄 **How It Works**

1. **Runs inside Outlook** - Uses your existing calendar permissions
2. **Accesses calendar APIs** - Gets live data from Outlook's calendar service
3. **Displays in side panel** - Clean, organized view of room schedules
4. **Auto-refreshes** - Keeps data current every 5 minutes

## 📱 **Compatibility**

- ✅ **Outlook Web App** (outlook.office365.com)
- ✅ **Outlook Desktop** (Windows & Mac)
- ✅ **Outlook Mobile** (iOS & Android)
- ✅ **All Office 365 tenants**

## 🛠️ **Development Mode**

For testing during development:

1. **Use a local web server**:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx http-server
   ```

2. **Update manifest.xml** to use `http://localhost:8000/`

3. **Install the local manifest** in Outlook for testing

## 🔒 **Security & Privacy**

- ✅ **No external servers** - All data stays within Microsoft's ecosystem
- ✅ **Uses your permissions** - Only accesses calendars you can already see
- ✅ **No data collection** - No tracking or analytics
- ✅ **Open source** - All code is visible and auditable

## 🆘 **Troubleshooting**

**Add-in won't install?**
- Check that manifest.xml URLs are correct and accessible
- Ensure GitHub Pages is enabled and working

**No calendar data showing?**
- Check browser console for errors (F12)
- Verify you have access to the room calendars in Outlook
- Try refreshing with the 🔄 buttons

**Add-in not appearing in Outlook?**
- Wait a few minutes after installation
- Try refreshing Outlook or restarting the app
- Check that the add-in is enabled in Outlook settings

## 📞 **Support**

If you need help:
1. Check the browser console for error messages (F12)
2. Verify your GitHub Pages URL is working
3. Test the manifest.xml in Outlook's add-in validator

---

**This add-in gives you exactly what you wanted: live meeting room calendars with no admin privileges required!** 🎉
