# Matrix Calendar - Complete Project Guide

## 🎯 **Project Overview**

**Goal**: Create a live calendar application to view meeting room schedules without admin privileges.

**Final Solution**: Electron desktop app with live calendar sync using Power Automate + OneDrive (free approach).

---

## 📋 **What We Built**

### **Desktop Application**
- **Electron-based** desktop app with beautiful Matrix theme
- **Live sync buttons** for real-time calendar updates
- **Auto-refresh** every 5 minutes
- **Clean, professional interface** with purple gradient design
- **Two meeting rooms**: Upstairs Meeting Room & Training Room

### **Live Data Pipeline**
```
Power Automate → OneDrive File → Electron App
(Every 5 min)    (JSON data)     (Live display)
```

---

## 🛠️ **Technical Architecture**

### **Frontend (Electron App)**
- **Framework**: Electron.js with HTML/CSS/JavaScript
- **Styling**: Custom Matrix theme with purple gradients
- **Data Source**: OneDrive JSON file via REST API
- **Update Frequency**: Auto-refresh every 5 minutes
- **Fallback**: Manual file import still available

### **Backend (Data Pipeline)**
- **Automation**: Microsoft Power Automate flows
- **Data Storage**: OneDrive JSON file (free)
- **Calendar Source**: Outlook room calendars
- **Authentication**: Uses existing Outlook permissions

### **Key Files**
```
matrix-calendar/
├── main.js              # Electron main process
├── app.js               # Calendar logic & live sync
├── index.html           # UI structure
├── styles.css           # Matrix theme styling
├── package.json         # Dependencies & scripts
└── docs/               # Setup guides
    ├── ONEDRIVE_SETUP.md
    ├── FREE_ALTERNATIVES.md
    └── POWER_AUTOMATE_GUIDE.md
```

---

## 🚀 **Solutions Explored**

### **❌ Option 1: Microsoft Graph API**
- **Status**: Blocked by admin permissions
- **Issue**: Required admin consent for shared calendar access
- **Lesson**: Corporate environments restrict Graph API access

### **❌ Option 2: Outlook Add-in**
- **Status**: Technical issues with installation
- **Issue**: Add-in manifest couldn't be properly installed
- **Lesson**: Outlook add-ins require specific hosting setup

### **✅ Option 3: Power Automate + OneDrive (Final Solution)**
- **Status**: Working solution
- **Benefits**: No admin privileges needed, completely free
- **Implementation**: OneDrive file storage with Power Automate updates

---

## 📊 **Data Flow Details**

### **Power Automate Flow Configuration**
```yaml
Trigger: Recurrence (every 5 minutes)
Step 1: Get calendar view of events (V3)
  - Calendar: Upstairs Meeting Room
  - Start Time: utcNow()
  - End Time: addDays(utcNow(), 7)
Step 2: Update OneDrive file
  - File: matrix-calendar/calendar-data.json
  - Content: JSON with calendar events
```

### **JSON Data Structure**
```json
{
  "lastUpdated": "2025-09-19T16:30:00Z",
  "meetingRoom": [
    {
      "title": "Team Meeting",
      "start": "2025-09-19T15:00:00Z",
      "end": "2025-09-19T16:00:00Z",
      "location": "Upstairs Meeting Room"
    }
  ],
  "trainingRoom": []
}
```

### **App Configuration**
```javascript
const CONFIG = {
    dataEndpoint: 'OneDrive share link converted to API URL',
    refreshInterval: 5 * 60 * 1000 // 5 minutes
};
```

---

## 🔧 **Setup Instructions**

### **1. Electron App Setup**
```bash
# Install dependencies
npm install

# Run the app
npm start

# Build for distribution
npm run build-win
```

### **2. OneDrive Data Storage**
1. Create folder: `matrix-calendar` in OneDrive
2. Create file: `calendar-data.json` with initial JSON structure
3. Share file with "Anyone with link can view"
4. Convert share link to API URL format

