import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Sparkles, ChevronRight } from 'lucide-react';

/**
 * CTA Section Component
 * Final call-to-action to encourage signups
 */
const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(255,255,255,0.1)_0%,transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.05)_0%,transparent_50%)]"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full mb-8">
            <Rocket className="h-10 w-10 text-white" />
          </div>
          
          {/* Heading */}
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Build Something Amazing?
          </h2>
          
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Join thousands of developers already creating winning projects with DevSphere. 
            Start your journey today - it&apos;s free!
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 group text-lg"
              aria-label="Create your free account"
            >
              Get Started Free
              <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-200 text-lg"
              aria-label="Login to your existing account"
            >
              I Have an Account
            </Link>
          </div>
          
          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-8 text-blue-100">
            <div className="flex items-center">
              <Sparkles className="h-5 w-5 mr-2" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center">
              <Sparkles className="h-5 w-5 mr-2" />
              <span>Free forever tier</span>
            </div>
            <div className="flex items-center">
              <Sparkles className="h-5 w-5 mr-2" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;