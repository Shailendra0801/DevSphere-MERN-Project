import React from 'react';
import HeroSection from '../../components/landing/HeroSection.jsx';
import FeaturesSection from '../../components/landing/FeaturesSection.jsx';
import WorkflowSection from '../../components/landing/WorkflowSection.jsx';
import Testimonials from '../../components/landing/Testimonials.jsx';
import CTASection from '../../components/landing/CTASection.jsx';

/**
 * Landing Page Component
 * Main entry point for unauthenticated users
 * Composes all landing page sections into a complete experience
 */
const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Features Section */}
      <FeaturesSection />
      
      {/* Workflow Section */}
      <WorkflowSection />
      
      {/* Testimonials Section */}
      <Testimonials />
      
      {/* Final CTA Section */}
      <CTASection />
    </div>
  );
};

export default LandingPage;