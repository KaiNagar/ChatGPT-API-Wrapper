from flask import Blueprint, request, jsonify
import requests
import json

from routes import data

product = Blueprint(__name__, 'product')

# new blueprint for the products endpoints for better management


@product.route('/names', methods=['GET'])
def get_products_names():
    products_names = []
    for product in data:
        name = product["path"]
        products_names.append(name.title())
    return products_names
