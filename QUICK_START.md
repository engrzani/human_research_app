# 🚀 QUICK START - Send APK to Client

## Step 1: Firebase Setup (5 minutes)

1. Go to: https://console.firebase.google.com/
2. Create new project: "human-research-app"
3. Enable **Firestore Database** → Test mode
4. Go to Project Settings → Web App
5. Copy the config code
6. Paste in: `src/config/firebase.js`

## Step 2: Test App (2 minutes)

```bash
npm start
```

- Scan QR code with Expo Go app
- Test add to cart
- Close and reopen app
- Check cart persists ✅

## Step 3: Build APK (20 minutes)

```bash
# Install EAS
npm install -g eas-cli

# Login
eas login

# Configure
eas build:configure

# Build APK
eas build --platform android --profile preview
```

Wait 10-20 minutes → Download APK → Send to client!

## 📱 Send APK Options:

- WhatsApp (if under 100MB)
- Google Drive link
- Email attachment
- USB transfer

## 🎯 What Client Needs:

1. APK file (download from EAS build link)
2. Enable "Unknown Sources" on Android
3. Install APK
4. Internet connection (for Firebase)

## ✅ Done!

Your app is ready with:
- ✅ No emojis (professional look)
- ✅ Beautiful mobile UI
- ✅ Firebase database working
- ✅ Cart persistence
- ✅ All 7 categories
- ✅ 200+ products

---

**For detailed guide, read:** `APK_BUILD_INSTRUCTIONS.md`

**Urdu guide:** `UPDATE_SUMMARY_URDU_ENGLISH.md`
