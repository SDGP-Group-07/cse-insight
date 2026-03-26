import React from 'react';
import Card from '../common/Card';
import { ChevronRight, CheckCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import glossaryMarkdown from '../../assets/docs/wiki/glossary.md?raw';
import candlestickMarkdown from '../../assets/docs/wiki/candle_stick.md?raw';
import fundamentalAnalysisMarkdown from '../../assets/docs/wiki/fundamental_analysis.md?raw';
import sectorCardMarkdown from '../../assets/docs/wiki/sector_card.md?raw';
import marketIntelligenceMarkdown from '../../assets/docs/wiki/market_intelligence_terminal.md?raw';
import technicalAnalysisMarkdown from '../../assets/docs/wiki/technical_analysis.md?raw';
import usingIndicesMarkdown from '../../assets/docs/wiki/using_indices.md?raw';
import balanceSheetBasicsMarkdown from '../../assets/docs/wiki/balance_sheet_basics.md?raw';
import incomeStatementInterpretationMarkdown from '../../assets/docs/wiki/income_statement_intepretation.md?raw';
import cashFlowAnalysisMarkdown from '../../assets/docs/wiki/cash_flow_analysis.md?raw';
import keyFinancialRatiosMarkdown from '../../assets/docs/wiki/key_financial_ratios.md?raw';
import investmentBestPracticesMarkdown from '../../assets/docs/wiki/investment_best_practices.md?raw';
import redFlagsMarkdown from '../../assets/docs/wiki/red_flags.md?raw';
import portfolioDiversificationMarkdown from '../../assets/docs/wiki/portfolio_diversification.md?raw';
import emotionalDisciplineMarkdown from '../../assets/docs/wiki/emotional_discipline.md?raw';
import blueChipMarkdown from '../../assets/docs/wiki/blue_chip.md?raw';
import valueInvestingMarkdown from '../../assets/docs/wiki/value_investing.md?raw';
import dividendInvestingMarkdown from '../../assets/docs/wiki/dividend_investing.md?raw';
import riskManagementMarkdown from '../../assets/docs/wiki/risk_management.md?raw';
import dayTradingMarkdown from '../../assets/docs/wiki/day_trading.md?raw';
import swingTradingMarkdown from '../../assets/docs/wiki/swing_trading.md?raw';
import positionTradingMarkdown from '../../assets/docs/wiki/position_trading.md?raw';
import candleBarChartImage from '../../assets/imgs/candle_bar_chart.png';
import companyResearchImage from '../../assets/imgs/company_research.jpeg';
import sectorCardImage from '../../assets/imgs/sector_card.png';
import stockMarketMarkdown from '../../assets/docs/wiki/stock_market.md?raw';
import cseHistoryMarkdown from '../../assets/docs/wiki/cse_history.md?raw';
import accountOpeningMarkdown from '../../assets/docs/wiki/account_opening.md?raw';
import tradingSessionMarkdown from '../../assets/docs/wiki/trading_session.md?raw';
import settlementProcessMarkdown from '../../assets/docs/wiki/settlement_process.md?raw';

const markdownComponents = {
  h1: ({ children }) => <h1 className="text-3xl font-bold text-white mb-4">{children}</h1>,
  h2: ({ children }) => <h2 className="text-2xl font-semibold text-white mt-8 mb-3">{children}</h2>,
  h3: ({ children }) => <h3 className="text-xl font-semibold text-white mt-6 mb-2">{children}</h3>,
  p: ({ children }) => <p className="text-gray-300 leading-8 mb-4">{children}</p>,
  ul: ({ children }) => <ul className="list-disc list-inside space-y-2 mb-5">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal list-inside space-y-2 mb-5">{children}</ol>,
  li: ({ children }) => <li className="text-gray-300">{children}</li>,
  hr: () => <hr className="border-white/15 my-6" />,
  strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
  em: ({ children }) => <em className="italic text-gray-200">{children}</em>,
  a: ({ href, children }) => (
    <a href={href} className="text-accent-cyan hover:underline" target="_blank" rel="noreferrer">
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-accent-cyan bg-white/5 rounded-r-md px-4 py-3 my-5 text-gray-200">
      {children}
    </blockquote>
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto my-6">
      <table className="w-full border-collapse">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-white/5">{children}</thead>,
  th: ({ children }) => <th className="border border-white/20 px-3 py-2 text-left text-white font-semibold">{children}</th>,
  td: ({ children }) => <td className="border border-white/10 px-3 py-2 text-gray-300 align-top">{children}</td>,
};

const wikiTopicConfig = {
  'Glossary': {
    section: 'Glossary',
    markdown: glossaryMarkdown,
  },
  'Candlestick chart': {
    section: 'Charts',
    markdown: candlestickMarkdown,
    image: {
      src: candleBarChartImage,
      alt: 'Candlestick chart example',
      className: 'w-full rounded-lg border border-white/10 mb-6',
    },
  },
  'Market Intelligence Terminal': {
    section: 'Market Analysis',
    markdown: marketIntelligenceMarkdown,
  },
  'Technical analysis gauge': {
    section: 'Market Analysis',
    markdown: technicalAnalysisMarkdown,
  },
  'Balance sheet basics': {
    section: 'Financial Statements',
    markdown: balanceSheetBasicsMarkdown,
  },
  'Income statement interpretation': {
    section: 'Financial Statements',
    markdown: incomeStatementInterpretationMarkdown,
  },
  'Cash flow analysis': {
    section: 'Financial Statements',
    markdown: cashFlowAnalysisMarkdown,
  },
  'Key financial ratios': {
    section: 'Financial Statements',
    markdown: keyFinancialRatiosMarkdown,
  },
  'Blue chip vs growth stocks': {
    section: 'Investment Strategies',
    markdown: blueChipMarkdown,
  },
  'Value investing': {
    section: 'Investment Strategies',
    markdown: valueInvestingMarkdown,
  },
  'Dividend investing': {
    section: 'Investment Strategies',
    markdown: dividendInvestingMarkdown,
  },
  'Risk management': {
    section: 'Investment Strategies',
    markdown: riskManagementMarkdown,
  },
  'Day trading basics': {
    section: 'Investment Strategies',
    markdown: dayTradingMarkdown,
  },
  'Swing trading basics': {
    section: 'Investment Strategies',
    markdown: swingTradingMarkdown,
  },
  'Position trading basics': {
    section: 'Investment Strategies',
    markdown: positionTradingMarkdown,
  },
  'Investment best practices': {
    section: "Dos and Don'ts",
    markdown: investmentBestPracticesMarkdown,
  },
  'Red flags to avoid': {
    section: "Dos and Don'ts",
    markdown: redFlagsMarkdown,
  },
  'Portfolio diversification': {
    section: "Dos and Don'ts",
    markdown: portfolioDiversificationMarkdown,
  },
  'Emotional discipline': {
    section: "Dos and Don'ts",
    markdown: emotionalDisciplineMarkdown,
  },
  'Fundamental analysis': {
    section: 'Market Analysis',
    markdown: fundamentalAnalysisMarkdown,
    image: {
      src: companyResearchImage,
      alt: 'Brian Feroldi Company Research Framework',
      className: 'w-full rounded-lg border border-white/10 mb-8',
    },
  },
  'Sector dashboard': {
    section: 'Market Analysis',
    markdown: sectorCardMarkdown,
    image: {
      src: sectorCardImage,
      alt: 'Sector dashboard card breakdown',
      className: 'w-full rounded-lg border border-white/10 mb-8',
    },
  },
  'Using indices': {
    section: 'Market Analysis',
    markdown: usingIndicesMarkdown,
  },
  'What is a stock exchange?': {
    section: 'How the CSE Works',
    markdown: stockMarketMarkdown,
  },
  'CSE history and structure': {
    section: 'How the CSE Works',
    markdown: cseHistoryMarkdown,
  },
  'Account opening process': {
    section: 'How the CSE Works',
    markdown: accountOpeningMarkdown,
  },
};

const renderArticleFooter = (onMarkRead) => (
  <div className="mt-12 pt-6 border-t border-white/10 flex justify-between items-center">
    <p className="text-gray-400 text-sm">
      Last updated: {new Date().toLocaleDateString()}
    </p>
    <button
      onClick={onMarkRead}
      className="flex items-center gap-2 px-4 py-2 bg-accent-green/10 text-accent-green rounded-lg hover:bg-accent-green/20 transition-colors"
    >
      <CheckCircle size={18} />
      Mark as Read
    </button>
  </div>
);

const renderMarkdownArticle = ({ topic, section, markdown, image, onMarkRead }) => (
  <div className="max-w-4xl mx-auto">
    <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
      <span>Wiki</span>
      <ChevronRight size={14} />
      <span className="text-accent-cyan">{section}</span>
      <ChevronRight size={14} />
      <span className="text-accent-cyan">{topic}</span>
    </div>

    <Card className="p-8">
      {image && (
        <img
          src={image.src}
          alt={image.alt}
          className={image.className}
        />
      )}

      <div className="max-w-none text-gray-300">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={markdownComponents}
        >
          {markdown}
        </ReactMarkdown>
      </div>

      {renderArticleFooter(onMarkRead)}
    </Card>
  </div>
);

const WikiArticle = ({ topic, onMarkRead }) => {
  const configuredTopic = wikiTopicConfig[topic];

  if (configuredTopic) {
    return renderMarkdownArticle({
      topic,
      section: configuredTopic.section,
      markdown: configuredTopic.markdown,
      image: configuredTopic.image,
      onMarkRead,
    });
  }

    // Mock content generator based on topic
    const getContent = (topicTitle) => {
        return {
            title: topicTitle,
            content: `
        <p class="mb-4 text-gray-300">
          This is a comprehensive guide about <strong>${topicTitle}</strong>. Understanding this concept is crucial for any investor in the Colombo Stock Exchange.
        </p>
        <h3 class="text-xl font-bold text-white mt-6 mb-3">Key Concepts</h3>
        <p class="mb-4 text-gray-300">
          Here we explore the fundamental principles that govern ${topicTitle.toLowerCase()}. Whether you are a beginner or an experienced trader, mastering these basics will provide a solid foundation for your investment journey.
        </p>
        <ul class="list-disc list-inside space-y-2 mb-6 text-gray-300">
          <li>Understanding the core mechanics</li>
          <li>Analyzing market impact</li>
          <li>Strategic implementation</li>
          <li>Risk assessment factors</li>
        </ul>
        <h3 class="text-xl font-bold text-white mt-6 mb-3">Practical Application</h3>
        <p class="mb-4 text-gray-300">
          In the context of the Sri Lankan market, ${topicTitle.toLowerCase()} plays a significant role. Investors should pay close attention to market announcements and regulatory changes that might affect this area.
        </p>
        <div class="bg-blue-500/10 border-l-4 border-blue-500 p-4 my-6 rounded-r-lg">
          <p class="text-blue-200 font-medium">
            <strong>Pro Tip:</strong> Always cross-reference this information with official CSE publications and consult with a licensed investment advisor before making significant financial decisions.
          </p>
        </div>
      `
        };
    };

    const article = getContent(topic);

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                <span>Wiki</span>
                <ChevronRight size={14} />
                <span className="text-accent-cyan">{article.title}</span>
            </div>

            <Card className="p-8">
                <h1 className="text-3xl font-bold text-white mb-6">{article.title}</h1>

                <div
                    className="prose prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                />

                <div className="mt-12 pt-6 border-t border-white/10 flex justify-between items-center">
                    <p className="text-gray-400 text-sm">
                        Last updated: {new Date().toLocaleDateString()}
                    </p>
                    <button
                        onClick={onMarkRead}
                        className="flex items-center gap-2 px-4 py-2 bg-accent-green/10 text-accent-green rounded-lg hover:bg-accent-green/20 transition-colors"
                    >
                        <CheckCircle size={18} />
                        Mark as Read
                    </button>
                </div>
            </Card>
        </div>
    );
};

export default WikiArticle;
