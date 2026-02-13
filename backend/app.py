from flask import Flask, request, jsonify
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, firestore
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Initialize Firebase Admin SDK
cred = credentials.Certificate('path/to/your/serviceAccountKey.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

# Payment webhook endpoint
@app.route('/api/payment/webhook', methods=['POST'])
def payment_webhook():
    """
    Handle payment confirmation webhooks from external payment gateway
    """
    try:
        data = request.json
        
        # Verify webhook signature (implement based on your payment gateway)
        # ...
        
        order_id = data.get('order_id')
        payment_status = data.get('status')
        amount = data.get('amount')
        transaction_id = data.get('transaction_id')
        
        # Update order in Firestore
        order_ref = db.collection('orders').document(order_id)
        order_ref.update({
            'status': 'paid' if payment_status == 'success' else 'failed',
            'paymentTransactionId': transaction_id,
            'paidAt': datetime.utcnow().isoformat(),
            'amount': amount
        })
        
        # Send confirmation email (implement email service)
        # send_order_confirmation_email(order_id)
        
        return jsonify({
            'success': True,
            'message': 'Payment processed successfully'
        }), 200
        
    except Exception as e:
        print(f"Error processing payment webhook: {str(e)}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

# Create order endpoint
@app.route('/api/orders/create', methods=['POST'])
def create_order():
    """
    Create a new order
    """
    try:
        data = request.json
        
        order_data = {
            'userId': data.get('userId'),
            'items': data.get('items'),
            'total': data.get('total'),
            'status': 'pending',
            'createdAt': datetime.utcnow().isoformat(),
            'customerInfo': data.get('customerInfo', {})
        }
        
        # Add order to Firestore
        order_ref = db.collection('orders').add(order_data)
        order_id = order_ref[1].id
        
        return jsonify({
            'success': True,
            'orderId': order_id,
            'message': 'Order created successfully'
        }), 201
        
    except Exception as e:
        print(f"Error creating order: {str(e)}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

# Get order by ID
@app.route('/api/orders/<order_id>', methods=['GET'])
def get_order(order_id):
    """
    Get order details by ID
    """
    try:
        order_ref = db.collection('orders').document(order_id)
        order = order_ref.get()
        
        if order.exists:
            return jsonify({
                'success': True,
                'order': order.to_dict()
            }), 200
        else:
            return jsonify({
                'success': False,
                'error': 'Order not found'
            }), 404
            
    except Exception as e:
        print(f"Error getting order: {str(e)}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

# Get all products
@app.route('/api/products', methods=['GET'])
def get_products():
    """
    Get all products from Firestore
    """
    try:
        category = request.args.get('category')
        
        if category:
            products_ref = db.collection('products').where('category', '==', category)
        else:
            products_ref = db.collection('products')
        
        products = []
        for doc in products_ref.stream():
            product_data = doc.to_dict()
            product_data['id'] = doc.id
            products.append(product_data)
        
        return jsonify({
            'success': True,
            'products': products
        }), 200
        
    except Exception as e:
        print(f"Error getting products: {str(e)}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

# Health check endpoint
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'message': 'API is running'
    }), 200

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
