from flask import jsonify, request, Blueprint
from sqlalchemy import func, extract
from models import db, Category


category_bp = Blueprint('category_bp', __name__)

@category_bp.route('/categories', methods=['GET'])
def get_categories():
    categories = Category.query.all()
    result = [{'id': c.id, 'name': c.name} for c in categories]
    return jsonify(result)

@category_bp.route('/categories/<int:category_id>', methods=['GET'])
def get_category(category_id):
    category = Category.query.get(category_id)
    if not category:
        return jsonify({"message": "Category not found"}), 404
    return jsonify({'id': category.id, 'name': category.name})
@category_bp.route('/categories', methods=['POST'])

def add_category():
    data = request.get_json()
    name = data.get('name')

    if not name :
        return jsonify({"message": "Name is required"}), 400

    new_category = Category(name=name)
    db.session.add(new_category)
    db.session.commit()

    return jsonify({"message":"Category added successfully"}), 201


@category_bp.route('/categories/<int:category_id>', methods=['PUT'])

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

def delete_category(category_id):
    category = Category.query.get(category_id)
    if not category:
        return jsonify({"message": "Category not found"}), 404

    db.session.delete(category)
    db.session.commit()

    return jsonify({"message": "Category deleted successfully"}), 200