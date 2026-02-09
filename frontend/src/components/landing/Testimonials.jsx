import React from 'react';
import { Quote, Star, User } from 'lucide-react';

/**
 * Testimonials Section Component
 * Showcase user testimonials and success stories
 */
const Testimonials = () => {
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
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Loved by <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Developers Worldwide</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Join thousands of developers who have transformed their hackathon experience
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group"
            >
              {/* Quote Icon */}
              <div className="text-blue-500 mb-4">
                <Quote className="h-8 w-8" />
              </div>
              
              {/* Rating */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              {/* Quote */}
              <blockquote className="text-gray-700 dark:text-gray-300 text-lg mb-6 italic">
                &quot;{testimonial.quote}&quot;
              </blockquote>
              
              {/* Author */}
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  {testimonial.avatar ? (
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.author}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                      <User className="h-6 w-6 text-white" />
                    </div>
                  )}
                </div>
                <div className="ml-4">
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.author}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">10K+</div>
              <div className="text-blue-100">Active Users</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-100">Hackathons Hosted</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">95%</div>
              <div className="text-blue-100">Team Satisfaction</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">Support Available</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;