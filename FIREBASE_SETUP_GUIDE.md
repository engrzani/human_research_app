# Firebase Setup Guide for APK Build

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project" or "Create a project"
3. Enter your project name (e.g., "Human Research App")
4. Choose whether to enable Google Analytics (optional)
5. Click "Create Project"

## Step 2: Register Your App

1. In Firebase Console, click the Android icon to add an Android app
2. Enter your Android package name: `com.humanresearchapp`
3. Enter app nickname (optional): "Human Research"
4. Click "Register app"

## Step 3: Download google-services.json

1. Download the `google-services.json` file
2. Place it in your project root folder (same level as package.json)

## Step 4: Enable Firestore Database

1. In Firebase Console, go to "Firestore Database"
2. Click "Create Database"
3. Choose "Start in test mode" (for development)
4. Select your Cloud Firestore location
5. Click "Enable"

## Step 5: Configure Firebase in Your App

1. Open `src/config/firebase.js`
2. Replace the placeholder values with your actual Firebase credentials:

```javascript
const firebaseConfig = {
  apiKey: "AIza...", // From Firebase Console > Project Settings > Web App
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

To find these values:
- Go to Firebase Console > Project Settings (gear icon)
- Scroll down to "Your apps" section
- Click on your web app or add a new web app
- Copy the configuration values

## Step 6: Update Firestore Security Rules

In Firebase Console > Firestore Database > Rules, paste:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write to carts collection
    match /carts/{userId} {
      allow read, write: if true;
    }
    
    // Allow read to products collection
    match /products/{productId} {
      allow read: if true;
      allow write: if false; // Only allow through admin
    }
    
    // Allow read/write to orders collection
    match /orders/{orderId} {
      allow read, write: if true;
    }
  }
}
```

**Note:** These are permissive rules for development. For production, add proper authentication checks.

## Step 7: Test Firebase Connection

1. Start your app: `npm start`
2. Add a product to cart
3. Check Firebase Console > Firestore Database
4. You should see a new document in the `carts` collection

## Step 8: Build APK

### Option A: Using EAS Build (Recommended)

1. Install EAS CLI globally:
```bash
npm install -g eas-cli
```

2. Login to Expo:
```bash
eas login
```

3. Configure your project:
```bash
eas build:configure
```

4. Build APK:
```bash
eas build --platform android --profile preview
```

5. Wait for build to complete (10-20 minutes)
6. Download APK from the provided link

### Option B: Local Build (Requires Android Studio)

1. Install dependencies:
```bash
npm install
```

2. Create standalone build:
```bash
npx expo prebuild
```

3. Build APK:
```bash
cd android
./gradlew assembleRelease
```

4. APK will be at: `android/app/build/outputs/apk/release/app-release.apk`

## Step 9: Testing Your APK

1. Transfer APK to your Android device
2. Enable "Install from Unknown Sources" in device settings
3. Install the APK
4. Test all features:
   - Interactive body diagram
   - Product browsing
   - Add to cart
   - Cart persistence (close and reopen app)
   - All 7 categories

## Troubleshooting

### Firebase Connection Issues

If cart doesn't persist:
1. Check Firebase Console for errors
2. Verify `firebase.js` configuration is correct
3. Check Firestore security rules
4. Check browser/app console for error messages

### Build Issues

If build fails:
1. Run `npm install` to ensure all dependencies are installed
2. Clear cache: `npx expo start -c`
3. Check `app.json` configuration
4. Ensure Node.js version is 18.x or higher

### APK Installation Issues

If APK won't install:
1. Enable "Install Unknown Apps" for your file manager
2. Check Android version compatibility (minimum Android 5.0)
3. Uninstall any previous version first

## Production Checklist

Before releasing to production:

- [ ] Update Firestore security rules with proper authentication
- [ ] Enable Firebase Authentication
- [ ] Test on multiple Android devices
- [ ] Test all features thoroughly
- [ ] Add proper error handling
- [ ] Configure app signing for Google Play
- [ ] Update app version in `app.json`
- [ ] Create privacy policy and terms of service
- [ ] Test payment gateway integration

## Support

For additional help:
- [Expo Documentation](https://docs.expo.dev/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [React Native Firebase](https://rnfirebase.io/)

---

**Your app is now ready to be built and distributed!**
