from flask import jsonify, request, Blueprint
from sqlalchemy import func
from models import db, Transaction
from datetime import datetime
from flask_jwt_extended import jwt_required, get_jwt_identity
import requests
from base64 import b64encode

transaction_bp = Blueprint('transaction_bp', __name__)

# Safaricom Daraja API credentials
CONSUMER_KEY = 'YOUR_CONSUMER_KEY'
CONSUMER_SECRET = 'YOUR_CONSUMER_SECRET'
BUSINESS_SHORTCODE = '174379'
PASSKEY = 'YOUR_PASSKEY'
CALLBACK_URL = 'https://yourdomain.com/mpesa/callback'

def get_access_token():
    auth_url = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials'
    response = requests.get(auth_url, auth=(CONSUMER_KEY, CONSUMER_SECRET))
    return response.json().get('access_token')

def initiate_stk_push(phone_number, amount):
    access_token = get_access_token()
    timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
    password = b64encode((BUSINESS_SHORTCODE + PASSKEY + timestamp).encode()).decode()

    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json',
    }

    payload = {
        "BusinessShortCode": BUSINESS_SHORTCODE,
        "Password": password,
        "Timestamp": timestamp,
        "TransactionType": "CustomerPayBillOnline",
        "Amount": amount,
        "PartyA": phone_number,
        "PartyB": BUSINESS_SHORTCODE,
        "PhoneNumber": phone_number,
        "CallBackURL": CALLBACK_URL,
        "AccountReference": "Transaction",
        "TransactionDesc": "Payment"
    }

    response = requests.post(
        'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
        headers=headers,
        json=payload
    )
    return response.json()

@transaction_bp.route('/transactions', methods=['GET'])
@jwt_required()
def get_transactions():
    current_user = get_jwt_identity()
    transactions = Transaction.query.filter_by(user_id=current_user).all()
    return jsonify([transaction.to_dict() for transaction in transactions]), 200

@transaction_bp.route('/transactions/<int:transaction_id>', methods=['GET'])
@jwt_required()
def get_transaction(transaction_id):
    current_user = get_jwt_identity()
    transaction = Transaction.query.filter_by(id=transaction_id, user_id=current_user).first()
    if not transaction:
        return jsonify({"message": "Transaction not found"}), 404
    return jsonify(transaction.to_dict()), 200

@transaction_bp.route('/transactions', methods=['POST'])
@jwt_required()
def add_transaction():
    current_user = get_jwt_identity()
    data = request.get_json()
    amount = data.get('amount')
    payment_method = data.get('payment_method')
    phone_number = data.get('phone_number')  # Required for MPesa

    if not amount or not payment_method or not phone_number:
        return jsonify({"message": "Amount, payment method, and phone number are required"}), 400

    status = 'pending'
    if payment_method.lower() == 'mpesa':
        response = initiate_stk_push(phone_number, amount)
        if response.get("ResponseCode") == "0":
            status = "processing"
        else:
            return jsonify({"message": "M-Pesa STK Push failed", "details": response}), 400

    new_transaction = Transaction(
        user_id=current_user,
        amount=amount,
        payment_method=payment_method,
        status=status
    )
    db.session.add(new_transaction)
    db.session.commit()

    return jsonify(new_transaction.to_dict()), 201

@transaction_bp.route('/transactions/<int:transaction_id>', methods=['PUT'])
@jwt_required()
def update_transaction(transaction_id):
    current_user = get_jwt_identity()
    data = request.get_json()
    amount = data.get('amount')
    payment_method = data.get('payment_method')
    status = data.get('status')

    if not amount or not payment_method or not status:
        return jsonify({"message": "Amount, payment method, and status are required"}), 400

    transaction = Transaction.query.filter_by(id=transaction_id, user_id=current_user).first()
    if not transaction:
        return jsonify({"message": "Transaction not found"}), 404

    transaction.amount = amount
    transaction.payment_method = payment_method
    transaction.status = status
    db.session.commit()

    return jsonify(transaction.to_dict()), 200

@transaction_bp.route('/transactions/<int:transaction_id>', methods=['DELETE'])
@jwt_required()
def delete_transaction(transaction_id):
    current_user = get_jwt_identity()
    transaction = Transaction.query.filter_by(id=transaction_id, user_id=current_user).first()
    if not transaction:
        return jsonify({"message": "Transaction not found"}), 404

    db.session.delete(transaction)
    db.session.commit()

    return jsonify({"message": "Transaction deleted successfully"}), 200

@transaction_bp.route('/mpesa/callback', methods=['POST'])
def mpesa_callback():
    data = request.get_json()
    # You may want to log or process the response here
    # Example: extract metadata and update transaction record
    print("MPESA CALLBACK RECEIVED:", data)
    return jsonify({"ResultCode": 0, "ResultDesc": "Accepted"}), 200
