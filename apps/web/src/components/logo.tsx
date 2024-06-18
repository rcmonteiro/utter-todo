import { ListTodo } from 'lucide-react'
import React from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const logoVariants = tv({
  base: ['flex items-center gap-2 font-semibold tracking-tighter text-primary'],

  variants: {
    size: {
      sm: 'text-2xl',
      lg: 'text-4xl',
    },
  },

  defaultVariants: {
    size: 'lg',
  },
})

interface LogoProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof logoVariants> {
  size?: 'sm' | 'lg'
}

const Logo = React.forwardRef<HTMLDivElement, LogoProps>(
  ({ size, className, ...props }, ref) => {
    return (
      <h1 ref={ref} {...props} className={logoVariants({ className, size })}>
        <ListTodo size={size === 'sm' ? 24 : 32} />
        Utter Todo
      </h1>
    )
  },
)
Logo.displayName = 'Logo'

export { Logo }
