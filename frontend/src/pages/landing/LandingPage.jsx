import React from 'react';
import HeroSection from '../../features/landing/HeroSection/HeroSection.jsx';
import FeaturesSection from '../../features/landing/FeaturesSection/FeaturesSection.jsx';
import WorkflowSection from '../../features/landing/WorkflowSection/WorkflowSection.jsx';
import Testimonials from '../../features/landing/TestimonialsSection/TestimonialsSection.jsx';
import CTASection from '../../features/landing/CTASection/CTASection.jsx';

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