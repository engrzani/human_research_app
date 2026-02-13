# Python Backend for Human Research Shop App

This is a Flask-based Python backend API for handling orders, payments, and product management.

## Setup

1. Create a virtual environment:
```bash
cd backend
python -m venv venv
```

2. Activate virtual environment:
- Windows: `venv\Scripts\activate`
- Mac/Linux: `source venv/bin/activate`

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Configure Firebase:
- Download your Firebase service account key from Firebase Console
- Save it as `serviceAccountKey.json` in the backend folder
- Update the path in `app.py`

5. Create `.env` file:
```bash
cp .env.example .env
```
Edit `.env` with your actual credentials.

6. Run the server:
```bash
python app.py
```

The API will be available at `http://localhost:5000`

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products?category=brain` - Get products by category

### Orders
- `POST /api/orders/create` - Create new order
- `GET /api/orders/{order_id}` - Get order details

### Payment Webhook
- `POST /api/payment/webhook` - Handle payment confirmations

### Health Check
- `GET /api/health` - Check API status

## Deployment

For production deployment, use gunicorn:
```bash
gunicorn app:app --bind 0.0.0.0:5000
```

Or deploy to platforms like:
- Heroku
- Google Cloud Run
- AWS Lambda
- DigitalOcean
