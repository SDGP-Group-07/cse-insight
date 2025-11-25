import React from 'react';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import AboutSection from '../components/landing/AboutSection';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-primary-dark text-white font-sans">
            <main>
                <Hero />
                <Features />
                <AboutSection />
            </main>
        </div>
    );
};

export default LandingPage;
