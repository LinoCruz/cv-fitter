import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import fitz
import tiktoken
from dotenv import load_dotenv
from openai import OpenAI

# Load environment variables from .env file
load_dotenv()
client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

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
    Tokenizes text using tiktoken with the 'o200k_base' encoding.
    """
    enc = tiktoken.get_encoding("o200k_base")
    tokens = enc.encode(text)
    return tokens

def improve_cv(cv_text, job_description):
    """
    Improves the CV by sending a prompt to OpenAI's API using the 'gpt-4o-mini' model.
    The prompt now instructs the model to output valid HTML formatted according to Harvard guidelines.
    """
    prompt = (
        "Improve the following CV to better match the job description provided. "
        "Do not have introduction or conclusion paragraphs."
        "Return only valid HTML code with no markdown formatting. The HTML must be a complete "
        "document including <html>, <head>, and <body> tags, and follow Harvard style guidelines for academic CVs.\n\n"
        "The description of each section in the CV should be concise and relevant to the job description. "
        "The CV should be tailored to the job description provided.\n\n"
        "The section description should be rephrased to include keywords from the job description. "
        "If the job description requires a Junior position, the CV should include the Technical Skills section"
        "If the job description requires a Semisenior, Senior or Semi-senior position, the CV should not include a Technical Skills section"
        f"CV:\n{cv_text}\n\n"
        f"Job Description:\n{job_description}\n\n"
    )
    
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a helpful assistant specialized in improving CVs."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.7,
        max_tokens=1500  # Adjust as needed
    )
    
    improved_cv = response.choices[0].message.content
    return improved_cv

@app.route('/upload-cv', methods=['POST'])
def upload_cv():
    cv_file = request.files.get('cv_file')
    if not cv_file:
        return jsonify({'error': 'No CV file uploaded'}), 400

    try:
        # Extract text from the PDF using PyMuPDF
        text = extract_text_from_pdf(cv_file)
        print(text)
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

@app.route('/improve-cv', methods=['POST'])
def improve_cv_endpoint():
    """
    Expects a JSON payload with 'cv_text' and 'job_description' keys.
    Calls the improve_cv function to generate an improved version of the CV.
    """
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided.'}), 400

    cv_text = data.get('cv_text')
    job_description = data.get('job_description')
    if not cv_text or not job_description:
        return jsonify({'error': 'Both cv_text and job_description are required.'}), 400

    try:
        improved_cv = improve_cv(cv_text, job_description)
        return jsonify({
            'message': 'CV improved successfully.',
            'improved_cv': improved_cv
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
