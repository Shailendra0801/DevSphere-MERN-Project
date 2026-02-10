import React from 'react';
import { Quote, Star, User } from 'lucide-react';
import styles from './TestimonialsSection.module.css';

/**
 * Testimonials Section Component
 * Showcase user testimonials and success stories
 */
const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "DevSphere helped me find the perfect team for our hackathon project. We won first place and landed internship offers from two tech companies!",
      author: "Sarah Chen",
      role: "Software Engineer at Google",
      avatar: null,
      rating: 5
    },
    {
      quote: "The AI matching algorithm is incredible. I connected with developers who perfectly complemented my skills. Our project shipped 3 days ahead of schedule.",
      author: "Marcus Johnson",
      role: "Full Stack Developer",
      avatar: null,
      rating: 5
    },
    {
      quote: "As a beginner developer, I was nervous about joining hackathons. DevSphere's mentorship program gave me the confidence to participate and win.",
      author: "Priya Sharma",
      role: "Computer Science Student",
      avatar: null,
      rating: 5
    }
  ];

  return (
    <section className={styles.testimonialsSection}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            Loved by <span className={styles.highlightedText}>Developers Worldwide</span>
          </h2>
          <p className={styles.subtitle}>
            Join thousands of developers who have transformed their hackathon experience
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className={styles.testimonialsGrid}>
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className={styles.testimonialCard}
            >
              {/* Quote Icon */}
              <div className={styles.quoteIcon}>
                <Quote className={styles.quoteSvg} />
              </div>
              
              {/* Rating */}
              <div className={styles.rating}>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className={styles.starIcon} />
                ))}
              </div>
              
              {/* Quote */}
              <blockquote className={styles.quote}>
                &quot;{testimonial.quote}&quot;
              </blockquote>
              
              {/* Author */}
              <div className={styles.author}>
                <div className={styles.authorAvatar}>
                  {testimonial.avatar ? (
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.author}
                      className={styles.avatarImage}
                    />
                  ) : (
                    <div className={styles.avatarPlaceholder}>
                      <User className={styles.avatarIcon} />
                    </div>
                  )}
                </div>
                <div className={styles.authorInfo}>
                  <div className={styles.authorName}>
                    {testimonial.author}
                  </div>
                  <div className={styles.authorRole}>
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className={styles.statsSection}>
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <div className={styles.statValue}>10K+</div>
              <div className={styles.statLabel}>Active Users</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statValue}>500+</div>
              <div className={styles.statLabel}>Hackathons Hosted</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statValue}>95%</div>
              <div className={styles.statLabel}>Team Satisfaction</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statValue}>24/7</div>
              <div className={styles.statLabel}>Support Available</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;