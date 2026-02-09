import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Users, Zap, Globe, Star, ChevronRight } from 'lucide-react';

/**
 * Hero Section Component
 * Main landing page hero with gradient background, floating elements, and CTAs
 */
const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-800 dark:text-blue-200 text-sm font-medium mb-6">
              <Star className="h-4 w-4 mr-2" />
              Trusted by 10,000+ developers
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Find Your Perfect{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Hackathon Team
              </span>
              <br />
              Build Faster Together
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto lg:mx-0">
              DevSphere helps developers discover hackathons, match with teammates using AI, 
              collaborate in real time, and ship winning projects.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 group"
                aria-label="Get started with DevSphere for free"
              >
                Get Started Free
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-semibold rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
                aria-label="Login to your existing account"
              >
                Login
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-md mx-auto lg:mx-0">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">50K+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Developers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">2K+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Hackathons</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">98%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Success Rate</div>
              </div>
            </div>
          </div>
          
          {/* Right Illustration */}
          <div className="relative">
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700">
              {/* Feature Cards Preview */}
              <div className="space-y-6">
                <div className="flex items-start space-x-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex-shrink-0">
                    <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Smart Matching</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">AI-powered team formation based on skills and interests</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="flex-shrink-0">
                    <Zap className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Real-time Collaboration</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Built-in IDE, chat, and project management tools</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex-shrink-0">
                    <Rocket className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Ship Fast</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Deploy your projects with one click</p>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold animate-bounce">
                <Star className="h-4 w-4 inline mr-1" />
                Trending
              </div>
              <div className="absolute -bottom-4 -left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                <Globe className="h-4 w-4 inline mr-1" />
                Global
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Custom animations */}
      <style>
        {`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}
      </style>
    </section>
  );
};

export default HeroSection;