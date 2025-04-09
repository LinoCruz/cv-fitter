"""
Configuration management for the application.
"""
import os

class Config:
    """Base configuration class."""
    # Flask settings
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-key-for-development-only')
    DEBUG = False
    TESTING = False
    
    # API settings
    OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
    GPT_MODEL = os.getenv('GPT_MODEL', 'gpt-4')
    
    # File upload settings
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB max upload size
    UPLOAD_FOLDER = os.path.join(os.getcwd(), 'temp')
    ALLOWED_EXTENSIONS = {'pdf'}
    
    # Database settings (for future use)
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URI', '')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

class DevelopmentConfig(Config):
    """Development configuration."""
    DEBUG = True

class TestingConfig(Config):
    """Testing configuration."""
    TESTING = True
    DEBUG = True

class ProductionConfig(Config):
    """Production configuration."""