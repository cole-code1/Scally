
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

# Category model (e.g., Men, Women, Kids)
class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    slug = db.Column(db.String(100), unique=True, nullable=False)

def __repr__(self):
    return f"<Category {self.name}>"
# Product model (clothing item)
class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    slug = db.Column(db.String(255), unique=True, nullable=False)
    description = db.Column(db.Text, nullable=True)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    stock = db.Column(db.Integer, default=0)
    available = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

category_id = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=False)
category = db.relationship('Category', backref=db.backref('products', lazy=True))

def __repr__(self):
    return f"<Product {self.name}>"
# Product images
class ProductImage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    image_url = db.Column(db.String(255), nullable=False)

product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
product = db.relationship('Product', backref=db.backref('images', lazy=True))
# User model (assuming using Flask-Login or similar)
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)  # Hashed

# Order model
class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    total_price = db.Column(db.Numeric(10, 2), nullable=False)

user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
user = db.relationship('User', backref=db.backref('orders', lazy=True))
# Order items
class OrderItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Numeric(10, 2), nullable=False)

order_id = db.Column(db.Integer, db.ForeignKey('order.id'), nullable=False)
product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)

order = db.relationship('Order', backref=db.backref('items', lazy=True))
product = db.relationship('Product')