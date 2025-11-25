import React from 'react';
import Card from '../common/Card';
import { ChevronRight, CheckCircle } from 'lucide-react';

const WikiArticle = ({ topic, onMarkRead }) => {
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
