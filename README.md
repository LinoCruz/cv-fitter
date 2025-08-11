
# CV-Fitter

CV-Fitter is an AI-powered application that helps users optimize and refine their CVs for specific job positions. It maintains the core descriptions of your experiences and education, but uses artificial intelligence to rephrase your content and include relevant keywords based on the job description you provide. This increases your chances of passing automated resume screenings and catching the attention of recruiters.


## Architecture

![Project Architecture](architecture.png)

The CV-Fitter project follows a modern web application architecture, split into two main parts:

- **Frontend (`/client`)**: Built with React and Tailwind CSS, the frontend provides the user interface for uploading CVs, previewing results, and downloading enhanced PDFs. It communicates with the backend via HTTP requests and receives JSON responses.
- **Backend (`/server`)**: Built with Python and Flask, the backend exposes API endpoints for CV processing, enhancement, and PDF generation. It integrates with the OpenAI API for AI-powered CV refinement and uses libraries for PDF parsing and formatting.

The diagram above illustrates the flow: users interact with the frontend, which sends requests to the backend for processing. The backend handles AI integration, parsing, and formatting, then returns results to the frontend for display and download.

## Technologies Used

- **Frontend:** React, Tailwind CSS
- **Backend:** Python, Flask, Flask-CORS
- **AI Integration:** OpenAI API (GPT models)
- **PDF Processing:** PyMuPDF, PyPDF2
- **Web Scraping:** BeautifulSoup
- **Other:** dotenv, Gunicorn, Tenacity, Requests, and more

## Project Structure

The project is divided into three main parts:

1. **Root Directory**
   - Contains this main README file and the overall project structure.
2. **Server**
   - The backend API, responsible for processing CVs, extracting and enhancing content, and integrating with AI services.
   - For detailed setup and usage instructions, see `server/README.md`.
3. **Client**
   - The frontend application, where users can upload their CVs, input job descriptions, and download the enhanced CVs.
   - For detailed setup and usage instructions, see `client/README.md`.

## Getting Started

To get started, please refer to the README files in the `server` and `client` directories for step-by-step instructions on installing dependencies, configuring environment variables, and running each part of the project.

---

For any questions or issues, please open an issue in this repository.
