import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Users, Zap, Globe, Star, ChevronRight } from 'lucide-react';
import styles from './HeroSection.module.css';

/**
 * Hero Section Component
 * Main landing page hero with gradient background, floating elements, and CTAs
 */
const HeroSection = () => {
  return (
    <section className={styles.heroSection}>
      {/* Floating decorative elements */}
      <div className={styles.floatingElement1}></div>
      <div className={styles.floatingElement2}></div>
      <div className={styles.floatingElement3}></div>
      
      <div className={styles.container}>
        <div className={styles.contentGrid}>
          {/* Left Content */}
          <div className={styles.leftContent}>
            <div className={styles.badge}>
              <Star className={styles.badgeIcon} />
              Trusted by 10,000+ developers
            </div>
            
            <h1 className={styles.title}>
              Find Your Perfect{' '}
              <span className={styles.highlightedText}>
                Hackathon Team
              </span>
              <br />
              Build Faster Together
            </h1>
            
            <p className={styles.description}>
              DevSphere helps developers discover hackathons, match with teammates using AI, 
              collaborate in real time, and ship winning projects.
            </p>
            
            {/* CTA Buttons */}
            <div className={styles.ctaButtons}>
              <Link
                to="/register"
                className={styles.primaryButton}
                aria-label="Get started with DevSphere for free"
              >
                Get Started Free
                <ChevronRight className={styles.buttonIcon} />
              </Link>
              <Link
                to="/login"
                className={styles.secondaryButton}
                aria-label="Login to your existing account"
              >
                Login
              </Link>
            </div>
            
            {/* Stats */}
            <div className={styles.statsGrid}>
              <div className={styles.statItem}>
                <div className={styles.statValue}>50K+</div>
                <div className={styles.statLabel}>Developers</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statValue}>2K+</div>
                <div className={styles.statLabel}>Hackathons</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statValue}>98%</div>
                <div className={styles.statLabel}>Success Rate</div>
              </div>
            </div>
          </div>
          
          {/* Right Illustration */}
          <div className={styles.rightIllustration}>
            <div className={styles.featurePreviewCard}>
              {/* Feature Cards Preview */}
              <div className={styles.previewFeatures}>
                <div className={styles.previewCard}>
                  <div className={styles.previewIcon}>
                    <Users className={styles.previewIconSvg} />
                  </div>
                  <div>
                    <h3 className={styles.previewTitle}>Smart Matching</h3>
                    <p className={styles.previewDescription}>AI-powered team formation based on skills and interests</p>
                  </div>
                </div>
                
                <div className={styles.previewCard}>
                  <div className={styles.previewIcon}>
                    <Zap className={styles.previewIconSvg} />
                  </div>
                  <div>
                    <h3 className={styles.previewTitle}>Real-time Collaboration</h3>
                    <p className={styles.previewDescription}>Built-in IDE, chat, and project management tools</p>
                  </div>
                </div>
                
                <div className={styles.previewCard}>
                  <div className={styles.previewIcon}>
                    <Rocket className={styles.previewIconSvg} />
                  </div>
                  <div>
                    <h3 className={styles.previewTitle}>Ship Fast</h3>
                    <p className={styles.previewDescription}>Deploy your projects with one click</p>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className={styles.trendingBadge}>
                <Star className={styles.badgeIconSmall} />
                Trending
              </div>
              <div className={styles.globalBadge}>
                <Globe className={styles.badgeIconSmall} />
                Global
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Custom animations */}
      <style>
        {`
        @keyframes heroBlob {
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
        .${styles.animateBlob} {
          animation: heroBlob 7s infinite;
        }
        .${styles.animationDelay2000} {
          animation-delay: 2s;
        }
        .${styles.animationDelay4000} {
          animation-delay: 4s;
        }
      `}
      </style>
    </section>
  );
};

export default HeroSection;