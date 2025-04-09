"""
Unit tests for PDF service.
"""
import unittest
import os
import tempfile
from services.pdf_service import extract_text_from_pdf

class TestPDFService(unittest.TestCase):
    """Test cases for PDF service."""
    
    def test_extract_text_from_pdf_invalid_file(self):
        """Test extracting text from an invalid PDF file."""
        # Create a temporary text file (not a PDF)
        with tempfile.NamedTemporaryFile(suffix='.txt', delete=False) as f:
            f.write(b'This is not a PDF file')
            temp_file = f.name
            
        try:
            # Should raise an exception
            with self.assertRaises(Exception):
                extract_text_from_pdf(temp_file)
        finally:
            # Clean up
            if os.path.exists(temp_file):
                os.remove(temp_file)
    
    # Additional tests would be added here
    # For example, testing with a valid PDF file would require
    # creating or using a real PDF file for testing purposes
    
if __name__ == '__main__':
    unittest.main()