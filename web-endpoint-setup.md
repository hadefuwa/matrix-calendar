# Web Endpoint Setup - Simple & Free

## 🌐 **Option 1: GitHub Gist (Recommended - Free & Simple)**

We'll use GitHub Gist as a simple "database" to store your calendar data.

### **Step 1: Create a GitHub Gist**
1. Go to: **https://gist.github.com**
2. Sign in with your GitHub account
3. Create a **new gist** with:
   - **Filename**: `matrix-calendar-data.json`
   - **Content**: `{"lastUpdated": "never", "meetingRoom": [], "trainingRoom": []}`
   - Set to **Public** (so your app can read it)
4. **Save** the gist
5. **Copy the raw URL** (looks like: `https://gist.githubusercontent.com/username/abc123/raw/matrix-calendar-data.json`)

### **Step 2: Get Your Gist Update Token**
1. Go to: **https://github.com/settings/tokens**
2. Click **"Generate new token (classic)"**
3. Give it a name: `Matrix Calendar Updates`
4. Select scope: **`gist`** (just this one)
5. Click **Generate token**
6. **Copy and save the token** (you'll need it for Power Automate)

## 🔄 **How This Works:**

```
Power Automate → Updates Gist → Your App Reads Gist
     ↓              ↓              ↓
Every 5 mins   JSON calendar   Live display
               data stored
```

## 📊 **Data Format:**

Your gist will store calendar data like this:
```json
{
  "lastUpdated": "2025-09-19T14:30:00Z",
  "meetingRoom": [
    {
      "title": "Team Meeting",
      "start": "2025-09-19T15:00:00Z", 
      "end": "2025-09-19T16:00:00Z",
      "location": "Upstairs Meeting Room"
    }
  ],
  "trainingRoom": [
    {
      "title": "Training Session",
      "start": "2025-09-19T14:00:00Z",
      "end": "2025-09-19T15:30:00Z", 
      "location": "Training Room"
    }
  ]
}
```

## 🎯 **Next Steps:**

1. **Create your GitHub Gist** (follow Step 1 above)
2. **Get your access token** (follow Step 2 above)
3. **Copy the raw URL** and token - we'll need them for Power Automate

**Ready? Let's set up the Power Automate flows next!** 🚀
