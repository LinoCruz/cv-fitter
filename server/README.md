# CV-Fitter Server

This is the backend server for the CV-Fitter application. It provides API endpoints for processing, enhancing, and formatting CVs using AI and other tools.

## Requirements

- Python 3.12+
- All dependencies listed in `requirements.txt`
- An OpenAI API key (for AI-powered CV enhancement)

## Setup Instructions

1. **Clone the repository and navigate to the server directory:**
   ```bash
   cd server
   ```

2. **Create and activate a virtual environment:**
   ```bash
   # Using uv (recommended)
   uv venv .venv
   source .venv/Scripts/activate
   
   # Or using python -m venv
   python -m venv .venv
   source .venv/Scripts/activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables:**
   - Create a `.env` file in the `server` directory (if it doesn't exist).
   - Add your OpenAI API key:
     ```env
     OPENAI_API_KEY=your_openai_api_key_here
     ```

5. **Run the server locally:**
   ```bash
   python app.py
   ```
   The server will start on `http://127.0.0.1:5000` by default.


## Model Configuration

By default, the server uses the `gpt-4.1-mini` model from OpenAI for processing and enhancing CVs. You can change the model used by editing the `model` parameter in `services/gpt_service.py`.

**Important:** If you choose to use a different or newer model (such as `gpt-5`), be aware that some models may require changes to the parameters you send (for example, `max_tokens` or other options). Always consult the [OpenAI API documentation](https://platform.openai.com/docs/) to ensure compatibility with your chosen model.

For the latest migration guidance and parameter requirements for the newest model (`gpt-5`), see the official OpenAI documentation here: [https://platform.openai.com/docs/guides/latest-model#migration-guidance](https://platform.openai.com/docs/guides/latest-model#migration-guidance) (as of 8/10/2025).

## Notes
- Make sure your `.venv` is activated whenever you run or develop the server.
- The server will not work without a valid OpenAI API key.
- For production deployment, use a WSGI server like Gunicorn (see `Procfile`).

For more details on the project, see the main `README.md` in the root directory.
