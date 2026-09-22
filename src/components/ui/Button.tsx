import React from 'react';
import { Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { buttonTapVariants } from '../motion/MotionTokens';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'dark' | 'ghost' | 'accent-soft';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  className = '',
  disabled,
  ...props
}) => {
  // Mathematical 2x horizontal to vertical padding rule
  const sizeStyles = {
    sm: 'text-xs py-1.5 px-3 rounded-full font-medium gap-1.5 h-8',
    md: 'text-sm py-2.5 px-5 rounded-full font-medium gap-2 h-10',
    lg: 'text-base py-3.5 px-7 rounded-full font-semibold gap-2.5 h-12',
  };

  const variantStyles = {
    // Signature ProteinPath Botanical Emerald Accent
    primary:
      'bg-[#0E6245] text-white hover:bg-[#0A4F37] active:bg-[#073F2B] shadow-[0_2px_8px_-2px_rgba(14,98,69,0.35)] transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-[#0E6245]/40',
    // Luxury Muted Stone / Off-white Secondary
    secondary:
      'bg-white text-[#121312] border border-[#EBEAE5] hover:bg-[#F5F5F0] hover:border-[#DCD9D0] active:bg-[#EFEFEA] shadow-[0_1px_3px_rgba(0,0,0,0.03)] transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-stone-300',
    // Obsidian Deep Black
    dark:
      'bg-[#121312] text-white hover:bg-[#222422] active:bg-[#000000] shadow-[0_2px_10px_-2px_rgba(18,19,18,0.3)] transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-stone-400',
    // Delicate Accent Tint
    'accent-soft':
      'bg-[#EAF4EF] text-[#0E6245] border border-[#D5E8DE] hover:bg-[#DFEFE6] active:bg-[#CFE5D8] transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-[#0E6245]/30 font-medium',
    // Minimal Ghost
    ghost:
      'bg-transparent text-[#5E605D] hover:text-[#121312] hover:bg-[#F5F5F0] transition-colors duration-150',
  };

  return (
    <motion.button
      variants={buttonTapVariants}
      initial="initial"
      whileTap={disabled || isLoading ? undefined : "tap"}
      className={`
        inline-flex items-center justify-center whitespace-nowrap cursor-pointer select-none
        outline-none disabled:opacity-45 disabled:pointer-events-none disabled:cursor-not-allowed
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      disabled={disabled || isLoading}
      {...(props as any)}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : (
        <>
          {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
          <span className="truncate">{children}</span>
          {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
        </>
      )}
    </motion.button>
  );
};

// Explicit convenience exports for design system documentation
export const PrimaryButton: React.FC<Omit<ButtonProps, 'variant'>> = (props) => (
  <Button variant="primary" {...props} />
);

export const SecondaryButton: React.FC<Omit<ButtonProps, 'variant'>> = (props) => (
  <Button variant="secondary" {...props} />
);

