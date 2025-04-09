import requests
from bs4 import BeautifulSoup
import time
import random
import json
from services.language_service import get_translation

# Dictionary of course websites to scrape based on language
COURSE_WEBSITES = {
    'en': [
        'https://www.coursera.org/browse/computer-science',
        'https://www.udemy.com/courses/development/',
        'https://www.edx.org/learn/computer-science'
    ],
    'es': [
        'https://www.coursera.org/es/browse/computer-science',
        'https://www.udemy.com/es/courses/development/',
        'https://www.edx.org/es/learn/computer-science'
    ]
}

def scrape_courses(language, category=None, skill=None):
    """
    Scrape courses from various websites based on language context.
    
    Args:
        language (dict): Language context
        category (str, optional): Filter by category
        skill (str, optional): Filter by skill
    
    Returns:
        list: List of course objects
    """
    courses = []
    locale = language['locale'][:2]  # Extract 'en' or 'es' from locale
    
    # Select websites based on language
    websites = COURSE_WEBSITES.get(locale, COURSE_WEBSITES['en'])
    
    for website in websites:
        try:
            # Get website domain for identification
            domain = website.split('/')[2]
            
            # Scrape based on website
            if 'coursera.org' in domain:
                courses.extend(_scrape_coursera(website, locale))
            elif 'udemy.com' in domain:
                courses.extend(_scrape_udemy(website, locale))
            elif 'edx.org' in domain:
                courses.extend(_scrape_edx(website, locale))
                
            # Avoid rate limiting
            time.sleep(random.uniform(1, 3))
            
        except Exception as e:
            print(f"Error scraping {website}: {str(e)}")
            continue
    
    # Apply filters if provided
    if category:
        courses = [c for c in courses if category.lower() in c.get('category', '').lower()]
    
    if skill:
        courses = [c for c in courses if skill.lower() in c.get('skills', [])]
    
    # Limit to a reasonable number of courses
    return courses[:20]

def _scrape_coursera(url, locale):
    """Mock implementation for Coursera scraping"""
    # In a real implementation, you would use requests and BeautifulSoup
    # This is a mock implementation for demonstration
    
    courses = []
    
    # Sample courses for demonstration
    if locale == 'en':
        courses = [
            {
                "title": "Machine Learning",
                "provider": "Stanford University",
                "url": "https://www.coursera.org/learn/machine-learning",
                "image": "https://coursera.org/ml-image.jpg",
                "description": "Learn about the most effective machine learning techniques.",
                "duration": "11 weeks",
                "category": "Computer Science",
                "skills": ["machine learning", "python", "data science"]
            },
            {
                "title": "Python for Everybody",
                "provider": "University of Michigan",
                "url": "https://www.coursera.org/specializations/python",
                "image": "https://coursera.org/python-image.jpg",
                "description": "Learn to Program and Analyze Data with Python.",
                "duration": "8 weeks",
                "category": "Programming",
                "skills": ["python", "programming", "data analysis"]
            }
        ]
    elif locale == 'es':
        courses = [
            {
                "title": "Aprendizaje Automático",
                "provider": "Universidad de Stanford",
                "url": "https://www.coursera.org/es/learn/machine-learning",
                "image": "https://coursera.org/ml-image.jpg",
                "description": "Aprende sobre las técnicas más efectivas de aprendizaje automático.",
                "duration": "11 semanas",
                "category": "Ciencias de la Computación",
                "skills": ["aprendizaje automático", "python", "ciencia de datos"]
            },
            {
                "title": "Python para Todos",
                "provider": "Universidad de Michigan",
                "url": "https://www.coursera.org/es/specializations/python",
                "image": "https://coursera.org/python-image.jpg",
                "description": "Aprende a programar y analizar datos con Python.",
                "duration": "8 semanas",
                "category": "Programación",
                "skills": ["python", "programación", "análisis de datos"]
            }
        ]
    
    return courses

def _scrape_udemy(url, locale):
    """Mock implementation for Udemy scraping"""
    # Similar mock implementation
    courses = []
    
    if locale == 'en':
        courses = [
            {
                "title": "Complete Web Development Bootcamp",
                "provider": "Dr. Angela Yu",
                "url": "https://www.udemy.com/course/web-development-bootcamp/",
                "image": "https://udemy.com/web-dev-image.jpg",
                "description": "Become a full-stack web developer with just one course.",
                "duration": "65 hours",
                "category": "Web Development",
                "skills": ["html", "css", "javascript", "react"]
            }
        ]
    elif locale == 'es':
        courses = [
            {
                "title": "Bootcamp de Desarrollo Web Completo",
                "provider": "Dra. Angela Yu",
                "url": "https://www.udemy.com/es/course/web-development-bootcamp/",
                "image": "https://udemy.com/web-dev-image.jpg",
                "description": "Conviértete en un desarrollador web full-stack con un solo curso.",
                "duration": "65 horas",
                "category": "Desarrollo Web",
                "skills": ["html", "css", "javascript", "react"]
            }
        ]
    
    return courses

def _scrape_edx(url, locale):
    """Mock implementation for edX scraping"""
    # Similar mock implementation
    courses = []
    
    if locale == 'en':
        courses = [
            {
                "title": "CS50: Introduction to Computer Science",
                "provider": "Harvard University",
                "url": "https://www.edx.org/course/cs50s-introduction-to-computer-science",
                "image": "https://edx.org/cs50-image.jpg",
                "description": "Harvard's introduction to the intellectual enterprises of computer science.",
                "duration": "12 weeks",
                "category": "Computer Science",
                "skills": ["c", "python", "algorithms", "data structures"]
            }
        ]
    elif locale == 'es':
        courses = [
            {
                "title": "CS50: Introducción a las Ciencias de la Computación",
                "provider": "Universidad de Harvard",
                "url": "https://www.edx.org/es/course/cs50s-introduction-to-computer-science",
                "image": "https://edx.org/cs50-image.jpg",
                "description": "Introducción de Harvard a las empresas intelectuales de la informática.",
                "duration": "12 semanas",
                "category": "Ciencias de la Computación",
                "skills": ["c", "python", "algoritmos", "estructuras de datos"]
            }
        ]
    
    return courses