### **3. Power Automate Flow**
1. Create scheduled flow (every 5 minutes)
2. Add "Get calendar view of events (V3)" action
3. Add "Update file" action for OneDrive
4. Use free connectors only (no premium license needed)

### **4. App Configuration**
Update `app.js` with your OneDrive file URL:
```javascript
dataEndpoint: 'https://api.onedrive.com/v1.0/shares/YOUR_TOKEN/root/content'
```

---

## 💡 **Key Learnings**

### **Corporate Environment Challenges**
- **Admin restrictions** block many API approaches
- **Licensing requirements** for premium connectors
- **Security policies** limit external integrations

### **Successful Workarounds**
- **Use existing tools** (OneDrive, Power Automate)
- **Leverage user permissions** instead of admin privileges
- **Free connectors** avoid licensing issues
- **Simple file storage** works better than complex APIs

### **Technical Decisions**
- **Electron over web app** for desktop experience
- **OneDrive over GitHub** for corporate compatibility
- **JSON files over databases** for simplicity
- **Auto-refresh over manual sync** for user experience

---

## 🎨 **Design Features**

### **Visual Design**
- **Matrix theme** with purple gradients
- **Professional card layout** for each room
- **Responsive design** for different screen sizes
- **Clean typography** with good contrast

### **User Experience**
- **One-click sync** with visual feedback
- **Auto-refresh** every 5 minutes
- **Clear status indicators** (last updated time)
- **Fallback options** if live sync fails

### **Performance**
- **Lightweight** Electron app
- **Efficient API calls** (only when needed)
- **Local caching** of calendar data
- **Fast startup time**

---

## 🔮 **Future Enhancements**

### **Potential Improvements**
- **Add more rooms** (easy to extend)
- **Booking functionality** (if permissions allow)
- **Notifications** for upcoming meetings
- **Calendar filtering** by time/type
- **Export functionality** for reports

### **Alternative Data Sources**
- **SharePoint Lists** for structured data
- **Excel Online** for spreadsheet storage
- **Teams integration** if permissions improve
- **Email parsing** for calendar updates

---

## 🆘 **Troubleshooting Guide**

### **Common Issues**

**App won't start?**
- Check Node.js installation
- Run `npm install` to update dependencies
- Check for port conflicts

**No calendar data?**
- Verify OneDrive file permissions
- Check Power Automate flow status
- Confirm calendar access in Outlook

**Sync not working?**
- Check internet connection
- Verify OneDrive share link
- Test Power Automate flow manually

**Power Automate flow fails?**
- Check calendar permissions
- Verify OneDrive connector setup
- Ensure flow is enabled (not turned off)

---

## 📞 **Support Resources**

### **Documentation Files**
- `ONEDRIVE_SETUP.md` - Step-by-step OneDrive setup
- `FREE_ALTERNATIVES.md` - Other free approaches
- `POWER_AUTOMATE_GUIDE.md` - Flow configuration guide

### **Key URLs**
- **OneDrive**: https://onedrive.com
- **Power Automate**: https://powerautomate.microsoft.com
- **Outlook Calendar**: https://outlook.office365.com

### **Technical References**
- **Electron Documentation**: https://electronjs.org/docs
- **OneDrive API**: https://docs.microsoft.com/en-us/onedrive/developer/
- **Power Automate Connectors**: https://docs.microsoft.com/en-us/connectors/

---

## 🎉 **Project Success**

### **What We Achieved**
✅ **Live calendar access** without admin privileges  
✅ **Professional desktop application** with Matrix branding  
✅ **Real-time updates** every 5 minutes  
✅ **Free solution** using existing Microsoft tools  
✅ **Clean, maintainable codebase** for future updates  

### **Business Value**
- **Improved productivity** with easy room schedule access
- **No licensing costs** using free Microsoft tools
- **Professional appearance** reflecting company branding
- **Scalable solution** that can be extended to more rooms

---

**This document serves as a complete reference for the Matrix Calendar project, including all approaches tried, solutions implemented, and lessons learned.** 🚀
