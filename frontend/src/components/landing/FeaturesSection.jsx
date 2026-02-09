import React from 'react';
import { 
  Users, 
  Zap, 
  Globe, 
  MessageSquare, 
  Code, 
  Trophy,
  Calendar,
  Brain,
  Shield,
  Cloud
} from 'lucide-react';

/**
 * Features Section Component
 * Highlights key platform features with icons and descriptions
 */
const FeaturesSection = () => {
  const features = [
    {
      icon: Users,
      title: "Smart Team Matching",
      description: "AI algorithms match you with compatible teammates based on skills, experience, and project preferences.",
      color: "blue"
    },
    {
      icon: Zap,
      title: "Real-time Collaboration",
      description: "Built-in IDE, live chat, and project management tools for seamless teamwork.",
      color: "purple"
    },
    {
      icon: Globe,
      title: "Global Community",
      description: "Connect with developers worldwide and participate in international hackathons.",
      color: "green"
    },
    {
      icon: Calendar,
      title: "Event Discovery",
      description: "Find hackathons, coding competitions, and developer events near you.",
      color: "orange"
    },
    {
      icon: Brain,
      title: "Skill Assessment",
      description: "Showcase your expertise and get matched with projects that fit your abilities.",
      color: "pink"
    },
    {
      icon: Trophy,
      title: "Winning Solutions",
      description: "Access templates, resources, and mentorship to build award-winning projects.",
      color: "yellow"
    }
  ];

  const integrations = [
    { name: "GitHub", icon: Code },
    { name: "Slack", icon: MessageSquare },
    { name: "AWS", icon: Cloud },
    { name: "Google Cloud", icon: Shield }
  ];

  return (
    <section id="features" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Everything You Need to <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Succeed</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Powerful features designed to help you find the perfect team, collaborate effectively, and build amazing projects.
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={index}
                className="group bg-gray-50 dark:bg-gray-800 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
              >
                <div className={`inline-flex p-3 rounded-lg bg-${feature.color}-100 dark:bg-${feature.color}-900/30 mb-4`}>
                  <IconComponent className={`h-6 w-6 text-${feature.color}-600 dark:text-${feature.color}-400`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Integrations Section */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl p-8 md:p-12">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Seamless Integrations
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Connect with your favorite tools and platforms
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8">
            {integrations.map((integration, index) => {
              const IconComponent = integration.icon;
              return (
                <div 
                  key={index}
                  className="flex items-center space-x-2 bg-white dark:bg-gray-700 px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <IconComponent className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    {integration.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;