import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Sparkles, ChevronRight } from 'lucide-react';
import styles from './CTASection.module.css';

/**
 * CTA Section Component
 * Final call-to-action to encourage signups
 */
const CTASection = () => {
  return (
    <section className={styles.ctaSection}>
      {/* Background decoration */}
      <div className={styles.backgroundDecoration1}></div>
      <div className={styles.backgroundDecoration2}></div>
      
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Icon */}
          <div className={styles.iconWrapper}>
            <Rocket className={styles.rocketIcon} />
          </div>
          
          {/* Heading */}
          <h2 className={styles.title}>
            Ready to Build Something Amazing?
          </h2>
          
          <p className={styles.description}>
            Join thousands of developers already creating winning projects with DevSphere. 
            Start your journey today - it&apos;s free!
          </p>
          
          {/* CTA Buttons */}
          <div className={styles.buttonsContainer}>
            <Link
              to="/register"
              className={styles.primaryButton}
              aria-label="Create your free account"
            >
              Get Started Free
              <ChevronRight className={styles.buttonIcon} />
            </Link>
            <Link
              to="/login"
              className={styles.secondaryButton}
              aria-label="Login to your existing account"
            >
              I Have an Account
            </Link>
          </div>
          
          {/* Trust indicators */}
          <div className={styles.trustIndicators}>
            <div className={styles.trustItem}>
              <Sparkles className={styles.sparkleIcon} />
              <span>No credit card required</span>
            </div>
            <div className={styles.trustItem}>
              <Sparkles className={styles.sparkleIcon} />
              <span>Free forever tier</span>
            </div>
            <div className={styles.trustItem}>
              <Sparkles className={styles.sparkleIcon} />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;