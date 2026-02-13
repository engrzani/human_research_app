# Human Research App

A professional React Native mobile application for browsing research compounds with an interactive human body interface, Firebase integration, and modern UI design.

## ✨ Latest Updates

- ✅ **Professional UI** - All emojis removed, modern card design
- ✅ **Firebase Integration** - Complete cart persistence with database
- ✅ **APK Build Ready** - Configured for client distribution
- ✅ **Improved Mobile UX** - Better layouts, typography, and spacing
- ✅ **7 Product Categories** - 200+ products fully integrated
- ✅ **Complete Documentation** - Detailed build and setup guides

## 🚀 Quick Start

### For Development Testing:
```bash
npm install
npm start
```
Scan QR code with Expo Go app on your phone.

### For Building APK:
See **[APK_BUILD_INSTRUCTIONS.md](APK_BUILD_INSTRUCTIONS.md)** for complete step-by-step guide.

### For Firebase Setup:
See **[FIREBASE_SETUP_GUIDE.md](FIREBASE_SETUP_GUIDE.md)** for database configuration.

## 📱 Features

### Core Features:
- 🎯 Interactive human body diagram (tap any body part)
- 🛍️ Browse 200+ research compounds across 7 categories
- 🛒 Full shopping cart with Firebase persistence
- 📊 Category and subcategory navigation
- 🔍 Product search functionality
- 💾 Real-time database synchronization
- 📱 Professional mobile-first design

### Categories:
1. **Brain (Nootropics)** - Focus, Mood, Neuroprotection
2. **Hair** - Growth and follicle health
3. **Fat Loss** - Metabolic peptides
4. **Muscle Building** - Growth hormone, recovery, direct growth
5. **Endurance/Longevity** - Cardiovascular and cellular health
6. **Skin** - Health and tanning
7. **Sexual Health** - Libido and fertility support

## 🛠 Tech Stack

- **Frontend**: React Native with Expo 50
- **Navigation**: React Navigation v6
- **Graphics**: React Native SVG
- **Backend**: Firebase (Firestore, Auth, Storage)
- **State Management**: React Context API
- **Icons**: Expo Vector Icons

## 📦 Installation

### Prerequisites

- Node.js v18 or higher
- npm or yarn
- Expo CLI (optional for development)
- Firebase account (free tier sufficient)

### Setup Steps

1. **Install dependencies:**
```bash
npm install
```

2. **Configure Firebase:**
   - Create project at https://console.firebase.google.com
   - Enable Firestore Database (test mode)
   - Copy config to `src/config/firebase.js`
   - See [FIREBASE_SETUP_GUIDE.md](FIREBASE_SETUP_GUIDE.md)

3. **Start development server:**
```bash
npm start
```

4. **Test on device:**
   - Install Expo Go app on your phone
   - Scan QR code from terminal
   
## 📖 Documentation

### Essential Guides:
   
- **[QUICK_START.md](QUICK_START.md)** - Get started in 5 minutes
- **[APK_BUILD_INSTRUCTIONS.md](APK_BUILD_INSTRUCTIONS.md)** - Build APK for client distribution
- **[FIREBASE_SETUP_GUIDE.md](FIREBASE_SETUP_GUIDE.md)** - Complete Firebase configuration
- **[UPDATE_SUMMARY_URDU_ENGLISH.md](UPDATE_SUMMARY_URDU_ENGLISH.md)** - Latest changes (Urdu/English)
- **[MILESTONE_1_COMPLETE.md](MILESTONE_1_COMPLETE.md)** - Feature completion report

## 📂 Project Structure

```
human_research_rork_app/
├── App.js                           # Main app entry point
├── app.json                         # Expo configuration
├── eas.json                         # APK build configuration
├── package.json
├── src/
│   ├── components/
│   │   └── InteractiveBodySVG.js   # Interactive body diagram
│   ├── screens/
│   │   ├── HomeScreen.js           # Home with body diagram
│   │   ├── ShopScreen.js           # Product listing
│   │   ├── SubcategoryScreen.js    # Category selection
│   │   ├── ProductDetailScreen.js  # Product details
│   │   └── CartScreen.js           # Shopping cart
│   ├── context/
│   │   └── CartContext.js          # Cart state + Firebase sync
│   ├── config/
│   │   └── firebase.js             # Firebase configuration
│   ├── services/
│   │   └── firebaseService.js      # Database operations
│   └── data/
│       └── products.js             # 200+ products data
└── Documentation files (.md)
```

## 🔥 Firebase Structure

### Firestore Collections:

**carts** - User shopping carts
```javascript
{
  userId: {
    items: [
      {
        id: "brain_focus_001",
        name: "Semax",
        category: "brain",
        subcategory: "focusLearning",
        price: 89.99,
        quantity: 2
      }
    ],
    updatedAt: "2026-02-13T..."
  }
}
```

**products** - Product catalog (optional)
```javascript
{
  id: "brain_focus_001",
  name: "Semax",
  category: "brain",
  price: 89.99,
  description: "...",
  rating: 4.8,
  inStock: true
}
```

