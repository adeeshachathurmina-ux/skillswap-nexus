'use client';

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const variantStyles = {
  primary:
    'bg-gradient-to-r from-violet to-purple-600 text-white hover:shadow-lg hover:shadow-violet/30 shadow-lg shadow-violet/20',
  secondary:
    'bg-mint text-ink hover:bg-mint/90 shadow-lg shadow-mint/20',
  ghost: 'text-white hover:bg-white/10',
  outline:
    'border border-mint/40 text-mint hover:bg-mint/10',
};

const sizeStyles = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`rounded-full font-semibold transition-all ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

// Badge Component
interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger';
  className?: string;
}

const badgeVariants = {
  default: 'bg-white/10 text-white',
  success: 'bg-mint/20 text-mint',
  warning: 'bg-yellow-500/20 text-yellow-300',
  danger: 'bg-coral/20 text-coral',
};

export function Badge({
  children,
  variant = 'default',
  className = '',
}: BadgeProps) {
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${badgeVariants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

// Input Component
interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export function Input({
  label,
  error,
  icon,
  className = '',
  ...props
}: InputProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-semibold text-white">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60">
            {icon}
          </span>
        )}
        <input
          className={`w-full rounded-2xl border border-white/10 bg-white/5 py-3 ${
            icon ? 'pl-11 pr-4' : 'px-4'
          } text-white outline-none transition-all focus:border-mint focus:bg-white/10 placeholder-white/40 ${className}`}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-coral">{error}</p>}
    </div>
  );
}
