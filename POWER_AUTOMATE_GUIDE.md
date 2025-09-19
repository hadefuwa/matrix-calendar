# Power Automate Setup Guide

## 🎯 **Goal: Automatically Export Calendar Data Every 5 Minutes**

This guide shows you how to create Power Automate flows that automatically export your meeting room calendars to a web endpoint.

## 📋 **Prerequisites**

1. ✅ **Access to Power Automate** - Check: https://powerautomate.microsoft.com
2. ✅ **GitHub account** - For the data endpoint
3. ✅ **Outlook calendar access** - You can see the meeting room calendars

## 🚀 **Step 1: Create GitHub Gist (Data Storage)**

### **Create the Gist:**
1. Go to: **https://gist.github.com**
2. **Create new gist** with:
   - **Filename**: `matrix-calendar-data.json`
   - **Content**: 
   ```json
   {
     "lastUpdated": "never",
     "meetingRoom": [],
     "trainingRoom": []
   }
   ```
3. Set to **Public**
4. Click **Create public gist**

### **Get the URLs:**
- **Raw URL**: Copy the "Raw" button URL (ends with `.json`)
- **API URL**: Replace `gist.githubusercontent.com` with `api.github.com/gists` and remove `/raw/filename`

### **Create Access Token:**
1. Go to: **https://github.com/settings/tokens**
2. **Generate new token (classic)**
3. Name: `Matrix Calendar Updater`
4. Scopes: Select **`gist`** only
5. **Generate** and **copy the token**

## 🔄 **Step 2: Create Power Automate Flow**

### **Create New Flow:**
1. Go to: **https://powerautomate.microsoft.com**
2. Click **"Create"** → **"Scheduled cloud flow"**
3. **Name**: `Matrix Calendar - Meeting Room Sync`
4. **Frequency**: Every **5 minutes**
5. Click **Create**

### **Add Outlook Connector:**
1. Click **"+ New step"**
2. Search for **"Outlook"**
3. Choose **"Get calendar view of events (V2)"**
4. **Calendar**: Select your **Upstairs Meeting Room** calendar
5. **Start time**: `utcNow()`
6. **End time**: `addDays(utcNow(), 7)` (next 7 days)

### **Add HTTP Connector:**
1. Click **"+ New step"**
2. Search for **"HTTP"**
3. Choose **"HTTP"**
4. Configure:
   - **Method**: `PATCH`
   - **URI**: `https://api.github.com/gists/YOUR_GIST_ID`
   - **Headers**:
     ```
     Authorization: Bearer YOUR_GITHUB_TOKEN
     Content-Type: application/json
     ```
   - **Body**:
     ```json
     {
       "files": {
         "matrix-calendar-data.json": {
           "content": "{\"lastUpdated\":\"@{utcNow()}\",\"meetingRoom\":@{body('Get_calendar_view_of_events_(V2)')?['value']},\"trainingRoom\":[]}"
         }
       }
     }
     ```

### **Save and Test:**
1. Click **Save**
2. Click **Test** → **Manually**
3. Check your GitHub Gist - it should update with calendar data!

## 🔄 **Step 3: Create Second Flow (Training Room)**

**Repeat Step 2** but:
- **Name**: `Matrix Calendar - Training Room Sync`
- **Calendar**: Select **Training Room**
- **Body**: Update to put data in `trainingRoom` field

## ⚙️ **Step 4: Update Your Electron App**

Edit `app.js` and update the CONFIG:

```javascript
const CONFIG = {
    dataEndpoint: 'https://gist.githubusercontent.com/YOUR_USERNAME/YOUR_GIST_ID/raw/matrix-calendar-data.json',
    refreshInterval: 5 * 60 * 1000 // 5 minutes
};
```

Replace:
- `YOUR_USERNAME` with your GitHub username
- `YOUR_GIST_ID` with your gist ID (from the URL)

## 🎯 **How It Works:**

```
Power Automate (Every 5 min) → GitHub Gist → Your Electron App
         ↓                          ↓              ↓
    Gets calendar data         Stores JSON    Displays live data
```

## 🧪 **Testing:**

1. **Check flows are running**: Power Automate dashboard shows "Succeeded"
2. **Check gist updates**: GitHub gist shows recent calendar data
3. **Check your app**: Click "🔄 Sync Live" buttons

## 🆘 **Troubleshooting:**

**Flow fails?**
- Check calendar permissions in Outlook
- Verify GitHub token has `gist` scope
- Check gist ID in the API URL

**No data in app?**
- Verify gist URL in app.js CONFIG
- Check browser console for errors
- Ensure gist is public

**Data not updating?**
- Check Power Automate run history
- Verify flows are enabled
- Check GitHub token hasn't expired

## 🎉 **Success!**

Once set up, you'll have:
- ✅ **Live calendar data** updating every 5 minutes
- ✅ **No admin privileges needed**
- ✅ **Professional desktop app**
- ✅ **Always current meeting room schedules**

**This gives you exactly what you wanted - live meeting room calendars!** 🚀
