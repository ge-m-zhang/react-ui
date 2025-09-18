import React from 'react';

/**
 * Ref Helpers
 *
 * Utilities for working with React refs, including merging multiple refs
 * and handling different ref types consistently.
 */

/**
 * Merges multiple refs into a single ref callback.
 * This utility handles both function refs and ref objects, making it easy
 * to forward refs while also maintaining internal ref usage.
 *
 * @param refs - Array of refs to merge (can be function refs, ref objects, or null/undefined)
 * @returns A ref callback that calls all provided refs
 *
 * @example
 * ```tsx
 * const MyComponent = forwardRef<HTMLDivElement, MyComponentProps>(
 *   (props, ref) => {
 *     const internalRef = useRef<HTMLDivElement>(null);
 *
 *     return (
 *       <div ref={mergeRefs([internalRef, ref])}>
 *         {props.children}
 *       </div>
 *     );
 *   }
 * );
 * ```
 */
export const mergeRefs =
  <T>(
    refs: Array<
      React.MutableRefObject<T> | React.LegacyRef<T> | null | undefined
    >,
  ): React.RefCallback<T> =>
  (value: T) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref != null) {
        // eslint-disable-next-line no-param-reassign
        (ref as React.MutableRefObject<T | null>).current = value;
      }
    });
  };

/**
 * Sets a value on a ref, handling both function refs and ref objects.
 * This is useful when you need to programmatically set a ref value.
 *
 * @param ref - The ref to set the value on
 * @param value - The value to set
 *
 * @example
 * ```tsx
 * const handleClick = () => {
 *   setRef(inputRef, null); // Clear the ref
 * };
 * ```
 */
export const setRef = <T>(
  ref: React.MutableRefObject<T> | React.LegacyRef<T> | null | undefined,
  value: T,
): void => {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref != null) {
    // eslint-disable-next-line no-param-reassign
    (ref as React.MutableRefObject<T | null>).current = value;
  }
};

/**
 * Creates a ref that calls a callback when the ref value changes.
 * Useful for side effects when elements mount/unmount or change.
 *
 * @param callback - Function to call when ref changes
 * @param deps - Dependencies for the callback (like useCallback deps)
 * @returns A ref callback
 *
 * @example
 * ```tsx
 * const elementRef = useCallbackRef((element) => {
 *   if (element) {
 *     // Element mounted - setup resize observer, focus, etc.
 *   } else {
 *     // Element unmounted - cleanup
 *   }
 * }, []);
 * ```
 */
export const useCallbackRef = <T>(
  callback: (value: T | null) => void,
  deps?: React.DependencyList,
) => React.useCallback(callback, deps ?? []);
