'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface CTAProps {
  text: string;
  href: string;
  icon?: string;
}

interface CTASectionProps {
  title: string;
  description?: string;
  primaryCTA: CTAProps;
  secondaryCTA?: CTAProps;
  className?: string;
}

export default function CTASection({
  title,
  description,
  primaryCTA,
  secondaryCTA,
  className
}: CTASectionProps) {
  return (
    <section className={cn(
      'my-16 p-8 md:p-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl text-white text-center',
      className
    )}>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {title}
        </h2>
        
        {description && (
          <p className="text-lg md:text-xl mb-8 opacity-90">
            {description}
          </p>
        )}
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-6"
            asChild
          >
            <Link href={primaryCTA.href}>
              {primaryCTA.icon && <span className="mr-2 text-xl">{primaryCTA.icon}</span>}
              {primaryCTA.text}
            </Link>
          </Button>
          
          {secondaryCTA && (
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 font-semibold px-8 py-6"
              asChild
            >
              <Link href={secondaryCTA.href}>
                {secondaryCTA.icon && <span className="mr-2 text-xl">{secondaryCTA.icon}</span>}
                {secondaryCTA.text}
              </Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
} 