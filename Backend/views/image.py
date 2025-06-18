from flask import request, jsonify, Blueprint
import cloudinary.uploader
from models import Image, db

image_bp = Blueprint('image', __name__)

@image_bp.route('/upload', methods=['POST'])
def upload_image():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    try:
        upload_result = cloudinary.uploader.upload(file)
        new_image = Image(
            public_id=upload_result['public_id'],
            url=upload_result['secure_url']
        )
        db.session.add(new_image)
        db.session.commit()
        return jsonify({'message': 'Image uploaded successfully', 'url': new_image.url}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@image_bp.route('/images', methods=['GET'])
def get_images():
    images = Image.query.all()
    image_list = [{'id': img.id, 'public_id': img.public_id, 'url': img.url} for img in images]
    return jsonify(image_list), 200
