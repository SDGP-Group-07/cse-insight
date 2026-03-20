import React from 'react';
import PredictionDashboard from '../components/prediction/PredictionDashboard';

const PredictionPage = () => {
  return (
    <div className="pt-24 min-h-screen px-6 pb-12">
      <div className="container mx-auto max-w-7xl">
        <PredictionDashboard />
      </div>
    </div>
  );
};

export default PredictionPage;
