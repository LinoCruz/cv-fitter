from api.cv_routes import register_cv_routes
from api.errors import register_error_handlers

def register_routes(app):
    """Register all API routes with the Flask application"""
    register_cv_routes(app)
    register_error_handlers(app)