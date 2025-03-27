import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { fetchCourseById } from '../services/api';

const CourseDetailPage = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadCourse = async () => {
      try {
        setLoading(true);
        const data = await fetchCourseById(id);
        setCourse(data);
      } catch (err) {
        console.error('Error loading course:', err);
        setError(t('courseDetail.errorLoading'));
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [id, t]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <p className="text-red-700">{error}</p>
          </div>
          <Link to="/courses" className="mt-4 inline-block text-blue-500 hover:text-blue-700">
            {t('courseDetail.backToCourses')}
          </Link>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-600">{t('courseDetail.courseNotFound')}</p>
          <Link to="/courses" className="mt-4 inline-block text-blue-500 hover:text-blue-700">
            {t('courseDetail.backToCourses')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <div className="mb-6">
          <Link to="/courses" className="text-blue-500 hover:text-blue-700 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            {t('courseDetail.backToCourses')}
          </Link>
        </div>
        
        {/* Course header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="relative">
            <img 
              src={course.imageUrl || '/api/placeholder/800/400'} 
              alt={course.title} 
              className="w-full h-64 object-cover"
            />
            
            {course.isFree && (
              <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 text-sm font-bold rounded-full">
                {t('courseCard.free')}
              </div>
            )}
          </div>
          
          <div className="p-6">
            <div className="flex flex-wrap items-center justify-between mb-4">
              <h1 className="text-3xl font-bold text-gray-800 mb-2 sm:mb-0">
                {course.title}
              </h1>
              
              {course.level && (
                <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                  course.level === 'beginner' ? 'bg-green-100 text-green-800' :
                  course.level === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {course.level === 'beginner' ? t('courseCard.level.beginner') :
                  course.level === 'intermediate' ? t('courseCard.level.intermediate') :
                  t('courseCard.level.advanced')}
                </span>
              )}
            </div>
            
            <div className="flex items-center text-gray-500 text-sm mb-6">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" />
              </svg>
              <span>{course.duration || t('courseCard.durationNotSpecified')}</span>
            </div>
            
            <p className="text-gray-700 mb-6">
              {course.description}
            </p>
            
            <button className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-400 text-white font-medium rounded-full hover:from-blue-600 hover:to-teal-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">
              {t('courseDetail.enrollButton')}
            </button>
          </div>
        </div>
        
        {/* Course content and details */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {t('courseDetail.aboutCourse')}
              </h2>
              <div className="prose max-w-none text-gray-700">
                {course.content || t('courseDetail.contentNotAvailable')}
              </div>
            </div>
            
            {course.syllabus && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  {t('courseDetail.syllabus')}
                </h2>
                <ul className="space-y-4">
                  {course.syllabus.map((item, index) => (
                    <li key={index} className="flex">
                      <span className="bg-blue-100 text-blue-500 w-8 h-8 rounded-full flex items-center justify-center font-semibold mr-3 flex-shrink-0">
                        {index + 1}
                      </span>
                      <div>
                        <h3 className="font-medium text-gray-800">{item.title}</h3>
                        {item.description && (
                          <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {t('courseDetail.courseDetails')}
              </h2>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" />
                  </svg>
                  <span className="text-gray-700">{course.duration || t('courseDetail.durationNotSpecified')}</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                  <span className="text-gray-700">{course.students || 0} {t('courseDetail.students')}</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.616a1 1 0 01.894-1.79l1.599.8L9 4.323V3a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">{t('courseDetail.difficulty')}: {course.level ? 
                    (course.level === 'beginner' ? t('courseCard.level.beginner') :
                    course.level === 'intermediate' ? t('courseCard.level.intermediate') :
                    t('courseCard.level.advanced')) : 
                    t('courseDetail.notSpecified')}
                  </span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                  <span className="text-gray-700">{course.language || t('courseDetail.languageNotSpecified')}</span>
                </li>
              </ul>
            </div>
            
            {course.instructor && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  {t('courseDetail.instructor')}
                </h2>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 mr-4">
                    {course.instructor.avatar ? (
                      <img src={course.instructor.avatar} alt={course.instructor.name} className="w-12 h-12 rounded-full" />
                    ) : (
                      <span className="text-xl font-bold">{course.instructor.name.charAt(0)}</span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{course.instructor.name}</h3>
                    <p className="text-gray-500 text-sm">{course.instructor.title}</p>
                  </div>
                </div>
                {course.instructor.bio && (
                  <p className="text-sm text-gray-700">
                    {course.instructor.bio}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;