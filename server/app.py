from flask import Flask
from dotenv import load_dotenv
import os
from api.routes import register_routes

# Load environment variables
load_dotenv()

def create_app():
    """Create and configure the Flask application"""
    app = Flask(__name__)
    
    # Configure app
    app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # Limit upload size to 16MB
    app.config['UPLOAD_FOLDER'] = os.path.join(os.getcwd(), 'temp')
    
    # Ensure temp directory exists
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    
    # Register API routes
    register_routes(app)
    
    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)