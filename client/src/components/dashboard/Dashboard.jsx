import React from 'react';
import { useTranslation } from 'react-i18next';
import CVPreview from './CVPreview';
import MatchRateChart from './MatchRateChart';
import ImprovementsList from './ImprovementsList';
import RecommendationsList from './RecommendationsList';
import './dashboard.css';

const Dashboard = ({ enhancedCVHTML, matchRate, improvements, recommendations }) => {
  const { t } = useTranslation();

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>{t('dashboard.title')}</h1>
        <p>{t('dashboard.subtitle')}</p>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-main">
          <CVPreview html={enhancedCVHTML} />
        </div>
        
        <div className="dashboard-sidebar">
          <div className="dashboard-card match-card">
            <h2>{t('dashboard.matchRate')}</h2>
            <MatchRateChart percentage={matchRate} />
            <p className="match-description">
              {t('dashboard.matchDescription')}
            </p>
          </div>
          
          <div className="dashboard-card">
            <h2>{t('dashboard.improvements')}</h2>
            <ImprovementsList improvements={improvements} />
          </div>
          
          <div className="dashboard-card">
            <h2>{t('dashboard.recommendations')}</h2>
            <RecommendationsList recommendations={recommendations} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;