import { cva, type VariantProps } from 'class-variance-authority';
import React, { createContext, forwardRef, useContext, useState } from 'react';

import { cn } from '../../tools/classNames';
import {
  getTabInfo,
  handleTabKeyboardNavigation,
} from '../../tools/tabNavigationHelpers';

/**
 * Tab Component System
 *
 * A flexible tab component with context-based state management.
 * Built with accessibility in mind and styled with Tailwind CSS.
 *
 * @features
 * - Multiple variants: outlined, underlined, pills
 * - Context-based state management
 * - Compound component pattern
 * - Accessible with proper ARIA attributes
 * - Keyboard navigation support
 */

// Tab context for state management
interface TabContextValue {
  value: string;
  setValue: (value: string) => void;
  variant: 'outlined' | 'underlined' | 'pills';
}

const TabContext = createContext<TabContextValue>({
  value: '',
  setValue: () => {},
  variant: 'outlined',
});

// Tab variants
const tabVariants = cva(
  'inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
  {
    variants: {
      variant: {
        outlined: 'border-t border-l border-r rounded-t-md',
        underlined: 'border-b-2 rounded-none',
        pills: 'rounded-full border',
      },
      active: {
        true: '',
        false: '',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed pointer-events-none',
        false: 'hover:bg-gray-50',
      },
    },
    compoundVariants: [
      // Outlined variant
      {
        variant: 'outlined',
        active: true,
        className: 'bg-white border-gray-300 text-blue-600 -mb-px',
      },
      {
        variant: 'outlined',
        active: false,
        className: 'bg-gray-50 border-gray-300 text-gray-500',
      },
      // Underlined variant
      {
        variant: 'underlined',
        active: true,
        className: 'border-blue-500 text-blue-600 bg-transparent',
      },
      {
        variant: 'underlined',
        active: false,
        className: 'border-transparent text-gray-500 bg-transparent',
      },
      // Pills variant
      {
        variant: 'pills',
        active: true,
        className: 'bg-blue-500 border-blue-500 text-white',
      },
      {
        variant: 'pills',
        active: false,
        className: 'bg-white border-gray-300 text-gray-500',
      },
    ],
    defaultVariants: {
      variant: 'outlined',
      active: false,
      disabled: false,
    },
  },
);

const tabListVariants = cva('flex', {
  variants: {
    variant: {
      outlined: 'border-b border-gray-300',
      underlined: '',
      pills: 'gap-2',
    },
    orientation: {
      horizontal: 'flex-row',
      vertical: 'flex-col',
    },
  },
  defaultVariants: {
    variant: 'outlined',
    orientation: 'horizontal',
  },
});

// Context Provider Component
interface TabContextProviderProps {
  children: React.ReactNode;
  defaultValue: string;
  variant?: 'outlined' | 'underlined' | 'pills';
  onValueChange?: (value: string) => void;
}

const TabContextProvider = ({
  children,
  defaultValue,
  variant = 'outlined',
  onValueChange,
}: TabContextProviderProps) => {
  const [value, setValue] = useState(defaultValue);

  const handleValueChange = (newValue: string) => {
    setValue(newValue);
    onValueChange?.(newValue);
  };

  const contextValue = React.useMemo(
    () => ({ value, setValue: handleValueChange, variant }),
    [value, variant],
  );

  return (
    <TabContext.Provider value={contextValue}>{children}</TabContext.Provider>
  );
};

// Default props for TabContextProvider
TabContextProvider.defaultProps = {
  variant: 'outlined',
  onValueChange: undefined,
};

// Individual Tab Component
type TabBaseProps = VariantProps<typeof tabVariants>;

interface TabProps
  extends Omit<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      'value' | 'disabled' | 'onSelect'
    >,
    Omit<TabBaseProps, 'variant' | 'active'> {
  value: string;
  onSelect?: (value: string) => void;
  'data-testid'?: string;
}

