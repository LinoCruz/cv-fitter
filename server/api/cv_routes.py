from flask import request, jsonify, current_app
import os
import uuid
from werkzeug.utils import secure_filename
from services.pdf_service import extract_text_from_pdf
from services.gpt_service import enhance_cv_with_gpt
from services.formatter_service import format_to_harvard
from services.language_service import get_language_context
from utils.validators import validate_file_extension, validate_job_description

def register_cv_routes(app):
    """Register CV-related routes"""
    
    @app.route('/api/enhance-cv', methods=['POST'])
    def enhance_cv():
        # Check if 'file' part exists in the request
        if 'file' not in request.files:
            return jsonify({'error': 'No file part in the request'}), 400
            
        file = request.files['file']
        
        # Check if a file was selected
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
            
        # Get and validate job description
        job_description = request.form.get('job_description', '')
        if not validate_job_description(job_description):
            return jsonify({'error': 'Invalid or missing job description'}), 400
            
        # Get language context (default to English)
        language = request.form.get('language', 'en')
        language_context = get_language_context(language)
        
        # Validate file extension
        if not validate_file_extension(file.filename):
            return jsonify({'error': 'File must be a PDF'}), 400
            
        # Save file temporarily
        filename = secure_filename(f"{str(uuid.uuid4())}.pdf")
        file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        
        try:
            # Extract text from PDF
            cv_text = extract_text_from_pdf(file_path)
            
            # Enhanced CV with GPT
            enhanced_results = enhance_cv_with_gpt(
                cv_text=cv_text,
                job_description=job_description,
                language=language_context
            )
            
            # Format the enhanced CV to Harvard format with HTML
            formatted_cv_html = format_to_harvard(
                enhanced_cv=enhanced_results['enhanced_cv'],
                language=language_context
            )
            
            # Prepare the response
            response = {
                'enhanced_cv_html': formatted_cv_html,
                'changes': enhanced_results['changes'],
                'recommendations': enhanced_results['recommendations'],
                'match_percentage': enhanced_results['match_percentage']
            }
            
            return jsonify(response)
            
        except Exception as e:
            return jsonify({'error': str(e)}), 500
            
        finally:
            # Clean up temporary file
            if os.path.exists(file_path):
                os.remove(file_path)