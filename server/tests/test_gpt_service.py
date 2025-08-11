"""
Unit tests for GPT service.
"""
import unittest
from unittest.mock import patch, MagicMock
from services.gpt_service import enhance_cv_with_gpt
from services.language_service import get_language_context

class TestGPTService(unittest.TestCase):
    """Test cases for GPT service."""
    
    @patch('services.gpt_service.openai.ChatCompletion.create')
    def test_enhance_cv_with_gpt(self, mock_openai_create):
        """Test enhancing CV with GPT."""
        # Mock the OpenAI API response
        mock_response = MagicMock()
        mock_response.choices = [
            MagicMock(
                message=MagicMock(
                    content='''
                    {
                        "enhanced_cv": "<div>Enhanced CV content</div>",
                        "changes": ["Change 1", "Change 2"],
                        "recommendations": ["Recommendation 1", "Recommendation 2"],
                        "match_percentage": 0.75
                    }
                    '''
                )
            )
        ]
        mock_openai_create.return_value = mock_response
        
        # Test data
        cv_text = "Original CV content"
        job_description = "Job description content"
        language = get_language_context('en')
        
        # Call the function
        result = enhance_cv_with_gpt(cv_text, job_description, language)
        
        # Assertions
        self.assertIn('enhanced_cv', result)
        self.assertIn('changes', result)
        self.assertIn('recommendations', result)
        self.assertIn('match_percentage', result)
        self.assertEqual(result['match_percentage'], 0.75)
        self.assertEqual(len(result['changes']), 2)
        self.assertEqual(len(result['recommendations']), 2)
        
        # Verify the API was called with the expected parameters
        mock_openai_create.assert_called_once()
        args, kwargs = mock_openai_create.call_args
        self.assertEqual(kwargs['model'], 'gpt-4.1-mini')
        self.assertEqual(len(kwargs['messages']), 2)
        self.assertEqual(kwargs['messages'][0]['role'], 'system')
        self.assertEqual(kwargs['messages'][1]['role'], 'user')
        
    @patch('services.gpt_service.openai.ChatCompletion.create')
    def test_enhance_cv_invalid_response(self, mock_openai_create):
        """Test handling invalid GPT response."""
        # Mock an invalid JSON response
        mock_response = MagicMock()
        mock_response.choices = [
            MagicMock(
                message=MagicMock(
                    content="This is not a valid JSON response"
                )
            )
        ]
        mock_openai_create.return_value = mock_response
        
        # Test data
        cv_text = "Original CV content"
        job_description = "Job description content"
        language = get_language_context('en')
        
        # Assert that an exception is raised
        with self.assertRaises(Exception) as context:
            enhance_cv_with_gpt(cv_text, job_description, language)
            
        self.assertIn("Failed to parse GPT response as JSON", str(context.exception))
        
if __name__ == '__main__':
    unittest.main()