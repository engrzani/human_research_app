# Setup Guide for Human Research Shop App

## Complete Installation & Setup Instructions

### Step 1: Install Prerequisites

1. **Node.js & npm**
   - Download from: https://nodejs.org/ (v14 or higher)
   - Verify: `node --version` and `npm --version`

2. **Expo CLI**
   ```bash
   npm install -g expo-cli
   ```

3. **Python** (for backend)
   - Download from: https://python.org (v3.8 or higher)
   - Verify: `python --version`

4. **Git** (optional)
   - Download from: https://git-scm.com/

### Step 2: Setup React Native App

1. **Navigate to project folder**
   ```bash
   cd c:\human_research_rork_app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Expo Go on your phone**
   - iOS: Download from App Store
   - Android: Download from Google Play

### Step 3: Setup Firebase

1. **Create Firebase Project**
   - Go to https://console.firebase.google.com
   - Click "Add project"
   - Follow the setup wizard

2. **Enable Firebase Services**
   - Go to **Firestore Database** → Create database (Start in test mode)
   - Go to **Authentication** → Enable Email/Password sign-in
   - Go to **Storage** → Get started

3. **Get Firebase Config**
   - Go to Project Settings → General
   - Scroll to "Your apps" → Click Web icon (</> )
   - Copy the firebaseConfig object

4. **Update Firebase Config**
   - Open `src/config/firebase.js`
   - Replace the config values with your actual Firebase credentials

5. **Setup Firestore Database**
   - Create a collection named `products`
   - Add sample products with fields:
     ```
     {
       name: "Product Name",
       category: "brain",
       price: 29.99,
       description: "Description",
       image: "🧠",
       inStock: true
     }
     ```

### Step 4: Setup Python Backend (Optional)

1. **Navigate to backend folder**
   ```bash
   cd backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   ```

3. **Activate virtual environment**
   - Windows: `venv\Scripts\activate`
   - Mac/Linux: `source venv/bin/activate`

4. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

5. **Download Firebase Service Account Key**
   - Go to Firebase Console → Project Settings → Service Accounts
   - Click "Generate new private key"
   - Save as `serviceAccountKey.json` in backend folder

6. **Configure environment**
   - Copy `.env.example` to `.env`
   - Update with your credentials

### Step 5: Configure Payment Gateway

1. **Choose a payment provider** (examples):
   - Stripe (https://stripe.com)
   - PayPal (https://paypal.com)
   - Square (https://squareup.com)
   - Razorpay (https://razorpay.com)

2. **Update payment URL in CartScreen.js**
   ```javascript
   const paymentURL = `https://your-actual-payment-site.com/checkout?amount=${total}&order_id=${orderId}`;
   ```

### Step 6: Run the Application

1. **Start React Native app**
   ```bash
   # In the main project folder
   npm start
   ```

2. **Scan QR code**
   - Use Expo Go app to scan the QR code from terminal
   - Or press 'a' for Android emulator, 'i' for iOS simulator

3. **Start Python backend** (optional, in separate terminal)
   ```bash
   cd backend
   python app.py
   ```

### Step 7: Testing the App

1. **Test Interactive Body**
   - Tap on different body parts
   - Verify they highlight and show info

2. **Test Shopping Flow**
   - Browse products
   - Add items to cart
   - View cart
   - Test checkout (will redirect to payment URL)

3. **Test Firebase Integration**
   - Add products to Firestore
   - Verify they appear in the app

### Troubleshooting

**Issue: Metro bundler errors**
- Clear cache: `expo start -c`
- Delete node_modules and reinstall: `rm -rf node_modules && npm install`

**Issue: Firebase connection errors**
- Verify Firebase config is correct
- Check Firebase project rules
- Ensure internet connection

**Issue: SVG not rendering**
- Ensure react-native-svg is installed: `npm install react-native-svg`
- Restart the Expo server

**Issue: Navigation errors**
- Clear React Navigation cache
- Ensure all screen components are properly imported

### Next Steps

1. **Customize Design**
   - Update colors in styles to match your brand
   - Modify SVG body design in `InteractiveBodySVG.js`
   - Add your logo and branding

2. **Add More Features**
   - User authentication
   - Order history
   - Push notifications
   - Product reviews
   - Wishlist functionality

3. **Production Deployment**
   - Build for Android: `expo build:android`
   - Build for iOS: `expo build:ios`
   - Deploy backend to cloud service
   - Configure production Firebase rules

### Support

If you need help:
1. Check the README.md file
2. Review Firebase documentation
3. Check React Native documentation
4. Contact development team

### Important Notes

- Replace all placeholder credentials with actual values
- Never commit sensitive credentials to git
- Use environment variables for production
- Test thoroughly before deploying
- Keep Firebase security rules updated
