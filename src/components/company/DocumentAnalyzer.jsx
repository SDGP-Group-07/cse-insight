import React from 'react';
import Card from '../common/Card';
import { FileText } from 'lucide-react';

const DocumentAnalyzer = () => {
  return (
    <Card
      hover={true}
      className="bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/20 rounded-lg flex flex-col justify-between"
    >
      <div>
        <div className="mb-4">
          <FileText className="w-8 h-8 text-purple-400" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">Document Analyzer</h3>
        <p className="text-sm text-gray-300 leading-relaxed">
          RAG-powered financial report insights. Upload annual reports and get instant AI-generated summaries and risk assessments.
        </p>
      </div>
      <button className="mt-6 w-full px-4 py-2 bg-purple-500/20 text-purple-300 rounded-lg hover:bg-purple-500/30 transition-colors text-sm font-medium" onClick={() => (window.open('http://localhost:8501/', '_blank'))}>
        Analyze Reports
      </button>
    </Card>
  );
};

export default DocumentAnalyzer;
