import React, { useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { CVContext } from '../context/CVContext';
import Dashboard from '../components/dashboard/Dashboard';
import LoadingOverlay from '../components/dashboard/LoadingOverlay';

const DashboardPage = () => {
  const { t } = useTranslation();
  const { enhancedCV, isLoading } = useContext(CVContext);
  const [showLoading, setShowLoading] = useState(true);

  // Sample data (replace with real data from your API)
  const dummyData = {
    enhancedCVHTML: `
      <div class="cv-content">
        <h1>John Doe</h1>
        <p>Software Engineer</p>
        <div class="section">
          <h2>Work Experience</h2>
          <div class="entry">
            <h3>Senior Developer - Tech Solutions Inc.</h3>
            <p>2018 - Present</p>
            <ul>
              <li>Led a team of 5 developers on multiple projects</li>
              <li>Increased application performance by 40%</li>
              <li>Implemented CI/CD pipelines reducing deployment time by 60%</li>
            </ul>
          </div>
        </div>
        <div class="section">
          <h2>Education</h2>
          <div class="entry">
            <h3>M.S. Computer Science</h3>
            <p>University of Technology - 2017</p>
          </div>
        </div>
        <div class="section">
          <h2>Skills</h2>
          <ul>
            <li>JavaScript, React, Node.js</li>
            <li>Python, Django</li>
            <li>SQL, MongoDB</li>
            <li>DevOps, AWS</li>
          </ul>
        </div>
      </div>
    `,
    matchRate: 91,
    improvements: [
      {
        section: 'Work Experience',
        changes: [
          'Added quantifiable achievements to showcase results',
          'Highlighted leadership experience that matches job requirements',
          'Emphasized technical skills relevant to the position'
        ]
      },
      {
        section: 'Skills',
        changes: [
          'Reorganized skills to prioritize those mentioned in the job description',
          'Added keywords from job posting to improve ATS matching',
          'Removed outdated technologies not relevant to the position'
        ]
      },
      {
        section: 'Education',
        changes: [
          'Emphasized coursework relevant to the position',
          'Added graduation honors to strengthen credibility'
        ]
      }
    ],
    recommendations: [
      {
        title: 'Improve Cloud Infrastructure Knowledge',
        description: 'The job requires deeper AWS expertise than your CV currently shows',
        courses: [
          { id: 1, title: 'AWS Solutions Architect', url: '/courses/1' },
          { id: 2, title: 'Cloud Security Fundamentals', url: '/courses/2' }
        ]
      },
      {
        title: 'Enhance Leadership Skills',
        description: 'The position emphasizes team management experience',
        courses: [
          { id: 3, title: 'Technical Team Leadership', url: '/courses/3' },
          { id: 4, title: 'Agile Project Management', url: '/courses/4' }
        ]
      }
    ]
  };

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  if (showLoading) {
    return <LoadingOverlay />;
  }

  return (
    <Dashboard 
      enhancedCVHTML={enhancedCV?.html || dummyData.enhancedCVHTML}
      matchRate={enhancedCV?.matchRate || dummyData.matchRate}
      improvements={enhancedCV?.improvements || dummyData.improvements}
      recommendations={enhancedCV?.recommendations || dummyData.recommendations}
    />
  );
};

export default DashboardPage;