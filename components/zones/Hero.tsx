'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface HeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  ctaText?: string;
  ctaLink?: string;
  className?: string;
}

export default function Hero({
  title,
  subtitle,
  backgroundImage,
  ctaText = 'Devis gratuit',
  ctaLink = '#contact',
  className
}: HeroProps) {
  return (
    <section 
      className={cn(
        "relative min-h-[400px] lg:min-h-[500px] flex items-center justify-center text-white",
        className
      )}
    >
      {/* Background avec overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          // backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
          // Temporaire : couleur de fond en attendant les images
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
          backgroundColor: !backgroundImage ? '#0056b3' : undefined
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
      </div>
      
      {/* Contenu */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 animate-fade-in-up">
          {title}
        </h1>
        
        {subtitle && (
          <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-3xl mx-auto animate-fade-in-up animation-delay-100">
            {subtitle}
          </p>
        )}
        
        {ctaText && (
          <div className="animate-fade-in-up animation-delay-200">
            <Button 
              size="lg" 
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-6 text-lg"
              asChild
            >
              <Link href={ctaLink}>
                {ctaText}
              </Link>
            </Button>
          </div>
        )}
      </div>
      
      {/* Indicateur de scroll */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg 
          className="w-6 h-6 text-white opacity-75" 
          fill="none" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
} 