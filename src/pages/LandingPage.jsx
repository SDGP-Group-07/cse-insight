import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import AboutSection from '../components/landing/AboutSection';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-primary-dark text-white font-sans">
            <Header />
            <main>
                <Hero />
                <Features />
                <AboutSection />
            </main>
            <Footer />
        </div>
    );
};

export default LandingPage;
