def format_to_harvard(enhanced_cv, language):
    """
    Ensure the enhanced CV is properly formatted in Harvard style with HTML.
    The GPT service should already be returning properly formatted HTML content,
    but this function can apply additional formatting if needed.
    
    Args:
        enhanced_cv (str): The enhanced CV text from GPT
        language (dict): Language context
    
    Returns:
        str: Harvard-formatted HTML string
    """
    # The GPT service should already be returning the CV in Harvard format with HTML
    # This function serves as a hook for any additional formatting needs
    
    # Verify that the content appears to be HTML
    if not enhanced_cv.strip().startswith('<'):
        # If not HTML, wrap in basic HTML formatting
        enhanced_cv = f"<div>{enhanced_cv}</div>"
    
    return enhanced_cv