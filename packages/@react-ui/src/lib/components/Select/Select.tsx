import { type VariantProps } from 'class-variance-authority';
import type React from 'react';
import { forwardRef, useId, useState, useRef, useEffect, useCallback } from 'react';

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
 *
 * @features
 * - Multiple sizes: small, medium, large
 * - Error and success states
 * - Helper text support
 * - Full width option
 * - Accessible with proper ARIA attributes
 * - Disabled state styling
 * - Custom placeholder support
 * - Keyboard navigation
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
    const optionRefs = useRef<(HTMLDivElement | null)[]>([]);
    const generatedId = useId();
    const id = providedId ?? generatedId;
    const dropdownId = `${id}-dropdown`;
    const helperTextId = helperText ? `${id}-helper` : undefined;

    // Determine state based on error/success props
    let state: SelectState = 'default';
    if (error) {
      state = 'error';
    } else if (success) {
      state = 'success';
    }

    // Find selected option
    const selectedOption = options.find((option) => option.value === value);

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

    // Handle keyboard navigation - Wrapped in useCallback to prevent unnecessary re-renders
    const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
      if (disabled) return;

      switch (event.key) {
        case 'Enter':
        case ' ':
          event.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
            setFocusedIndex(
              value ? options.findIndex((opt) => opt.value === value) : 0,
            );
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
          event.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
            setFocusedIndex(
              value ? options.findIndex((opt) => opt.value === value) : 0,
            );
          } else {
            const nextIndex = Math.min(focusedIndex + 1, options.length - 1);
            setFocusedIndex(nextIndex);
            optionRefs.current[nextIndex]?.scrollIntoView({ block: 'nearest' });
          }
          break;
        case 'ArrowUp':
          event.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
            setFocusedIndex(
              value ? options.findIndex((opt) => opt.value === value) : 0,
            );
          } else {
            const prevIndex = Math.max(focusedIndex - 1, 0);
            setFocusedIndex(prevIndex);
            optionRefs.current[prevIndex]?.scrollIntoView({ block: 'nearest' });
          }
          break;
        default:
          // Do nothing for other keys
          break;
      }
    }, [disabled, isOpen, value, options, onChange, focusedIndex]);

    const handleOptionClick = useCallback((option: SelectOption) => {
      if (option.disabled) return;
      onChange?.(option.value);
      setIsOpen(false);
      setFocusedIndex(-1);
    }, [onChange]);

    const handleSelectClick = useCallback(() => {
      if (!disabled) {
        setIsOpen(!isOpen);
        if (!isOpen) {
          setFocusedIndex(
            value ? options.findIndex((opt) => opt.value === value) : 0,
          );
        }
      }
    }, [disabled, isOpen, value, options]);

    const handleOptionKeyDown = useCallback((e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const optionValue = (e.currentTarget as HTMLElement).dataset.value;
        const option = options.find(opt => opt.value === optionValue);
        if (option) {
          handleOptionClick(option);
        }
      }
    }, [handleOptionClick, options]);

    const handleMouseEnter = useCallback((e: React.MouseEvent) => {
      const index = parseInt((e.currentTarget as HTMLElement).dataset.index ?? '0', 10);
      setFocusedIndex(index);
    }, []);

    const handleOptionClickEvent = useCallback((e: React.MouseEvent) => {
      const optionValue = (e.currentTarget as HTMLElement).dataset.value;
      const option = options.find(opt => opt.value === optionValue);
      if (option) {
        handleOptionClick(option);
      }
    }, [handleOptionClick, options]);

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
            aria-describedby={ariaDescribedBy ?? helperTextId}
            tabIndex={disabled ? -1 : 0}
            className={cn(
              selectVariants({ size, state, fullWidth, disabled }),
              className,
            )}
            onClick={handleSelectClick}
            onKeyDown={handleKeyDown}
          >
            <span className='block truncate'>
              {selectedOption ? selectedOption.label : placeholder}
            </span>
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
              <div
                key={option.value}
                ref={(el) => {
                  optionRefs.current[index] = el;
                }}
                role='option'
                tabIndex={option.disabled ? -1 : 0}
                aria-selected={option.value === value}
                data-value={option.value}
                data-index={index}
                className={cn(
                  selectOptionVariants({
                    selected: option.value === value,
                    disabled: option.disabled,
                  }),
                  focusedIndex === index && !option.disabled && 'bg-gray-100',
                )}
                onClick={handleOptionClickEvent}
                onKeyDown={handleOptionKeyDown}
                onMouseEnter={handleMouseEnter}
              >
                {option.label}
              </div>
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
