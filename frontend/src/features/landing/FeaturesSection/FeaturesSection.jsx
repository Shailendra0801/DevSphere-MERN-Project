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
import styles from './FeaturesSection.module.css';

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
    <section id="features" className={styles.featuresSection}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            Everything You Need to <span className={styles.highlightedText}>Succeed</span>
          </h2>
          <p className={styles.subtitle}>
            Powerful features designed to help you find the perfect team, collaborate effectively, and build amazing projects.
          </p>
        </div>

        {/* Main Features Grid */}
        <div className={styles.featuresGrid}>
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={index}
                className={styles.featureCard}
              >
                <div className={styles.featureIconWrapper}>
                  <IconComponent className={styles.featureIcon} />
                </div>
                <h3 className={styles.featureTitle}>
                  {feature.title}
                </h3>
                <p className={styles.featureDescription}>
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Integrations Section */}
        <div className={styles.integrationsSection}>
          <div className={styles.integrationsHeader}>
            <h3 className={styles.integrationsTitle}>
              Seamless Integrations
            </h3>
            <p className={styles.integrationsSubtitle}>
              Connect with your favorite tools and platforms
            </p>
          </div>
          
          <div className={styles.integrationsGrid}>
            {integrations.map((integration, index) => {
              const IconComponent = integration.icon;
              return (
                <div 
                  key={index}
                  className={styles.integrationCard}
                >
                  <IconComponent className={styles.integrationIcon} />
                  <span className={styles.integrationName}>
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