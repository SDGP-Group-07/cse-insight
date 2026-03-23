import React, { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, FileText, Info } from 'lucide-react';
import Card from '../common/Card';

const REPORTS_PER_SLIDE = 4;

const formatReportDate = (timestamp) => {
  if (!timestamp) {
    return 'Date unavailable';
  }

  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) {
    return 'Date unavailable';
  }

  return date.toLocaleDateString('en-LK', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const AnnualReportsSlider = ({ reports = [], loading = false }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const totalSlides = Math.ceil(reports.length / REPORTS_PER_SLIDE);

  const visibleReports = useMemo(() => {
    const start = activeSlide * REPORTS_PER_SLIDE;
    return reports.slice(start, start + REPORTS_PER_SLIDE);
  }, [activeSlide, reports]);

  useEffect(() => {
    setActiveSlide(0);
  }, [reports]);

  const handlePrevious = () => {
    setActiveSlide((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setActiveSlide((prev) => Math.min(prev + 1, Math.max(totalSlides - 1, 0)));
  };

  return (
    <Card
      hover={false}
      className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-[#3e3753] rounded-lg"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-[18px] font-normal text-white">Annual Reports</h3>
          <a
            href="/wiki/Balance%20sheet%20basics"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open balance sheet basics wiki article"
            title="Learn about balance sheet basics"
            className="inline-flex items-center justify-center rounded-full bg-purple-500/20 border border-purple-500/30 p-1.5 text-purple-300 hover:text-purple-200 hover:border-purple-400 transition-colors"
          >
            <Info size={14} />
          </a>
        </div>

        {totalSlides > 1 && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={activeSlide === 0}
              className="p-2 rounded-md border border-[#3e3753] text-[#9b96b2] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Previous reports"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-xs text-[#9b96b2]">
              {activeSlide + 1}/{totalSlides}
            </span>
            <button
              type="button"
              onClick={handleNext}
              disabled={activeSlide >= totalSlides - 1}
              className="p-2 rounded-md border border-[#3e3753] text-[#9b96b2] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Next reports"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>

      {loading ? (
        <div className="text-sm text-[#9b96b2] py-8 text-center">Loading reports...</div>
      ) : reports.length === 0 ? (
        <div className="text-sm text-[#9b96b2] py-8 text-center">
          No annual reports available.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {visibleReports.map((report) => (
            <a
              key={report.id ?? report.path}
              href={report.url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg border border-[#3e3753] bg-[#1f1a2b] p-4 hover:border-accent-cyan transition-colors"
            >
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-accent-cyan mt-0.5 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm text-white line-clamp-2">{report.title}</p>
                  <p className="text-xs text-[#9b96b2] mt-2">
                    {formatReportDate(report.manualDate ?? report.uploadedDate)}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </Card>
  );
};

export default AnnualReportsSlider;
