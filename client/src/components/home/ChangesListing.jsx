// ChangesListing.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';

const ChangesListing = ({ changes }) => {
  const { t } = useTranslation();
  
  if (!changes || changes.length === 0) {
    return (
      <div className="text-gray-500 italic">
        {t('changesListing.noChanges')}
      </div>
    );
  }
  
  return (
    <ul className="space-y-2 text-gray-700">
      {changes.map((change, index) => (
        <li key={index} className="flex">
          <span className="text-blue-500 mr-2">•</span>
          <span>{change}</span>
        </li>
      ))}
    </ul>
  );
};

export default ChangesListing;