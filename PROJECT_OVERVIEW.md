# Human Research Shop App - Project Overview

## 📱 What This App Does

This is a complete mobile shopping application where users can:
- Interact with a human body diagram
- Browse health products by body part
- Add products to cart
- Checkout via external payment gateway

## 🎯 Key Features Implemented

### ✅ Interactive SVG Body
- Fully interactive human body diagram
- Clickable body parts: Brain, Hair, Chest, Stomach, Arms, Legs
- Visual feedback when parts are selected
- Direct navigation to relevant products

### ✅ Shopping Functionality
- Product browsing and search
- Detailed product pages
- Shopping cart with quantity management
- Category filtering by body part

### ✅ External Payment Integration
- Checkout redirects to external payment site
- No payment processing within app (as requested)
- Order creation and tracking
- Secure payment flow

### ✅ Backend Integration
- Firebase Firestore for database
- Python Flask API for webhooks
- Product management
- Order management

## 📁 Project Structure

```
human_research_rork_app/
│
├── App.js                          # Main app entry
├── package.json                    # Dependencies
├── SETUP_GUIDE.md                  # Detailed setup instructions
├── README.md                       # Project documentation
│
├── src/
│   ├── components/
│   │   └── InteractiveBodySVG.js   # Main interactive body component
│   │
│   ├── screens/
│   │   ├── HomeScreen.js           # Home page with body diagram
│   │   ├── ShopScreen.js           # Product listing & search
│   │   ├── ProductDetailScreen.js  # Individual product details
│   │   └── CartScreen.js           # Cart & checkout
│   │
│   ├── context/
│   │   └── CartContext.js          # Global cart state
│   │
│   ├── config/
│   │   └── firebase.js             # Firebase configuration
│   │
│   ├── services/
│   │   └── firebaseService.js      # Database operations
│   │
│   └── data/
│       └── products.js             # Sample product data
│
└── backend/                        # Python Flask API
    ├── app.py                      # Main API server
    ├── requirements.txt            # Python dependencies
    └── README.md                   # Backend documentation
```

## 🚀 Quick Start

### Option 1: Automated Setup (Windows)
```bash
quick-start.bat
```

### Option 2: Manual Setup
```bash
# Install dependencies
npm install

# Start the app
npm start
```

Then scan QR code with Expo Go app on your phone.

## 🎨 Customization Guide

### Change Colors/Theme
All styling is in each component's `StyleSheet.create()` section. Main colors used:
- Primary: `#3498db` (blue)
- Success: `#27ae60` (green)
- Danger: `#e74c3c` (red)
- Dark: `#2c3e50`
- Light: `#ecf0f1`

### Modify Body Design
Edit `src/components/InteractiveBodySVG.js`:
- Each body part is a `<G>` (group) component
- Use `<Path>`, `<Circle>`, `<Rect>`, `<Ellipse>` for shapes
- Update `viewBox` to change scale
- Modify `onPress` handlers for interactions

### Add New Products
Two ways:
1. **Firebase**: Add to Firestore `products` collection
2. **Local**: Edit `src/data/products.js`

Product schema:
```javascript
{
  id: "unique_id",
  name: "Product Name",
  category: "brain", // hair, chest, stomach, leftArm, rightArm, leftLeg, rightLeg, torso
  price: 29.99,
  description: "Description text",
  image: "emoji or URL"
}
```

### Update Payment URL
Edit `src/screens/CartScreen.js`, line ~35:
```javascript
const paymentURL = `https://YOUR-PAYMENT-SITE.com/checkout?amount=${total}&order_id=${Date.now()}`;
```

## 🔧 Configuration Checklist

Before running:
- [ ] Install Node.js and npm
- [ ] Install Expo CLI (`npm install -g expo-cli`)
- [ ] Create Firebase project
- [ ] Update Firebase config in `src/config/firebase.js`
- [ ] Update payment URL in `src/screens/CartScreen.js`
- [ ] Set up payment gateway account
- [ ] (Optional) Configure Python backend

## 📱 Testing

### On Physical Device:
1. Install Expo Go app
2. Run `npm start`
3. Scan QR code

### On Emulator:
- Android: `npm run android` (requires Android Studio)
- iOS: `npm run ios` (requires Xcode, Mac only)

## 🔄 Development Workflow

1. **Make changes** to any `.js` files
2. **Save** the file
3. **App auto-reloads** in Expo Go
4. **Shake phone** to open developer menu

## 📦 Pre-Production Checklist

- [ ] Replace all `YOUR_API_KEY` placeholders
- [ ] Set up production Firebase rules
- [ ] Configure real payment gateway
- [ ] Test on multiple devices
- [ ] Add error handling
- [ ] Set up analytics
- [ ] Create app icons and splash screens
- [ ] Test payment flow end-to-end
- [ ] Add user authentication (optional)
- [ ] Configure app store listings

## 🌐 Next Phase: Payment Integration

The app is ready for payment integration. Next steps:

1. **Choose payment provider** (Stripe, PayPal, etc.)
2. **Set up payment account**
3. **Configure webhook URL** in payment dashboard
4. **Update payment URL** in CartScreen.js
5. **Test payment flow**
6. **Implement payment confirmation** callback
7. **Add order tracking**

## 💡 Tips

- Use **Reload** (shake phone → Reload) if changes don't appear
- Check **Terminal** for error messages
- Use **Expo DevTools** (opens in browser) for debugging
- Test on **real device** for best experience
- Keep **Firebase costs** in mind (use test mode during development)

## 🐛 Common Issues

**App won't start:**
- Run `expo start -c` to clear cache
- Delete `node_modules`, run `npm install` again

**Firebase errors:**
- Check internet connection
- Verify Firebase rules
- Ensure config is correct

**SVG not showing:**
- Ensure `react-native-svg` is installed
- Restart Expo server

## 📞 Support

For detailed setup: See `SETUP_GUIDE.md`
For backend: See `backend/README.md`
For general info: See `README.md`

---

**Built with:** React Native, Expo, Firebase, Python Flask
**Compatible:** iOS & Android
**Status:** Ready for customization and deployment
