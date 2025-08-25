import docx
import io


def extract_text_from_docx(docx_path):
    """
    Extract text from a DOCX file while attempting to preserve structure.
    Args:
        docx_path (str): Path to the DOCX file
    Returns:
        str: Extracted text content
    Raises:
        Exception: If DOCX extraction fails
    """
    try:
        doc = docx.Document(docx_path)
        text_content = ""
        for para in doc.paragraphs:
            text_content += para.text + "\n"
        text_content = text_content.strip()
        if not text_content:
            raise Exception("No text could be extracted from the DOCX file")
        return text_content
    except Exception as e:
        raise Exception(f"Failed to extract text from DOCX: {str(e)}")
