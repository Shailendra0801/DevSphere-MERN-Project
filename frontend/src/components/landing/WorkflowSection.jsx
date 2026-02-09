import React from 'react';
import { CheckCircle, ArrowRight, Users, Search, Zap, Trophy } from 'lucide-react';

/**
 * Workflow Section Component
 * Shows the step-by-step process of using DevSphere
 */
const WorkflowSection = () => {
  const steps = [
    {
      icon: Search,
      title: "Discover Hackathons",
      description: "Browse upcoming events and find competitions that match your interests and skill level.",
      color: "blue"
    },
    {
      icon: Users,
      title: "Find Your Team",
      description: "Our AI matches you with compatible teammates based on skills, experience, and project goals.",
      color: "green"
    },
    {
      icon: Zap,
      title: "Start Building",
      description: "Collaborate in real-time with built-in tools, chat, and project management features.",
      color: "purple"
    },
    {
      icon: Trophy,
      title: "Ship & Win",
      description: "Deploy your project and showcase your work to judges and the community.",
      color: "yellow"
    }
  ];

  return (
    <section id="workflow" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            How <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">DevSphere</span> Works
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Get from idea to winning project in four simple steps
          </p>
        </div>

        {/* Workflow Steps */}
        <div className="relative">
          {/* Connecting Lines */}
          <div className="hidden md:block absolute top-24 left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-blue-500 to-purple-500"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div 
                  key={index}
                  className="relative group"
                >
                  {/* Step Number */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r from-${step.color}-500 to-${step.color}-600 flex items-center justify-center text-white font-bold text-xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      {index + 1}
                    </div>
                    
                    {/* Icon */}
                    <div className={`p-4 rounded-full bg-white dark:bg-gray-700 shadow-lg mb-4 group-hover:shadow-xl transition-shadow`}>
                      <IconComponent className={`h-8 w-8 text-${step.color}-600 dark:text-${step.color}-400`} />
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 text-center">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-center">
                      {step.description}
                    </p>
                  </div>
                  
                  {/* Arrow for desktop */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 -right-4 z-0">
                      <ArrowRight className="h-6 w-6 text-gray-400 dark:text-gray-500" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Benefits List */}
        <div className="mt-20 bg-white dark:bg-gray-700 rounded-2xl p-8 md:p-12 shadow-xl">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Why Developers Love DevSphere
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "AI-powered team matching saves hours of manual searching",
              "Built-in collaboration tools eliminate tool-hopping",
              "Access to exclusive hackathons and mentorship programs",
              "Portfolio building with real project showcases",
              "Community support from experienced developers",
              "Career opportunities through successful projects"
            ].map((benefit, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;