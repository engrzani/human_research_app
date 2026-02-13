# APK Build Instructions - Human Research App

## Quick Setup for APK Build

Follow these steps to configure Firebase and build your APK for distribution to clients.

---

## Prerequisites

- Node.js 18.x or higher installed
- Internet connection
- Firebase account (free)
- Android device for testing (optional)

---

## Step 1: Firebase Setup (10 minutes)

### 1.1 Create Firebase Project

1. Visit https://console.firebase.google.com/
2. Click "Add Project"
3. Project name: `human-research-app`
4. Disable Google Analytics (optional for now)
5. Click "Create Project"

### 1.2 Add Web App to Firebase

1. In Firebase Console, click the web icon `</>`
2. App nickname: `Human Research Web`
3. Click "Register app"
4. **Copy the configuration code** - you'll need it next

### 1.3 Configure Firebase in Your App

1. Open file: `src/config/firebase.js`
2. Replace these lines with YOUR values from Firebase Console:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",           // Replace this
  authDomain: "YOUR_PROJECT.firebaseapp.com",  // Replace this
  projectId: "YOUR_PROJECT_ID",          // Replace this
  storageBucket: "YOUR_PROJECT.appspot.com",   // Replace this
  messagingSenderId: "123456789012",     // Replace this
  appId: "1:123456789:web:abc123"        // Replace this
};
```

### 1.4 Enable Firestore Database

1. In Firebase Console, go to **Build** → **Firestore Database**
2. Click "Create database"
3. Choose "Start in test mode"
4. Select region: `us-central1` (or closest to you)
5. Click "Enable"

### 1.5 Set Firestore Security Rules

1. In Firestore Database, go to **Rules** tab
2. Replace the rules with:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

3. Click "Publish"

**Note:** These are open rules for testing. For production, add proper security.

---

## Step 2: Test Firebase Connection (5 minutes)

1. Open terminal in project folder
2. Run: `npm start`
3. Scan QR code with Expo Go app on your phone
4. Test the app:
   - Tap a body part
   - Add a product to cart
   - Close app and reopen
   - Check if cart persists

5. Verify in Firebase Console:
   - Go to Firestore Database
   - You should see a `carts` collection with data

**If cart persists after closing and reopening, Firebase is working!** ✅

---

## Step 3: Build APK (20-30 minutes)

### Option A: Using EAS Build (Recommended - Easiest)

#### 3.1 Install EAS CLI

```bash
npm install -g eas-cli
```

#### 3.2 Login to Expo

```bash
eas login
```

- Create account if you don't have one (free)
- Enter your email and password

#### 3.3 Configure Project

```bash
eas build:configure
```

- Choose **Android** when prompted
- Select **Yes** to create eas.json

#### 3.4 Build APK

```bash
eas build --platform android --profile preview
```

- First time: You'll be asked to generate keystore → Choose **Yes**
- Wait 10-20 minutes for build to complete
- Build happens on Expo's servers (no need for Android Studio)

#### 3.5 Download APK

- When build completes, you'll get a link
- Click the link to download your APK
- APK will be named: `human-research-app-xxx.apk`

**Your APK is ready to send to clients!** 🎉

---

### Option B: Local Build (Advanced - Requires Android Studio)

Only use if Option A doesn't work.

#### Install Android Studio

1. Download: https://developer.android.com/studio
2. Install Android SDK 33
3. Set environment variables:
```bash
ANDROID_HOME=C:\Users\YourName\AppData\Local\Android\Sdk
```

#### Build APK

```bash
# Install dependencies
npm install

# Create native projects
npx expo prebuild

# Build APK
cd android
.\gradlew assembleRelease
```

APK location: `android\app\build\outputs\apk\release\app-release.apk`

---

## Step 4: Test APK on Android Device

1. Transfer APK to your Android phone
2. Open file manager and tap the APK
3. Allow "Install from Unknown Sources" if prompted
4. Install and test thoroughly:
   - ✅ Body diagram interactive
   - ✅ All 7 categories work
   - ✅ Products load correctly
   - ✅ Add to cart works
   - ✅ Cart persists after closing app
   - ✅ All navigation works

---

## Step 5: Share APK with Client

### Method 1: Direct Transfer
- Send via WhatsApp, Email, or USB
- File size: ~30-50 MB
- Client needs to enable "Unknown Sources" to install

### Method 2: Google Drive/Dropbox
1. Upload APK to cloud storage
2. Share link with client
3. Client downloads and installs

### Method 3: TestFlight/App Distribution
- Use Firebase App Distribution
- More professional, allows updates
- Free tier available

---

## Troubleshooting

### Problem: Cart doesn't persist

**Solution:**
1. Check Firebase Console → Firestore Database
2. Verify data is being written
3. Check `src/config/firebase.js` credentials are correct
4. Check internet connection

### Problem: Build fails with EAS

**Solution:**
```bash
# Clear cache and try again
npm cache clean --force
npm install
eas build --platform android --profile preview --clear-cache
```

### Problem: APK won't install on device

**Solution:**
1. Enable "Install Unknown Apps" in Android Settings
2. Uninstall any previous version first
3. Check Android version (minimum 5.0 required)
4. Try different file transfer method

### Problem: App crashes on startup

**Solution:**
1. Check if Firebase credentials are configured
2. Check internet connection
3. Check Android version compatibility
4. Reinstall the app

---

## Quick Reference Commands

```bash
# Start development server
npm start

# Build APK (preview)
eas build --platform android --profile preview

# Check build status
eas build:list

# View build logs
eas build:view [BUILD_ID]
```

---

## Production Checklist

Before sending to clients:

- [ ] Firebase configured and tested
- [ ] Cart persistence works
- [ ] All categories load correctly
- [ ] All navigation flows work
- [ ] Tested on real Android device
- [ ] APK installs without errors
- [ ] App doesn't crash
- [ ] All features tested thoroughly

---

## Support Links

- **Firebase Console:** https://console.firebase.google.com/
- **Expo Dashboard:** https://expo.dev/accounts/[your-account]/projects
- **Expo Build Docs:** https://docs.expo.dev/build/setup/
- **Firebase Docs:** https://firebase.google.com/docs/web/setup

---

## Common Questions

**Q: How much does it cost?**
- Firebase: Free tier (good for testing)
- EAS Build: Free tier includes limited builds/month
- More builds: ~$29/month for Expo subscription

**Q: Can I update the APK later?**
- Yes! Build a new APK with higher version number
- Users need to uninstall old version and install new one
- Or publish to Google Play Store for automatic updates

**Q: How do I change the app name/icon?**
- App name: Edit `app.json` → `expo.name`
- Icon: Replace `assets/icon.png` (1024x1024 px)
- Rebuild APK after changes

**Q: Is Firebase required?**
- Yes, for cart persistence
- Without Firebase, cart won't save when app closes
- Free Firebase tier is sufficient for development

---

## Next Steps: Publishing to Google Play Store

When ready for production:

1. Create Google Play Console account ($25 one-time fee)
2. Build AAB instead of APK:
   ```bash
   eas build --platform android --profile production
   ```
3. Upload AAB to Google Play Console
4. Complete store listing (screenshots, description)
5. Submit for review

---

**Your app is ready! Any questions, check FIREBASE_SETUP_GUIDE.md for more details.**

**Good luck with your project! 🚀**