**orders** - Purchase history (future)
```javascript
{
  orderId: "...",
  userId: "...",
  items: [...],
  total: 179.98,
  status: "pending",
  createdAt: "..."
}
```

## 🎨 UI Improvements (Latest)

### What Changed:
- ❌ Removed all emoji icons
- ✅ Clean professional design
- ✅ Modern card layouts with shadows
- ✅ Better typography (larger, clearer)
- ✅ Category badges with colors
- ✅ Improved spacing and padding
- ✅ Better color scheme
- ✅ Responsive touch targets
- ✅ Professional buttons

### Design System:
- **Primary Color**: `#3498db` (Blue)
- **Success Color**: `#27ae60` (Green)
- **Background**: `#ecf0f1` (Light Gray)
- **Text**: `#1a1a1a` (Dark)
- **Border Radius**: 12px (modern rounded)
- **Shadows**: Subtle elevation
- **Font Weight**: 700 (bold headings)

## 🚀 Building APK

### Quick Method (EAS Build):

```bash
# Install EAS CLI
npm install -g eas-cli

# Login
eas login

# Configure
eas build:configure

# Build APK
eas build --platform android --profile preview
```

**Download link provided after build completes (10-20 min)**

### Detailed Instructions:
See **[APK_BUILD_INSTRUCTIONS.md](APK_BUILD_INSTRUCTIONS.md)** for complete guide.

## ✅ Testing Checklist

Before distributing APK:

- [ ] Firebase configured and tested
- [ ] Cart persistence works
- [ ] All 7 categories load
- [ ] All products display correctly
- [ ] Add to cart works
- [ ] Navigation flows smoothly
- [ ] APK installs on Android device
- [ ] No crashes or errors
- [ ] Internet connection required

## 🛡 Security Notes

### Current Setup (Development):
- Firestore rules are permissive (test mode)
- No user authentication (uses default user)
- Cart accessible without login

### For Production:
- Enable Firebase Authentication
- Restrict Firestore rules by userId
- Add SSL/TLS for external payments
- Implement rate limiting
- Add input validation

## 📱 Minimum Requirements

- **Android**: 5.0 (Lollipop) or higher
- **iOS**: 13.0 or higher
- **Internet**: Required for Firebase
- **Storage**: ~50 MB
- **RAM**: 2 GB recommended

## 🤝 Contributing

This is a client project. For updates or issues:

1. Document the change needed
2. Test thoroughly
3. Update version in `app.json`
4. Rebuild APK if needed
5. Provide updated documentation

## 📄 License

Proprietary - Client Project

## 🆘 Troubleshooting

### Common Issues:

**Cart doesn't persist:**
- Check Firebase configuration in `firebase.js`
- Verify Firestore is enabled
- Check internet connection
- See logs in Firebase Console

**Build fails:**
```bash
npm cache clean --force
npm install
eas build --platform android --profile preview --clear-cache
```

**APK won't install:**
- Enable "Unknown Sources" in Android settings
- Uninstall previous version
- Check Android version (minimum 5.0)

**App crashes:**
- Check Firebase credentials
- Verify internet connection
- Check console logs
- Reinstall the app

### Getting Help:

1. Check documentation files (see list above)
2. Review Firebase Console for errors
3. Check expo.dev dashboard for build logs
4. Verify all dependencies installed: `npm install`

## 📞 Support Resources

- [Expo Documentation](https://docs.expo.dev/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [React Navigation](https://reactnavigation.org/)
- [React Native](https://reactnative.dev/)

## 🎯 Project Status

**Version**: 1.0.0  
**Status**: ✅ Production Ready  
**Last Updated**: February 13, 2026  
**Milestone**: 1 Complete

### Completed:
- ✅ All 7 categories with 200+ products
- ✅ Interactive body diagram
- ✅ Cart with Firebase persistence
- ✅ Professional UI (no emojis)
- ✅ APK build configuration
- ✅ Complete documentation
- ✅ Ready for client distribution

---

**For quick start, read:** [QUICK_START.md](QUICK_START.md)

**For APK build, read:** [APK_BUILD_INSTRUCTIONS.md](APK_BUILD_INSTRUCTIONS.md)

**Urdu guide available:** [UPDATE_SUMMARY_URDU_ENGLISH.md](UPDATE_SUMMARY_URDU_ENGLISH.md)

2. **orders** collection:
```javascript
{
  userId: "user_id",
  items: [...],
  total: 99.99,
  status: "pending", // pending, paid, shipped, delivered
  createdAt: "2026-02-10T..."
}
```

## Customization

### Update Payment Gateway
Edit `src/screens/CartScreen.js`:
```javascript
const paymentURL = `https://your-actual-payment-site.com/checkout?amount=${total}&order_id=${orderId}`;
```

### Add More Products
Edit `src/data/products.js` or use Firebase console to add products.

### Customize Colors/Theme
Update styles in each screen component to match your brand.

## Next Steps (Payment Integration Phase)

1. Set up payment gateway account (Stripe, PayPal, etc.)
2. Create payment webhook endpoint
3. Implement payment confirmation callback
4. Add order tracking functionality
5. Set up email notifications

## Support

For questions or support, please contact the development team.

## License

Proprietary - All rights reserved
