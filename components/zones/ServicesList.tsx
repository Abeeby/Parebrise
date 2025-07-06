'use client';

import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface Service {
  icon: string;
  title: string;
  description: string;
}

interface ServicesListProps {
  services: Service[];
  columns?: 1 | 2 | 3;
  className?: string;
}

export default function ServicesList({ services, columns = 3, className }: ServicesListProps) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
  };

  return (
    <div className={cn(`grid ${gridCols[columns]} gap-6 my-8`, className)}>
      {services.map((service, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow">
          <CardHeader className="text-center pb-2">
            <div className="text-4xl mb-2">{service.icon}</div>
          </CardHeader>
          <CardContent className="text-center">
            <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
            <p className="text-muted-foreground">{service.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 