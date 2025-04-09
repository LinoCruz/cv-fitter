"""
Language service for handling multilingual support.
"""

# Language definitions
LANGUAGES = {
    'en': {
        'locale': 'en-US',
        'messages': {
            'cv_enhanced': 'CV has been enhanced successfully',
            'match_prefix': 'Match score: ',
            'changes_title': 'Changes made:',
            'recommendations_title': 'Recommendations:',
            'error_processing': 'Error processing CV',
            'error_pdf': 'Error extracting text from PDF',
            'error_gpt': 'Error enhancing CV with GPT',
            'error_invalid_file': 'Invalid file format'
        }
    },
    'es': {
        'locale': 'es-ES',
        'messages': {
            'cv_enhanced': 'El CV ha sido mejorado con éxito',
            'match_prefix': 'Puntuación de coincidencia: ',
            'changes_title': 'Cambios realizados:',
            'recommendations_title': 'Recomendaciones:',
            'error_processing': 'Error al procesar el CV',
            'error_pdf': 'Error al extraer texto del PDF',
            'error_gpt': 'Error al mejorar el CV con GPT',
            'error_invalid_file': 'Formato de archivo inválido'
        }
    }
}

def get_language_context(language_code):
    """
    Get language context based on language code.
    
    Args:
        language_code (str): Language code ('en' or 'es')
    
    Returns:
        dict: Language context with locale and messages
    """
    # Default to English if language not supported
    if language_code not in LANGUAGES:
        language_code = 'en'
        
    return LANGUAGES[language_code]

def get_translation(key, language_code='en'):
    """
    Get translated message by key.
    
    Args:
        key (str): Message key
        language_code (str): Language code
        
    Returns:
        str: Translated message
    """
    language = get_language_context(language_code)
    return language['messages'].get(key, key)