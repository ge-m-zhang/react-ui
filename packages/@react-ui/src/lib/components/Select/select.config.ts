import { cva } from 'class-variance-authority';

export const SelectSizes = ['small', 'medium', 'large'] as const;
export type SelectSize = (typeof SelectSizes)[number];

export const SelectStates = ['default', 'error', 'success'] as const;
export type SelectState = (typeof SelectStates)[number];

export const selectVariants = cva(
  [
    'relative',
    'w-full',
    'bg-white',
    'border',
    'rounded-md',
    'transition-all',
    'duration-200',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-0',
    'appearance-none',
    'cursor-pointer',
    'pr-10', // Space for chevron icon
  ],
  {
    variants: {
      size: {
        small: 'px-3 py-1.5 text-sm',
        medium: 'px-3 py-2 text-base',
        large: 'px-4 py-3 text-lg',
      },
      state: {
        default: 'border-gray-300 focus:border-blue-500 focus:ring-blue-500/20',
        error: 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
        success:
          'border-green-500 focus:border-green-500 focus:ring-green-500/20',
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-auto',
      },
      disabled: {
        true: 'bg-gray-50 text-gray-500 cursor-not-allowed opacity-60',
        false: 'hover:border-gray-400',
      },
    },
    defaultVariants: {
      size: 'medium',
      state: 'default',
      fullWidth: true,
      disabled: false,
    },
  },
);

export const selectChevronVariants = cva(
  [
    'absolute',
    'right-3',
    'top-1/2',
    'transform',
    '-translate-y-1/2',
    'pointer-events-none',
    'text-gray-400',
    'transition-transform',
    'duration-200',
  ],
  {
    variants: {
      size: {
        small: 'w-4 h-4',
        medium: 'w-5 h-5',
        large: 'w-6 h-6',
      },
      isOpen: {
        true: 'rotate-180',
        false: 'rotate-0',
      },
    },
    defaultVariants: {
      size: 'medium',
      isOpen: false,
    },
  },
);

// TODO: Enhanced animations - Add smooth open/close transitions with transform and opacity animations
export const selectDropdownVariants = cva(
  [
    'absolute',
    'z-50',
    'w-full',
    'bg-white',
    'border',
    'border-gray-300',
    'rounded-md',
    'shadow-lg',
    'max-h-60',
    'overflow-y-auto',
    'mt-1',
  ],
  {
    variants: {
      isOpen: {
        true: 'block',
        false: 'hidden',
      },
    },
    defaultVariants: {
      isOpen: false,
    },
  },
);

export const selectOptionVariants = cva(
  [
    // Button reset styles for accessibility compliance
    // These ensure button elements behave like the original div options
    'w-full',
    'text-left',
    'border-none',
    'bg-transparent',
    'p-0',
    // Original option styles
    'px-3',
    'py-2',
    'text-sm',
    'cursor-pointer',
    'transition-colors',
    'duration-150',
    'hover:bg-gray-100',
    'focus:bg-gray-100',
    'focus:outline-none',
  ],
  {
    variants: {
      selected: {
        true: 'bg-blue-50 text-blue-600 font-medium',
        false: 'text-gray-900',
      },
      disabled: {
        true: 'text-gray-400 cursor-not-allowed hover:bg-transparent',
        false: '',
      },
    },
    defaultVariants: {
      selected: false,
      disabled: false,
    },
  },
);

export const helperTextVariants = cva('text-sm mt-1', {
  variants: {
    state: {
      default: 'text-gray-600',
      error: 'text-red-600',
      success: 'text-green-600',
    },
  },
  defaultVariants: {
    state: 'default',
  },
});
