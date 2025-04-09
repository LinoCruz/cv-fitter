from flask import request, jsonify
from services.scraper_service import scrape_courses
from services.language_service import get_language_context

def register_course_routes(app):
    """Register course-related routes"""
    
    @app.route('/api/courses', methods=['GET'])
    def get_courses():
        # Get language context (default to English)
        language = request.args.get('language', 'en')
        language_context = get_language_context(language)
        
        # Get optional filter parameters
        category = request.args.get('category', None)
        skill = request.args.get('skill', None)
        
        try:
            # Scrape courses based on language and filters
            courses = scrape_courses(
                language=language_context,
                category=category,
                skill=skill
            )
            
            return jsonify({'courses': courses})
            
        except Exception as e:
            return jsonify({'error': str(e)}), 500