import type React from 'react';

/**
 * ARIA Helpers
 *
 * Utilities for consistent ARIA attribute handling across components.
 * These helpers ensure accessibility best practices and reduce code duplication.
 */

/**
 * ARIA attributes that can be extracted from props
 */
export interface AriaAttributes {
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-expanded'?: boolean | 'true' | 'false';
  'aria-selected'?: boolean | 'true' | 'false';
  'aria-checked'?: boolean | 'mixed' | 'true' | 'false';
  'aria-pressed'?: boolean | 'mixed' | 'true' | 'false';
  'aria-current'?:
    | boolean
    | 'page'
    | 'step'
    | 'location'
    | 'date'
    | 'time'
    | 'true'
    | 'false';
  'aria-disabled'?: boolean | 'true' | 'false';
  'aria-hidden'?: boolean | 'true' | 'false';
  'aria-invalid'?: boolean | 'grammar' | 'spelling' | 'true' | 'false';
  'aria-required'?: boolean | 'true' | 'false';
  'aria-readonly'?: boolean | 'true' | 'false';
  'aria-live'?: 'off' | 'assertive' | 'polite';
  'aria-atomic'?: boolean | 'true' | 'false';
  'aria-busy'?: boolean | 'true' | 'false';
  'aria-controls'?: string;
  'aria-owns'?: string;
  'aria-activedescendant'?: string;
  'aria-haspopup'?:
    | boolean
    | 'menu'
    | 'listbox'
    | 'tree'
    | 'grid'
    | 'dialog'
    | 'true'
    | 'false';
  'aria-orientation'?: 'horizontal' | 'vertical';
  'aria-valuemax'?: number;
  'aria-valuemin'?: number;
  'aria-valuenow'?: number;
  'aria-valuetext'?: string;
  role?: React.AriaRole;
  tabIndex?: number;
}

/**
 * Extracts ARIA attributes from a props object, returning both ARIA props
 * and the remaining props separately.
 *
 * @param props - The props object to extract ARIA attributes from
 * @returns Object with `ariaProps` and `otherProps`
 *
 * @example
 * ```tsx
 * const MyComponent = (props: MyComponentProps) => {
 *   const { ariaProps, otherProps } = extractAriaProps(props);
 *
 *   return (
 *     <div {...ariaProps} className={otherProps.className}>
 *       {otherProps.children}
 *     </div>
 *   );
 * };
 * ```
 */
export const extractAriaProps = <T extends Record<string, unknown>>(
  props: T,
): {
  ariaProps: Partial<AriaAttributes>;
  otherProps: Omit<T, keyof AriaAttributes>;
} => {
  const ariaProps: Partial<AriaAttributes> = {};
  const otherProps = { ...props };

  // List of ARIA attributes to extract
  const ariaKeys: Array<keyof AriaAttributes> = [
    'aria-label',
    'aria-labelledby',
    'aria-describedby',
    'aria-expanded',
    'aria-selected',
    'aria-checked',
    'aria-pressed',
    'aria-current',
    'aria-disabled',
    'aria-hidden',
    'aria-invalid',
    'aria-required',
    'aria-readonly',
    'aria-live',
    'aria-atomic',
    'aria-busy',
    'aria-controls',
    'aria-owns',
    'aria-activedescendant',
    'aria-haspopup',
    'aria-orientation',
    'aria-valuemax',
    'aria-valuemin',
    'aria-valuenow',
    'aria-valuetext',
    'role',
    'tabIndex',
  ];

  ariaKeys.forEach((key) => {
    if (key in props) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (ariaProps as any)[key] = props[key];
      delete otherProps[key as keyof T];
    }
  });

  return { ariaProps, otherProps };
};

/**
 * Combines multiple aria-describedby values, filtering out falsy values.
 * This is useful when you have multiple description sources (helper text, error text, etc.)
 *
 * @param ids - Array of potential aria-describedby IDs
 * @returns Combined ID string or undefined if no valid IDs
 *
 * @example
 * ```tsx
 * const ariaDescribedby = combineAriaDescribedby([
 *   error && errorId,
 *   helperText && helperId,
 *   props['aria-describedby']
 * ]);
 * ```
 */
export const combineAriaDescribedby = (
  ids: Array<string | undefined | false | null>,
): string | undefined => {
  const validIds = ids.filter((id): id is string => Boolean(id));
  return validIds.length > 0 ? validIds.join(' ') : undefined;
};

/**
 * Ensures aria-expanded is returned as a proper boolean string for HTML attributes.
 * React accepts boolean values, but for maximum compatibility, this converts to strings.
 *
 * @param expanded - The expanded state
 * @returns String representation of the boolean or undefined
 *
 * @example
 * ```tsx
 * <div aria-expanded={normalizeAriaExpanded(isOpen)}>
 * ```
 */
export const normalizeAriaExpanded = (
  expanded?: boolean,
): 'true' | 'false' | undefined => {
  if (expanded === undefined) return undefined;
  return expanded ? 'true' : 'false';
};

/**
 * Ensures aria-selected is returned as a proper boolean string for HTML attributes.
 *
 * @param selected - The selected state
 * @returns String representation of the boolean or undefined
 */
export const normalizeAriaSelected = (
  selected?: boolean,
): 'true' | 'false' | undefined => {
  if (selected === undefined) return undefined;
  return selected ? 'true' : 'false';
};

/**
 * Ensures aria-checked is returned as a proper string for HTML attributes.
 * Handles boolean values and the special 'mixed' state for indeterminate checkboxes.
 *
 * @param checked - The checked state (boolean or 'mixed')
 * @returns String representation or undefined
 */
export const normalizeAriaChecked = (
  checked?: boolean | 'mixed',
): 'true' | 'false' | 'mixed' | undefined => {
  if (checked === undefined) return undefined;
  if (checked === 'mixed') return 'mixed';
  return checked ? 'true' : 'false';
};

/**
 * Creates a unique ID for accessibility purposes.
 * Uses React's useId hook when available, falls back to a simple counter.
 *
 * @param prefix - Optional prefix for the ID
 * @returns Unique ID string
 *
 * @example
 * ```tsx
 * const inputId = useAccessibleId('input');
 * const labelId = useAccessibleId('label');
 * ```
 */
let idCounter = 0;
export const createAccessibleId = (prefix = 'accessible'): string => {
  idCounter += 1;
  return `${prefix}-${idCounter}`;
};
