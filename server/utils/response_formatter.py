"""
Utilities for formatting API responses.
"""

def format_error_response(error_message, status_code=400):
    """
    Format an error response.
    
    Args:
        error_message (str): Error message
        status_code (int): HTTP status code
        
    Returns:
        tuple: (JSON response, status code)
    """
    return {
        'success': False,
        'error': error_message
    }, status_code

def format_success_response(data):
    """
    Format a success response.
    
    Args:
        data (dict): Response data
        
    Returns:
        dict: Formatted response
    """
    return {
        'success': True,
        'data': data
    }