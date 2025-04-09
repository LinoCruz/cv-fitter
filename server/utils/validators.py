"""
Validation utilities for input data.
"""

def validate_file_extension(filename):
    """
    Validate that the file has a PDF extension.
    
    Args:
        filename (str): Name of the file
        
    Returns:
        bool: True if valid, False otherwise
    """
    return filename.lower().endswith('.pdf')

def validate_job_description(job_description):
    """
    Validate that the job description is not empty and has a minimum length.
    
    Args:
        job_description (str): Job description text
        
    Returns:
        bool: True if valid, False otherwise
    """
    if not job_description:
        return False
    
    # Check minimum length (adjust as needed)
    return len(job_description.strip()) >= 50