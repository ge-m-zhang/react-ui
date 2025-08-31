import { type VariantProps } from 'class-variance-authority';
import type React from 'react';
import {
  forwardRef,
  useId,
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from 'react';

import { cn } from '../../tools/classNames';
import {
  selectVariants,
  selectChevronVariants,
  selectDropdownVariants,
  selectOptionVariants,
  helperTextVariants,
  type SelectSize,
  type SelectState,
} from './select.config';

/**
 * Select Component
 *
 * A customizable select dropdown component with accessibility support.
 * Built with accessibility in mind and styled with Tailwind CSS.
 * Follows proper ARIA combobox patterns with centralized keyboard navigation.
 *
 * @features
 * - Multiple sizes: small, medium, large
 * - Error and success states
 * - Helper text support
 * - Full width option
 * - Accessible with proper ARIA combobox attributes
 * - Disabled state styling
 * - Custom placeholder support
 * - Centralized keyboard navigation (Enter, Space, Arrow keys, Escape)
 * - Performance optimized with useCallback for event handlers
 */

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<
      React.SelectHTMLAttributes<HTMLSelectElement>,
      'size' | 'value' | 'onChange' | 'disabled'
    >,
    Omit<VariantProps<typeof selectVariants>, 'disabled'> {
  /** Array of options to display in the select */
  options: SelectOption[];
  /** Current selected value */
  value?: string;
  /** Callback fired when selection changes */
  onChange?: (value: string) => void;
  /** Placeholder text when no option is selected */
  placeholder?: string;
  /** Helper text displayed below the select */
  helperText?: string;
  /** Label for the select */
  label?: string;
  /** Error state */
  error?: boolean;
  /** Success state */
  success?: boolean;
  /** Component size */
  size?: SelectSize;
  /** Full width styling */
  fullWidth?: boolean;
  /** Disabled state */
  disabled?: boolean;
}

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill='none'
    stroke='currentColor'
    viewBox='0 0 24 24'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M19 9l-7 7-7-7'
    />
  </svg>
);

// Define navigation keys at module level to avoid recreation on every render
// Navigation keys that should be handled by the combobox
const NAVIGATION_KEYS = [
  'Enter',
  'Space',
  'ArrowDown',
  'ArrowUp',
  'Escape',
] as const;

// Map actual event keys to descriptive key names - shared constant
const KEY_MAP: Record<string, string> = {
  ' ': 'Space',
};

// Type guard to check if a key is a navigation key
const isNavigationKey = (
  key: string,
): key is (typeof NAVIGATION_KEYS)[number] =>
  NAVIGATION_KEYS.includes(key as (typeof NAVIGATION_KEYS)[number]);

// Helper functions to find next/previous enabled options
const findNextEnabledIndex = (
  options: SelectOption[],
  currentIndex: number,
): number => {
  if (options.length === 0) return currentIndex;

  // Create array of indices starting from next position
  const indices = Array.from(
    { length: options.length },
    (_, i) => (currentIndex + i + 1) % options.length,
  );

  return indices.find((i) => !options[i].disabled) ?? currentIndex;
};

const findPreviousEnabledIndex = (
  options: SelectOption[],
  currentIndex: number,
): number => {
  if (options.length === 0) return currentIndex;

  // Create array of indices starting from previous position
  const indices = Array.from(
    { length: options.length },
    (_, i) => (currentIndex - i - 1 + options.length) % options.length,
  );

  return indices.find((i) => !options[i].disabled) ?? currentIndex;
};

