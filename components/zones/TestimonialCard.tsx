'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TestimonialCardProps {
  author: string;
  location: string;
  rating: number;
  date: string;
  children: React.ReactNode;
  className?: string;
}

export default function TestimonialCard({
  author,
  location,
  rating,
  date,
  children,
  className
}: TestimonialCardProps) {
  return (
    <Card className={cn('my-8 border-2 hover:shadow-lg transition-shadow', className)}>
      <CardContent className="p-6">
        {/* Citation icon */}
        <Quote className="h-8 w-8 text-blue-500 opacity-20 mb-4" />
        
        {/* Étoiles */}
        <div className="flex gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                'h-5 w-5',
                i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
              )}
            />
          ))}
        </div>
        
        {/* Contenu du témoignage */}
        <div className="text-lg leading-relaxed mb-6 text-muted-foreground">
          {children}
        </div>
        
        {/* Infos auteur */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div>
            <p className="font-semibold">{author}</p>
            <p className="text-sm text-muted-foreground">{location}</p>
          </div>
          <p className="text-sm text-muted-foreground">{date}</p>
        </div>
      </CardContent>
    </Card>
  );
} 