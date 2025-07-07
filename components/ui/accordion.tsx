import React from 'react'

interface AccordionProps {
  type?: 'single' | 'multiple'
  collapsible?: boolean
  className?: string
  children: React.ReactNode
}

export const Accordion = ({ 
  type = 'single', 
  collapsible = false, 
  className = '', 
  children 
}: AccordionProps) => {
  return (
    <div className={`divide-y divide-gray-200 ${className}`}>
      {children}
    </div>
  )
}

interface AccordionItemProps {
  value: string
  children: React.ReactNode
}

export const AccordionItem = ({ value, children }: AccordionItemProps) => {
  return (
    <div className="py-4" data-value={value}>
      {children}
    </div>
  )
}

interface AccordionTriggerProps {
  className?: string
  children: React.ReactNode
}

export const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  AccordionTriggerProps
>(({ className = '', children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={`flex w-full items-center justify-between py-4 font-medium transition-all hover:underline text-left ${className}`}
      {...props}
    >
      {children}
      <svg
        className="h-4 w-4 shrink-0 transition-transform duration-200"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </button>
  )
})

AccordionTrigger.displayName = 'AccordionTrigger'

interface AccordionContentProps {
  className?: string
  children: React.ReactNode
}

export const AccordionContent = React.forwardRef<
  HTMLDivElement,
  AccordionContentProps
>(({ className = '', children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`overflow-hidden text-sm transition-all ${className}`}
      {...props}
    >
      <div className="pb-4 pt-0">{children}</div>
    </div>
  )
})

AccordionContent.displayName = 'AccordionContent'