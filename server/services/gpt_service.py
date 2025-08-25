import os
import json
import logging
from openai import OpenAI
from tenacity import retry, stop_after_attempt, wait_exponential, retry_if_exception_type, before_log

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize OpenAI client with API key from .env
api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    logger.error("OpenAI API key not found. Make sure OPENAI_API_KEY is set in your .env file.")

# Initialize the OpenAI client
client = OpenAI(api_key=api_key)

@retry(
    stop=stop_after_attempt(3), 
    wait=wait_exponential(multiplier=1, min=2, max=10),
    retry=retry_if_exception_type(Exception),
    before=before_log(logger, logging.INFO)
)
def enhance_cv_with_gpt(cv_text, job_description, language):
    """
    Enhance CV based on job description using GPT.
    
    Args:
        cv_text (str): The extracted text from the CV
        job_description (str): The job description text
        language (dict): Language context with locale and messages
    
    Returns:
        dict: Enhanced CV results with the following keys:
            - enhanced_cv: The enhanced CV text
            - changes: List of changes made
            - recommendations: List of recommendations
            - match_percentage: Percentage match between CV and job description
            
    Raises:
        Exception: If GPT processing fails
    """
    try:
        # Check if API key is available
        if not api_key:
            raise Exception("OpenAI API key is not set. Please check your .env file.")

        model = language.get("model", "gpt-4.1-mini")
        logger.info(f"Starting GPT enhancement process with language: {language['locale']} and model: {model}")
        # Map frontend model values to OpenAI model names
        model_map = {
            "gpt-4.1-mini": "gpt-4.1-mini",
            "gpt-4o": "gpt-4o",
            "gpt-5": "gpt-5-mini"
        }
        openai_model = model_map.get(model, "gpt-4.1-mini")

        system_prompt = f"""
        You are an expert CV/resume enhancer. Your task is to enhance the provided CV to better match the job description.
        Follow these rules strictly:
        1. Only rephrase existing content to highlight relevant skills and experiences.
        2. Use keywords from the job description where applicable.
        3. DO NOT add new job experiences, education, or skills that aren't mentioned in the original CV.
        4. Keep the enhanced CV in the same structure as the original but format it according to Harvard style.
        5. Order the content to highlight the most relevant experiences for the job description.
        6. Do not include any introductory text or explanations in your response.

        IMPORTANT: Your response MUST be valid JSON and nothing else. Do not include markdown, code blocks, or any text before or after the JSON. If you cannot produce valid JSON, return an empty string.

        You must return your response as a valid JSON with the following keys:
        - enhanced_cv: The enhanced CV text in HTML format
        - changes: A list of bullet points describing the changes made
        - recommendations: A list of recommendations for further improvements
        - match_percentage: A decimal number between 0 and 1 representing how well the CV matches the job description

        The output language should be {language['locale']}.
        """

        # Create the user message
        user_message = f"""
        Original CV:
        {cv_text}

        Job Description:
        {job_description}
        """

        # Log the request (sanitized to avoid logging full CV text)
        logger.info(f"Sending request to OpenAI API with model: {openai_model}")

        try:
            # Make the API call to GPT using the updated client
            # Use correct token parameter for gpt-5
            completion_args = {
                "model": openai_model,
                "messages": [
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_message}
                ]
            }
            if openai_model == "gpt-5" or openai_model == "gpt-5-mini":
                completion_args["max_completion_tokens"] = 4000
                completion_args["temperature"] = 1
            else:
                completion_args["max_tokens"] = 4000
                completion_args["temperature"] = 0.5
            response = client.chat.completions.create(**completion_args)
            logger.info("OpenAI API request successful")
        except Exception as e:
            logger.error(f"Error calling OpenAI API: {str(e)}")
            raise Exception(f"Error calling OpenAI API: {str(e)}")

        # Parse the JSON response (updated for new client response format)
        response_content = response.choices[0].message.content
        logger.info(f"Raw OpenAI response content: {repr(response_content)}")
        logger.info("Parsing response content")
        response_content = response_content.strip()
        # Remove code block markers if present
        if response_content.startswith("```json"):
            response_content = response_content[7:].strip()
        if response_content.startswith("```"):
            response_content = response_content[3:].strip()
        if response_content.endswith("```"):
            response_content = response_content[:-3].strip()
        if not response_content:
            logger.error("OpenAI response was empty. Model may not have followed instructions.")
            raise Exception("OpenAI returned an empty response. Please try again or use a different model.")
        try:
            result = json.loads(response_content)
        except json.JSONDecodeError as e:
            logger.error(f"Failed to parse response as JSON: {str(e)}")
            logger.error(f"Response content: {response_content[:200]}...")  # Log part of the response
            raise Exception("Failed to parse GPT response as JSON. Model may not have followed instructions.")

        # Validate the response structure
        required_keys = ['enhanced_cv', 'changes', 'recommendations', 'match_percentage']
        for key in required_keys:
            if key not in result:
                raise Exception(f"GPT response missing required key: {key}")

        return result

    except Exception as e:
        raise Exception(f"GPT enhancement failed: {str(e)}")