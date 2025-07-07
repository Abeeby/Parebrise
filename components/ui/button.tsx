import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline'
  size?: 'default' | 'lg'
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'default', size = 'default', asChild, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50'
    const variantStyles = variant === 'default' 
      ? 'bg-primary-600 text-white hover:bg-primary-700' 
      : 'border border-gray-300 bg-white hover:bg-gray-50'
    const sizeStyles = size === 'lg' ? 'px-8 py-3 text-lg' : 'px-4 py-2'
    
    if (asChild) {
      return React.cloneElement(children as React.ReactElement, {
        className: `${baseStyles} ${variantStyles} ${sizeStyles} ${className}`,
        ref,
        ...props
      })
    }
    
    return (
      <button
        className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'