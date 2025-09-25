"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { staggerContainer, staggerItem, sectionReveal } from "@/lib/motion";


const testimonials = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Adventure Photographer",
    avatar: "",
    rating: 5,
    quote: "Unwind Designs transformed my Troopy into the perfect mobile studio. The storage solutions are ingenious and the quality is outstanding. Couldn't be happier with the result!",
    location: "Melbourne, VIC"
  },
  {
    id: 2,
    name: "Mike Thompson",
    role: "4WD Enthusiast",
    avatar: "",
    rating: 5,
    quote: "Professional service from start to finish. The team understood exactly what I needed for my remote adventures. The electrical system has been flawless in the outback.",
    location: "Perth, WA"
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Travel Blogger",
    avatar: "",
    rating: 5,
    quote: "Incredible attention to detail and craftsmanship. My van fitout has exceeded all expectations. The customer service throughout the process was exceptional.",
    location: "Brisbane, QLD"
  }
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <motion.section 
      className="py-20 bg-cream-400"
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          variants={staggerItem}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-textPrimary mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-textSecondary max-w-2xl mx-auto">
                         Don&apos;t just take our word for it - hear from the adventurers who&apos;ve transformed their vehicles with us.
          </p>
        </motion.div>

        <motion.div 
          className="relative"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Testimonial Container */}
          <div className="overflow-hidden">
            <motion.div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <motion.div
                    className="bg-cream-300 rounded-xl p-8 border border-borderNeutral shadow-soft text-center max-w-2xl mx-auto"
                    variants={staggerItem}
                  >
                    {/* Quote Icon */}
                    <div className="w-16 h-16 mx-auto mb-6 bg-brown-100 rounded-full flex items-center justify-center">
                      <Quote className="w-8 h-8 text-brown-500" />
                    </div>

                    {/* Rating */}
                    <div className="flex justify-center mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-6 h-6 text-yellow-400 fill-current mx-1"
                        />
                      ))}
                    </div>

                    {/* Quote */}
                                         <blockquote className="text-xl text-textPrimary leading-relaxed mb-8 italic">
                       &ldquo;{testimonial.quote}&rdquo;
                     </blockquote>

                    {/* Author */}
                    <div className="flex items-center justify-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-brown-200 to-brown-300 rounded-full flex items-center justify-center">
                        {testimonial.avatar ? (
                          <img 
                            src={testimonial.avatar} 
                            alt={testimonial.name} 
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <span className="text-2xl font-bold text-textPrimary">
                            {testimonial.name.charAt(0)}
                          </span>
                        )}
                      </div>
                      <div className="text-left">
                        <h4 className="font-semibold text-textPrimary text-lg">
                          {testimonial.name}
                        </h4>
                        <p className="text-textSecondary text-body-small">
                          {testimonial.role}
                        </p>
                        <p className="text-textSecondary text-body-small">
                          {testimonial.location}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, i) => (
                              <button
                  key={i}
                  onClick={() => goToTestimonial(i)}
                                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    i === currentIndex 
                      ? 'bg-brown-500 scale-125' 
                      : 'bg-borderNeutral hover:bg-brown-300'
                  }`}
                                  aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-cream-300 rounded-full flex items-center justify-center text-textPrimary hover:bg-brown-100 transition-colors border border-borderNeutral shadow-soft"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-cream-300 rounded-full flex items-center justify-center text-textPrimary hover:bg-brown-100 transition-colors border border-borderNeutral shadow-soft"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </motion.div>

        {/* CTA */}
        <motion.div 
          className="text-center mt-12"
          variants={staggerItem}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="bg-brown-500 hover:bg-darkBrown text-cream-400 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 shadow-soft hover:shadow-medium"
          >
            Read More Reviews
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
}
