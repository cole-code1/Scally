from flask import jsonify, request, Blueprint
from sqlalchemy import func, extract
from models import db, Category
from datetime import datetime
from flask_jwt_extended import jwt_required, get_jwt_identity

category_bp = Blueprint('category_bp', __name__)

@category_bp.route('/categories', methods=['GET'])
@jwt_required()
def get_categories():
    categories = Category.query.all()
    return jsonify([category.to_dict() for category in categories]), 200
    

@category_bp.route('/categories/<int:category_id>', methods=['GET'])
@jwt_required()
def get_category(category_id):
    category = Category.query.get(category_id)
    if not category:
        return jsonify({"message": "Category not found"}), 404
    return jsonify(category.to_dict()), 200

@category_bp.route('/categories', methods=['POST'])
@jwt_required()
def add_category():
    data = request.get_json()
    name = data.get('name')

    if not name or not description:
        return jsonify({"message": "Name and description are required"}), 400

    new_category = Category(name=name)
    db.session.add(new_category)
    db.session.commit()

    return jsonify(new_category.to_dict()), 201


@category_bp.route('/categories/<int:category_id>', methods=['PUT'])
@jwt_required()
def update_category(category_id):
    data = request.get_json()
    name = data.get('name')
    

    if not name :
        return jsonify({"message": "Name and description are required"}), 400

    category = Category.query.get(category_id)
    if not category:
        return jsonify({"message": "Category not found"}), 404

    category.name = name
    db.session.commit()

    return jsonify(category.to_dict()), 200

@category_bp.route('/categories/<int:category_id>', methods=['DELETE'])
@jwt_required()
def delete_category(category_id):
    category = Category.query.get(category_id)
    if not category:
        return jsonify({"message": "Category not found"}), 404

    db.session.delete(category)
    db.session.commit()

    return jsonify({"message": "Category deleted successfully"}), 200