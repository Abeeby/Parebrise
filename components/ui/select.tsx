import React from 'react'

interface SelectProps {
  value?: string
  onValueChange?: (value: string) => void
  disabled?: boolean
  children: React.ReactNode
}

export const Select = ({ children }: SelectProps) => <>{children}</>

export const SelectTrigger = ({ 
  id, 
  children, 
  className = '' 
}: React.HTMLAttributes<HTMLDivElement> & { id?: string }) => (
  <div className={`flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}>
    {children}
  </div>
)

export const SelectValue = ({ 
  placeholder = '' 
}: { placeholder?: string }) => (
  <span>{placeholder}</span>
)

export const SelectContent = ({ 
  children 
}: { children: React.ReactNode }) => (
  <div className="relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md">
    {children}
  </div>
)

export const SelectItem = ({ 
  value, 
  children 
}: { value: string; children: React.ReactNode }) => (
  <div className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground">
    {children}
  </div>
)