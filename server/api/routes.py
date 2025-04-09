from api.cv_routes import register_cv_routes
from api.course_routes import register_course_routes
from api.errors import register_error_handlers

def register_routes(app):
    """Register all API routes with the Flask application"""
    register_cv_routes(app)
    register_course_routes(app)
    register_error_handlers(app)