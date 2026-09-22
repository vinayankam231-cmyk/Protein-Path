import React from 'react';

// Large Headings (Display & Hero)
export const LargeHeading: React.FC<{
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
}> = ({ children, className = '', as: Component = 'h1' }) => (
  <Component
    className={`text-2xl sm:text-3xl font-bold tracking-tight text-[#121312] leading-[1.2] ${className}`}
  >
    {children}
  </Component>
);

// Section Headings
export const SectionHeading: React.FC<{
  children: React.ReactNode;
  className?: string;
  as?: 'h2' | 'h3' | 'h4';
}> = ({ children, className = '', as: Component = 'h2' }) => (
  <Component
    className={`text-lg sm:text-xl font-semibold tracking-[-0.015em] text-[#121312] leading-[1.3] ${className}`}
  >
    {children}
  </Component>
);

// Subheadings / Small Section Headings
export const Subheading: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <h3 className={`text-base font-semibold text-[#121312] tracking-tight leading-[1.4] ${className}`}>
    {children}
  </h3>
);

// Body Text
export const BodyText: React.FC<{
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}> = ({ children, className = '', size = 'md' }) => {
  const sizeMap = {
    sm: 'text-sm leading-[1.55]',
    md: 'text-[15px] sm:text-base leading-[1.6]',
    lg: 'text-lg leading-[1.65]',
  };
  return (
    <p className={`text-[#121312]/90 font-normal ${sizeMap[size]} ${className}`}>
      {children}
    </p>
  );
};

// Secondary / Metadata Text
export const SecondaryText: React.FC<{
  children: React.ReactNode;
  className?: string;
  size?: 'xs' | 'sm';
}> = ({ children, className = '', size = 'sm' }) => {
  const sizeMap = {
    xs: 'text-xs leading-[1.4]',
    sm: 'text-sm leading-[1.5]',
  };
  return (
    <p className={`text-[#5E605D] font-normal ${sizeMap[size]} ${className}`}>
      {children}
    </p>
  );
};

// Nutrition Numbers
export const NutritionNumber: React.FC<{
  value: number | string;
  unit: string;
  label?: string;
  isHero?: boolean;
  className?: string;
}> = ({ value, unit, label, isHero = false, className = '' }) => (
  <div className={`inline-flex flex-col items-start ${className}`}>
    <div className="flex items-baseline gap-0.5 tabular-nums">
      <span
        className={`font-bold tracking-tight ${
          isHero ? 'text-2xl sm:text-3xl text-[#0E6245]' : 'text-base sm:text-lg text-[#121312]'
        }`}
      >
        {value}
      </span>
      <span className="text-xs font-medium text-[#5E605D]">{unit}</span>
    </div>
    {label && (
      <span className="text-[10px] uppercase tracking-wider font-semibold text-[#8C8E8B] mt-0.5">
        {label}
      </span>
    )}
  </div>
);

// Button Text
export const ButtonText: React.FC<{
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}> = ({ children, size = 'md', className = '' }) => {
  const sizeMap = {
    sm: 'text-xs font-medium tracking-[0.01em]',
    md: 'text-sm font-semibold tracking-[0.01em]',
    lg: 'text-base font-semibold tracking-[0.01em]',
  };
  return <span className={`${sizeMap[size]} select-none whitespace-nowrap ${className}`}>{children}</span>;
};