export const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      className,
      options = [],
      value,
      onChange,
      placeholder = 'Select an option',
      helperText,
      label,
      error = false,
      success = false,
      size = 'medium',
      fullWidth = true,
      disabled = false,
      id: providedId,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      'aria-describedby': ariaDescribedBy,
      ..._props
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const selectRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const generatedId = useId();
    const id = providedId ?? generatedId;
    const dropdownId = `${id}-dropdown`;
    const helperTextId = `${id}-helper`;

    // Determine state based on error/success props
    let state: SelectState = 'default';
    if (error) {
      state = 'error';
    } else if (success) {
      state = 'success';
    }

    // Create a comprehensive map for O(1) lookups - stores both option and index
    // Memoized because it involves looping and creates objects for props
    const optionsLookup = useMemo(
      () =>
        new Map(
          options.map((option, index) => [option.value, { option, index }]),
        ),
      [options],
    );

    // Find selected option - O(1) lookup (simple operation, no memoization needed)
    const selectedOption = value ? optionsLookup.get(value)?.option : undefined;

    // Get display value - simple property access + nullish coalescing
    const displayValue = selectedOption?.label ?? placeholder;

    // Helper to find the appropriate initial focus index when opening dropdown
    const getInitialFocusIndex = useCallback(() => {
      if (!value) {
        const firstEnabledIndex = options.findIndex(
          (option) => !option.disabled,
        );
        return firstEnabledIndex !== -1 ? firstEnabledIndex : -1;
      }
      return optionsLookup.get(value)?.index ?? 0;
    }, [value, optionsLookup, options]);

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          selectRef.current &&
          !selectRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
          setFocusedIndex(-1);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Handle all keyboard navigation for the combobox - Wrapped in useCallback to prevent unnecessary re-renders
    // Shared keyboard navigation logic that can be called from different contexts
    const handleNavigationKey = useCallback(
      (key: string) => {
        if (disabled) return;

        switch (key) {
          case 'Enter':
          case 'Space':
            if (!isOpen) {
              setIsOpen(true);
              setFocusedIndex(getInitialFocusIndex());
            } else if (focusedIndex >= 0) {
              const focusedOption = options[focusedIndex];
              if (focusedOption && !focusedOption.disabled) {
                onChange?.(focusedOption.value);
                setIsOpen(false);
                setFocusedIndex(-1);
              }
            }
            break;
          case 'Escape':
            setIsOpen(false);
            setFocusedIndex(-1);
            break;
          case 'ArrowDown':
            if (!isOpen) {
              setIsOpen(true);
              setFocusedIndex(getInitialFocusIndex());
            } else {
              const nextIndex = findNextEnabledIndex(options, focusedIndex);
              setFocusedIndex(nextIndex);
              optionRefs.current[nextIndex]?.scrollIntoView({
                block: 'nearest',
              });
            }
            break;
          case 'ArrowUp':
            if (!isOpen) {
              setIsOpen(true);
              setFocusedIndex(getInitialFocusIndex());
            } else {
              const prevIndex = findPreviousEnabledIndex(options, focusedIndex);
              setFocusedIndex(prevIndex);
              optionRefs.current[prevIndex]?.scrollIntoView({
                block: 'nearest',
              });
            }
            break;
          default:
            // Do nothing for other keys
            break;
        }
      },
      [disabled, isOpen, getInitialFocusIndex, options, onChange, focusedIndex],
    );

    // Main keyboard handler for the combobox
    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent) => {
        // Map actual event key to our descriptive key names
        const mappedKey = KEY_MAP[event.key] || event.key;

        if (isNavigationKey(mappedKey)) {
          event.preventDefault();
          handleNavigationKey(mappedKey);
        }
      },
      [handleNavigationKey],
    );

    // Reusable keyboard handler for option elements
    const handleOptionKeyDown = useCallback(
      (event: React.KeyboardEvent) => {
        // Map actual event key to our descriptive key names
        const mappedKey = KEY_MAP[event.key] || event.key;

        // Delegate navigation keys to the shared handler
        if (isNavigationKey(mappedKey)) {
          event.preventDefault();
          event.stopPropagation();
          // Use the shared navigation logic instead of synthetic events
          handleNavigationKey(mappedKey);
        }
      },
      [handleNavigationKey],
    );

    const handleOptionClick = useCallback(
      (option: SelectOption) => {
        if (option.disabled) return;
        onChange?.(option.value);
        setIsOpen(false);
        setFocusedIndex(-1);
      },
      [onChange],
    );

    const handleSelectClick = useCallback(() => {
      if (!disabled) {
        setIsOpen(!isOpen);
        if (!isOpen) {
          setFocusedIndex(getInitialFocusIndex());
        }
      }
    }, [disabled, isOpen, getInitialFocusIndex]);

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent) => {
        const indexStr = (e.currentTarget as HTMLElement).dataset.index;
        const index = parseInt(indexStr ?? '', 10);
        if (!Number.isNaN(index) && index >= 0 && index < options.length) {
          setFocusedIndex(index);
        }
      },
      [options.length],
    );

    const handleOptionClickEvent = useCallback(
      (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const optionValue = (e.currentTarget as HTMLElement).dataset.value;
        // O(1) lookup using the options map
        const option = optionValue
          ? optionsLookup.get(optionValue)?.option
          : undefined;

        if (option) {
          handleOptionClick(option);
        }
      },
      [handleOptionClick, optionsLookup],
    );

    return (
      <div className={cn('relative', fullWidth ? 'w-full' : 'w-auto')}>
        {label && (
          <label
            htmlFor={id}
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            {label}
          </label>
        )}

        <div ref={selectRef} className='relative'>
          <div
            ref={ref}
            id={id}
            role='combobox'
            aria-controls={dropdownId}
            aria-expanded={isOpen}
            aria-haspopup='listbox'
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
            aria-describedby={[ariaDescribedBy, helperTextId]
              .filter(Boolean)
              .join(' ')}
            tabIndex={disabled ? -1 : 0}
            className={cn(
              selectVariants({ size, state, fullWidth, disabled }),
              className,
            )}
            onClick={handleSelectClick}
            onKeyDown={handleKeyDown}
          >
            <span className='block truncate'>{displayValue}</span>
            <ChevronDownIcon
              className={selectChevronVariants({ size, isOpen })}
            />
          </div>

          <div
            ref={dropdownRef}
            id={dropdownId}
            className={selectDropdownVariants({ isOpen })}
            role='listbox'
            aria-label='Options'
          >
            {options.map((option, index) => (
              <button
                key={option.value}
                ref={(el) => {
                  optionRefs.current[index] = el;
                }}
                type='button'
                role='option'
                aria-selected={option.value === value}
                data-value={option.value}
                data-index={index}
                disabled={option.disabled}
                className={cn(
                  selectOptionVariants({
                    selected: option.value === value,
                    disabled: option.disabled,
                  }),
                  focusedIndex === index && !option.disabled && 'bg-gray-100',
                )}
                onClick={handleOptionClickEvent}
                onMouseEnter={handleMouseEnter}
                onKeyDown={handleOptionKeyDown}
              >
                {option.label}
              </button>
            ))}
            {options.length === 0 && (
              <div className='px-3 py-2 text-sm text-gray-500'>
                No options available
              </div>
            )}
          </div>
        </div>

        {helperText && (
          <p id={helperTextId} className={helperTextVariants({ state })}>
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

Select.displayName = 'Select';
