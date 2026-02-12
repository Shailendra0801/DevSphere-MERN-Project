import React from 'react';
import { CheckCircle, ArrowRight, Users, Search, Zap, Trophy } from 'lucide-react';
import styles from './WorkflowSection.module.css';

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
    <section id="workflow" className={styles.workflowSection}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            How <span className={styles.highlightedText}>DevSphere</span> Works
          </h2>
          <p className={styles.subtitle}>
            Get from idea to winning project in four simple steps
          </p>
        </div>

        {/* Workflow Steps */}
        <div className={styles.workflowContainer}>
          {/* Connecting Lines */}
          <div className={styles.connectingLine}></div>
          
          <div className={styles.stepsGrid}>
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div 
                  key={index}
                  className={styles.stepContainer}
                >
                  {/* Step Number */}
                  <div className={styles.stepNumberWrapper}>
                    <div className={styles.stepNumber}>
                      {index + 1}
                    </div>
                    
                    {/* Icon */}
                    <div className={styles.stepIconWrapper}>
                      <IconComponent className={styles.stepIcon} />
                    </div>
                    
                    {/* Content */}
                    <h3 className={styles.stepTitle}>
                      {step.title}
                    </h3>
                    <p className={styles.stepDescription}>
                      {step.description}
                    </p>
                  </div>
                  
                  {/* Arrow for desktop */}
                  {index < steps.length - 1 && index != 1 && (
                    <div className={styles.arrowIcon}>
                      <ArrowRight className={styles.arrowSvg} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Benefits List */}
        <div className={styles.benefitsCard}>
          <h3 className={styles.benefitsTitle}>
            Why Developers Love DevSphere
          </h3>
          
          <div className={styles.benefitsGrid}>
            {[
              "AI-powered team matching saves hours of manual searching",
              "Built-in collaboration tools eliminate tool-hopping",
              "Access to exclusive hackathons and mentorship programs",
              "Portfolio building with real project showcases",
              "Community support from experienced developers",
              "Career opportunities through successful projects"
            ].map((benefit, index) => (
              <div key={index} className={styles.benefitItem}>
                <CheckCircle className={styles.checkIcon} />
                <span className={styles.benefitText}>{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;