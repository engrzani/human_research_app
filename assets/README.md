# Assets Directory

This directory contains app assets like icons, images, and splash screens.

## Required Assets for Expo

Create the following files in this directory:

### 1. icon.png
- Size: 1024x1024 px
- Format: PNG with transparency
- Purpose: App icon for both iOS and Android

### 2. splash.png
- Size: 1284x2778 px (iPhone 13 Pro Max)
- Format: PNG
- Purpose: Loading screen

### 3. adaptive-icon.png
- Size: 1024x1024 px
- Format: PNG with transparency
- Purpose: Android adaptive icon
- Must have foreground content in center 512x512 px

### 4. favicon.png
- Size: 48x48 px (minimum)
- Format: PNG
- Purpose: Web favicon when running on web

## How to Generate Assets

### Option 1: Use Online Tools
- https://www.appicon.co/
- https://easyappicon.com/
- Upload your logo and download all sizes

### Option 2: Use Design Software
- Adobe Photoshop
- Figma
- Canva

### Option 3: Use Expo's Asset Generator
```bash
npx expo-optimize
```

## Temporary Placeholders

For development, you can use simple colored squares:
- Create 1024x1024 px image with your brand color
- Add your app name as text
- Save in appropriate sizes

## Production Assets

Before publishing to app stores:
1. Create professional icon design
2. Ensure proper sizing for all platforms
3. Test on different devices
4. Follow platform guidelines:
   - iOS: https://developer.apple.com/design/human-interface-guidelines/app-icons
   - Android: https://developer.android.com/guide/practices/ui_guidelines/icon_design_launcher
