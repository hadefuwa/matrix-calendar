# OneDrive Alternative Setup - Completely Free!

## 🎯 **Goal: Use OneDrive Instead of GitHub Gist**

This approach uses OneDrive (which you already have) to store calendar data, avoiding the need for premium Power Automate licenses.

---

## 📋 **Step 1: Create OneDrive File**

### **Create the Data File:**
1. **Go to OneDrive** (onedrive.com or OneDrive app)
2. **Create a new folder** called `matrix-calendar`
3. **Inside that folder**, create a new **text file** called `calendar-data.json`
4. **Edit the file** and put this content:
```json
{
  "lastUpdated": "never",
  "meetingRoom": [],
  "trainingRoom": []
}
```
5. **Save the file**

### **Get the Share Link:**
1. **Right-click** the `calendar-data.json` file
2. **Click "Share"**
3. **Set permissions** to "Anyone with the link can view"
4. **Copy the share link** - it will look like:
   ```
   https://1drv.ms/t/s!xxxxxxxxxxxxxxxxx
   ```

---

## 🔄 **Step 2: Update Power Automate Flow**

### **Replace HTTP Action:**
1. **Delete the HTTP action** from your existing flow
2. **Add new action**: Search for **"OneDrive"**
3. **Choose**: "Update file" or "Create file"
4. **Configure**:
   - **File**: Browse to your `calendar-data.json` file
   - **File Content**: Use the same JSON structure as before

### **OneDrive Action Body:**
```json
{
  "lastUpdated": "@{utcNow()}",
  "meetingRoom": @{body('Get_calendar_view_of_events_(V3)')?['value']},
  "trainingRoom": []
}
```

---

## ⚙️ **Step 3: Update Your Electron App**

### **Change the Data Endpoint:**
In your `app.js`, update the CONFIG:

```javascript
const CONFIG = {
    // OneDrive file URL (you'll get this from the share link)
    dataEndpoint: 'https://api.onedrive.com/v1.0/shares/YOUR_SHARE_TOKEN/root/content',
    refreshInterval: 5 * 60 * 1000 // 5 minutes
};
```

### **Convert OneDrive Share Link:**
Your OneDrive share link needs to be converted to a direct API link:

**Original**: `https://1drv.ms/t/s!AbCdEfGhIjKlMnOp`
**Convert to**: `https://api.onedrive.com/v1.0/shares/u!AbCdEfGhIjKlMnOp/root/content`

*(Replace the `s!` with `u!` and add the API path)*

---

## 🎯 **Benefits of OneDrive Approach:**

- ✅ **Completely free** - no premium license needed
- ✅ **Uses existing OneDrive** you already have
- ✅ **Same 5-minute updates** as GitHub approach
- ✅ **Simple Power Automate flow** with free connectors
- ✅ **Works immediately** - no trial periods

---

## 🧪 **Testing:**

1. **Set up the OneDrive file** with initial JSON
2. **Update your Power Automate flow** to use OneDrive
3. **Update your app.js** with the OneDrive URL
4. **Test the flow** - it should update the OneDrive file
5. **Test your app** - click "🔄 Sync Live" to read from OneDrive

---

## 🆘 **If OneDrive Doesn't Work:**

We can try:
- **SharePoint document library** (if you have SharePoint)
- **Outlook email approach** (send JSON to yourself)
- **Excel Online** with Power Automate

**Ready to try the OneDrive approach? It's the most straightforward free alternative!** 🚀