const TabComponent = forwardRef<HTMLButtonElement, TabProps>(
  (
    {
      className,
      value: tabValue,
      onSelect,
      disabled,
      children,
      onClick,
      onKeyDown,
      onFocus,
      onBlur,
      id,
      style,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      'data-testid': dataTestId,
    },
    ref,
  ) => {
    const { value, setValue, variant } = useContext(TabContext);
    const active = tabValue === value;

    const handleClick = () => {
      if (!disabled) {
        setValue(tabValue);
        onSelect?.(tabValue);
      }
    };

    return (
      <button
        type='button'
        ref={ref}
        className={cn(tabVariants({ variant, active, disabled }), className)}
        onClick={(e) => {
          handleClick();
          onClick?.(e);
        }}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={!!disabled}
        role='tab'
        aria-selected={active}
        aria-controls={`tabpanel-${tabValue}`}
        id={id ?? `tab-${tabValue}`}
        tabIndex={active ? 0 : -1}
        style={style}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        data-testid={dataTestId}
      >
        {children}
      </button>
    );
  },
);

TabComponent.displayName = 'Tab';

// Default props for TabComponent
TabComponent.defaultProps = {
  onSelect: undefined,
  'data-testid': undefined,
};

// TabList Component
interface TabListProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  'data-testid'?: string;
}

const TabList = forwardRef<HTMLDivElement, TabListProps>(
  (
    {
      className,
      orientation = 'horizontal',
      children,
      id,
      style,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      'data-testid': dataTestId,
      onKeyDown: onKeyDownProp,
    },
    ref,
  ) => {
    const { variant, value, setValue } = useContext(TabContext);

    // Handle keyboard navigation
    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      const tabInfo = getTabInfo(children);
      handleTabKeyboardNavigation(event, tabInfo, value, orientation, setValue);
      onKeyDownProp?.(event);
    };

    return (
      <div
        ref={ref}
        className={cn(tabListVariants({ variant, orientation }), className)}
        role='tablist'
        aria-orientation={orientation}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        id={id}
        style={style}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        data-testid={dataTestId}
      >
        {children}
      </div>
    );
  },
);

TabList.displayName = 'TabList';

// Default props for TabList
TabList.defaultProps = {
  orientation: 'horizontal',
  'data-testid': undefined,
};

// TabPanel Component
interface TabPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  forceMount?: boolean;
  'data-testid'?: string;
}

const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(
  (
    {
      className,
      value: panelValue,
      forceMount = false,
      children,
      id,
      style,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      'data-testid': dataTestId,
    },
    ref,
  ) => {
    const { value } = useContext(TabContext);
    const active = panelValue === value;

    if (!active && !forceMount) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={cn('mt-4', !active && 'hidden', className)}
        role='tabpanel'
        aria-labelledby={ariaLabelledBy ?? `tab-${panelValue}`}
        id={id ?? `tabpanel-${panelValue}`}
        tabIndex={0}
        style={style}
        aria-label={ariaLabel}
        data-testid={dataTestId}
      >
        {children}
      </div>
    );
  },
);

TabPanel.displayName = 'TabPanel';

// Default props for TabPanel
TabPanel.defaultProps = {
  forceMount: false,
  'data-testid': undefined,
};

// TabContent wrapper for better semantics
interface TabContentProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  'data-testid'?: string;
}

const TabContent = forwardRef<HTMLDivElement, TabContentProps>(
  (
    {
      className,
      children,
      id,
      style,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      'data-testid': dataTestId,
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={cn('tab-content', className)}
      id={id}
      style={style}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      data-testid={dataTestId}
    >
      {children}
    </div>
  ),
);

TabContent.displayName = 'TabContent';

// Default props for TabContent
TabContent.defaultProps = {
  className: undefined,
  'data-testid': undefined,
};

// Main Tab export with compound components
export const Tab = Object.assign(TabComponent, {
  Context: TabContextProvider,
  List: TabList,
  Panel: TabPanel,
  Content: TabContent,
});

// Alias for more intuitive naming
export const Tabs = Tab;
