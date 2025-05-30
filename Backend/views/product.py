from flask import jsonify, request, Blueprint
from sqlalchemy import func, extract
from models import db, Product
from datetime import datetime


product_bp = Blueprint('product_bp', __name__)

@product_bp.route('/products', methods=['GET'])

def get_products():
    products = Product.query.all()
    return jsonify([product.to_dict() for product in products]), 200

@product_bp.route('/products/<int:product_id>', methods=['GET'])

def get_product(product_id):
    product = Product.query.get(product_id)
    if not product:
        return jsonify({"message": "Product not found"}), 404
    return jsonify(product.to_dict()), 200

@product_bp.route('/products', methods=['POST'])

def add_product():
    data = request.get_json()
    name = data.get('name')
    description = data.get('description')
    price = data.get('price')
    image_url = data.get('image_url')
    in_stock = data.get('in_stock', True)


    if not name or not description or not price :
        return jsonify({"message": "Name, description and price are required"}), 400

    new_product = Product(name=name, description=description, price=price, image_url=image_url, in_stock=in_stock)
    db.session.add(new_product)
    db.session.commit()

    return jsonify(new_product.to_dict()), 201

@product_bp.route('/products/<int:product_id>', methods=['PUT'])

def update_product(product_id):
    data = request.get_json()
    name = data.get('name')
    description = data.get('description')
    price = data.get('price')
    image_url = data.get('image_url')
    in_stock = data.get('in_stock', True)
    

    if not name or not description or not price :
        return jsonify({"message": "Name, description, price, and category ID are required"}), 400

    product = Product.query.get(product_id)
    if not product:
        return jsonify({"message": "Product not found"}), 404

    product.name = name
    product.description = description
    product.price = price
    product.image_url = image_url
    product.in_stock = in_stock
    db.session.commit()
    return jsonify(product.to_dict()), 200

@product_bp.route('/products/<int:product_id>', methods=['DELETE'])

def delete_product(product_id):
    product = Product.query.get(product_id)
    if not product:
        return jsonify({"message": "Product not found"}), 404

    db.session.delete(product)
    db.session.commit()
    return jsonify({"message": "Product deleted successfully"}), 200
