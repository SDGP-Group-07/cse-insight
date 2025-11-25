import React from 'react';
import { FileText, Upload, AlertCircle } from 'lucide-react';
import Button from '../components/common/Button';

const RAGPage = () => {
    return (
        <div className="pt-24 min-h-screen bg-primary-dark text-white px-6">
            <div className="container mx-auto max-w-4xl">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-xl bg-accent-purple/20 flex items-center justify-center text-accent-purple">
                        <FileText size={24} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold">Document Analyzer</h1>
                        <p className="text-gray-400">Upload annual reports or financial statements for AI-powered insights.</p>
                    </div>
                </div>

                <div className="bg-primary-mid border border-white/10 rounded-2xl p-12 text-center">
                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Upload size={32} className="text-gray-400" />
                    </div>
                    <h2 className="text-xl font-bold mb-2">Upload a Document</h2>
                    <p className="text-gray-400 mb-8 max-w-md mx-auto">
                        Drag and drop your PDF files here, or click to browse. Supported formats: PDF, DOCX (Max 10MB).
                    </p>
                    <Button variant="primary" className="px-8 py-3">
                        Select File
                    </Button>

                    <div className="mt-8 flex items-center justify-center gap-2 text-yellow-400 bg-yellow-400/10 py-2 px-4 rounded-lg inline-flex">
                        <AlertCircle size={16} />
                        <span className="text-sm font-medium">This feature is currently in beta.</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RAGPage;
