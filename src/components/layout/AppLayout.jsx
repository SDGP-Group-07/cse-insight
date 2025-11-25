import React from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Chatbot from '../common/Chatbot';

const AppLayout = ({ children }) => {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-primary-dark">
                {children}
            </main>
            <Footer />
            <Chatbot />
        </>
    );
};

export default AppLayout;
