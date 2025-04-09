import PyPDF2
import io

def extract_text_from_pdf(pdf_path):
    """
    Extract text from a PDF file while attempting to preserve structure.
    
    Args:
        pdf_path (str): Path to the PDF file
        
    Returns:
        str: Extracted text content
    
    Raises:
        Exception: If PDF extraction fails
    """
    try:
        text_content = ""
        
        # Open the PDF file
        with open(pdf_path, 'rb') as file:
            # Create a PDF reader object
            pdf_reader = PyPDF2.PdfReader(file)
            
            # Extract text from each page
            for page_num in range(len(pdf_reader.pages)):
                page = pdf_reader.pages[page_num]
                text_content += page.extract_text() + "\n\n"
        
        # Clean up text if needed
        text_content = text_content.strip()
        
        if not text_content:
            raise Exception("No text could be extracted from the PDF")
            
        return text_content
        
    except Exception as e:
        raise Exception(f"Failed to extract text from PDF: {str(e)}")