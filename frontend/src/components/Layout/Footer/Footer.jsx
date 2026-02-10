import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Twitter, Github, Linkedin, MessageCircle, ArrowUpRight, Heart, Mail } from 'lucide-react';
import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Product',
      links: [
        { name: 'Features', href: '#' },
        { name: 'Solutions', href: '#' },
        { name: 'Pricing', href: '#' },
        { name: 'Documentation', href: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About', href: '#' },
        { name: 'Blog', href: '#' },
        { name: 'Careers', href: '#' },
        { name: 'Contact', href: '#' },
      ],
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '#' },
        { name: 'Community', href: '#' },
        { name: 'Status', href: '#' },
        { name: 'Security', href: '#' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy', href: '#' },
        { name: 'Terms', href: '#' },
        { name: 'Cookies', href: '#' },
        { name: 'Licenses', href: '#' },
      ],
    },
  ];

  const socialLinks = [
    { name: 'Twitter', href: '#', icon: Twitter, color: 'twitter' },
    { name: 'GitHub', href: '#', icon: Github, color: 'github' },
    { name: 'LinkedIn', href: '#', icon: Linkedin, color: 'linkedin' },
    { name: 'Discord', href: '#', icon: MessageCircle, color: 'discord' },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.gradientOverlay}></div>
      
      <div className={styles.container}>
        {/* Main Footer Content */}
        <div className={styles.contentGrid}>
          {/* Brand Section */}
          <div className={styles.brandSection}>
            {/* Logo */}
            <div className={styles.logoContainer}>
              <Link to="/" className={styles.logoLink}>
                <div className={styles.logoWrapper}>
                  <div className={styles.logoGradient}></div>
                  <div className={styles.logoIcon}>
                    <Code className={styles.logoSvg} strokeWidth={2.5} />
                  </div>
                </div>
                <div className={styles.logoText}>
                  <span className={styles.logoTitle}>
                    DevSphere
                  </span>
                  <span className={styles.logoSubtitle}>
                    Build Better
                  </span>
                </div>
              </Link>
            </div>

            <p className={styles.brandDescription}>
              Building the future of web development with modern tools and best practices. 
              Join thousands of developers creating amazing experiences.
            </p>

            {/* Newsletter */}
            <div className={styles.newsletterSection}>
              <p className={styles.newsletterTitle}>Stay in the loop</p>
              <div className={styles.newsletterForm}>
                <div className={styles.inputWrapper}>
                  <Mail className={styles.mailIcon} />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className={styles.newsletterInput}
                  />
                </div>
                <button className={styles.subscribeButton}>
                  Subscribe
                </button>
              </div>
            </div>

            {/* Social Links */}
            <div className={styles.socialLinks}>
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className={`${styles.socialLink} ${styles[`socialLink--${social.color}`]}`}
                    aria-label={social.name}
                  >
                    <IconComponent className={styles.socialIcon} strokeWidth={2} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links Sections */}
          {footerLinks.map((section) => (
            <div key={section.title} className={styles.linkSection}>
              <h3 className={styles.sectionTitle}>
                {section.title}
              </h3>
              <ul className={styles.linkList}>
                {section.links.map((link) => (
                  <li key={link.name} className={styles.linkItem}>
                    <Link
                      to={link.href}
                      className={styles.link}
                    >
                      <span className={styles.linkText}>
                        {link.name}
                      </span>
                      <ArrowUpRight className={styles.linkArrow} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <div className={styles.bottomContent}>
            <div className={styles.copyright}>
              <span>&copy; {currentYear} DevSphere. All rights reserved.</span>
              <span className={styles.separator}>•</span>
              <span className={styles.madeWithLove}>
                Made with <Heart className={styles.heartIcon} /> by DevSphere Team
              </span>
            </div>
            <div className={styles.legalLinks}>
              <Link to="#" className={styles.legalLink}>
                Privacy Policy
              </Link>
              <Link to="#" className={styles.legalLink}>
                Terms of Service
              </Link>
              <Link to="#" className={styles.legalLink}>
                Cookies
              </Link>
            </div>
          </div>

          {/* Back to top */}
          <div className={styles.backToTop}>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className={styles.backToTopButton}
              aria-label="Back to top"
            >
              <svg className={styles.backToTopIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              Back to top
            </button>
          </div>
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className={styles.bottomGradient}></div>
    </footer>
  );
};

export default Footer;