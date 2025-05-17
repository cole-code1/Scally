from flask import Flask, jsonify, request
from flask_migrate import Migrate
from models import db, TokenBlocklist
from flask_jwt_extended import JWTManager
from datetime import timedelta
from flask_cors import CORS