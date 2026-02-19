# Human Research App

A professional React Native mobile application for browsing research compounds with an interactive human body interface.

## Features

- Interactive human body diagram (tap any body part to explore)
- 200+ research compounds across 7 categories
- Full shopping cart functionality
- Category and subcategory navigation
- Product search
- Professional mobile-first design

## Categories

1. **Brain (Nootropics)** - Focus, Mood, Neuroprotection
2. **Hair** - Growth and follicle health
3. **Fat Loss** - Metabolic peptides
4. **Muscle Building** - Growth hormone, recovery
5. **Endurance/Longevity** - Cardiovascular and cellular health
6. **Skin** - Health and tanning
7. **Sexual Health** - Libido and fertility support

## Tech Stack

- React Native / Expo
- Firebase (Authentication & Database)
- React Navigation

## Installation & Development

### Prerequisites
- Node.js 20+ installed
- Expo Go app on your phone (for testing)

### Run Development Server
```bash
npm install
npx expo start --tunnel
```
Scan QR code with Expo Go app.

## Building APK

### Using EAS Build (Recommended)
```bash
npm install -g eas-cli
eas login
eas build -p android --profile preview
```

### Local Build
```bash
npx expo prebuild
cd android
./gradlew assembleRelease
```
APK will be at: `android/app/build/outputs/apk/release/`

## Project Structure

```
human_research_app/
├── App.js              # Main app with navigation
├── src/
│   ├── components/     # Reusable components
│   ├── screens/        # App screens
│   ├── context/        # Auth & Cart context
│   ├── config/         # Firebase config
│   ├── data/           # Products data
│   └── services/       # Firebase services
├── assets/             # Images and icons
└── backend/            # Python backend (optional)
```

## Requirements

- Android 5.0+ or iOS 13.0+
- Internet connection required
- ~50 MB storage

## Version

1.0.0 - February 2026
#$env:PATH = "c:\human_research_rork_app\node-v20.11.0-win-x64;" + $env:PATH; cd c:\human_research_rork_app; npx expo start