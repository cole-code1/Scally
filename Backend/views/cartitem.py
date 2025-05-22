from flask import jsonify, request, Blueprint
from sqlalchemy import func, extract
from models import db, CartItem
from datetime import datetime
from flask_jwt_extended import jwt_required, get_jwt_identity

cartitem_bp = Blueprint('cartitem_bp', __name__)
@cartitem_bp.route('/cartitems', methods=['GET'])

def get_cartitems():
    current_user = get_jwt_identity()
    cartitems = CartItem.query.filter_by(user_id=current_user).all()
    return jsonify([cartitem.to_dict() for cartitem in cartitems]), 200
@cartitem_bp.route('/cartitems/<int:cartitem_id>', methods=['GET'])

def get_cartitem(cartitem_id):
    current_user = get_jwt_identity()
    cartitem = CartItem.query.filter_by(id=cartitem_id, user_id=current_user).first()
    if not cartitem:
        return jsonify({"message": "Cart item not found"}), 404
    return jsonify(cartitem.to_dict()), 200

@cartitem_bp.route('/cartitems', methods=['POST'])

def add_cartitem():
    current_user = get_jwt_identity()
    data = request.get_json()
    product_id = data.get('product_id')
    quantity = data.get('quantity')

    if not product_id or not quantity:
        return jsonify({"message": "Product ID and quantity are required"}), 400

    new_cartitem = CartItem(user_id=current_user, product_id=product_id, quantity=quantity)
    db.session.add(new_cartitem)
    db.session.commit()

    return jsonify(new_cartitem.to_dict()), 201

@cartitem_bp.route('/cartitems/<int:cartitem_id>', methods=['PUT'])

def update_cartitem(cartitem_id):
    current_user = get_jwt_identity()
    data = request.get_json()
    quantity = data.get('quantity')

    if not quantity:
        return jsonify({"message": "Quantity is required"}), 400

    cartitem = CartItem.query.filter_by(id=cartitem_id, user_id=current_user).first()
    if not cartitem:
        return jsonify({"message": "Cart item not found"}), 404

    cartitem.quantity = quantity
    db.session.commit()

    return jsonify(cartitem.to_dict()), 200

@cartitem_bp.route('/cartitems/<int:cartitem_id>', methods=['DELETE'])

def delete_cartitem(cartitem_id):
    current_user = get_jwt_identity()
    cartitem = CartItem.query.filter_by(id=cartitem_id, user_id=current_user).first()
    if not cartitem:
        return jsonify({"message": "Cart item not found"}), 404

    db.session.delete(cartitem)
    db.session.commit()

    return jsonify({"message": "Cart item deleted"}), 200