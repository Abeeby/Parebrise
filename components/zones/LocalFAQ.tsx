'use client';

import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';

interface FAQItem {
  question: string;
  answer: string;
}

interface LocalFAQProps {
  questions: FAQItem[];
  title?: string;
  className?: string;
}

export default function LocalFAQ({ questions, title = 'Questions fréquentes', className }: LocalFAQProps) {
  return (
    <section className={cn('my-12', className)}>
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        {title}
      </h2>
      
      <Accordion type="single" collapsible className="max-w-3xl mx-auto">
        {questions.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">
              <span className="flex items-start gap-2">
                <span className="text-blue-600 font-semibold shrink-0">Q{index + 1}.</span>
                <span>{item.question}</span>
              </span>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
} 