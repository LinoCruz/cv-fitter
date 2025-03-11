from flask import Flask, request, jsonify
from flask_cors import CORS
import fitz  # PyMuPDF is imported as fitz
import tiktoken

app = Flask(__name__)
CORS(app)  # Enable CORS for development

def extract_text_from_pdf(file_stream):
    """
    Extracts text from a PDF file stream using PyMuPDF (fitz).
    The file is read as bytes, then opened with fitz.open using the stream.
    """
    file_bytes = file_stream.read()
    # Open the PDF from the bytes stream. The "filetype" is specified as "pdf".
    doc = fitz.open(stream=file_bytes, filetype="pdf")
    text = ""
    for page in doc:
        text += page.get_text() + "\n"
    return text

def tokenize_text(text):
    """
    Tokenizes text using tiktoken with the 'cl100k_base' encoding.
    """
    enc = tiktoken.get_encoding("o200k_base")
    tokens = enc.encode(text)
    return tokens

@app.route('/upload-cv', methods=['POST'])
def upload_cv():
    cv_file = request.files.get('cv_file')
    if not cv_file:
        return jsonify({'error': 'No CV file uploaded'}), 400

    try:
        # Extract text from the PDF using PyMuPDF
        text = extract_text_from_pdf(cv_file)
        if not text.strip():
            return jsonify({'error': 'Could not extract text from the PDF.'}), 400

        # Tokenize the extracted text using tiktoken
        tokens = tokenize_text(text)

        response = {
            'message': 'PDF loaded and tokenized successfully.',
            'extracted_text_preview': text[:200],  # Preview first 200 characters
            'token_count': len(tokens),
            'tokens_preview': tokens[:50]  # Preview first 50 tokens
        }
        return jsonify(response), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
