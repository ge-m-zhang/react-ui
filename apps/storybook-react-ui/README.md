# Storybook React UI

**🌐 [View Live Documentation →](https://storybook-react-ui.vercel.app)**

Interactive documentation and development environment for the `@gmzh/react-ui` component library. This Storybook instance provides a comprehensive playground for exploring, testing, and developing React UI components.

## 🎯 Overview

This Storybook application serves multiple purposes:

- **Component Showcase** - Visual catalog of all available UI components
- **Development Environment** - Real-time component development and testing
- **Documentation Hub** - Interactive examples with props and usage patterns

## 🚀 Quick Start

### Prerequisites

- Node.js (v20.11.1 or higher)
- pnpm (v9.11.0 or higher)

### Local Development

```bash
# From the monorepo root
pnpm install

# Start Storybook development server
pnpm storybook
# or
pnpm --filter storybook-react-ui dev

# Visit http://localhost:6006
```

### Production Build

```bash
# Build static Storybook site
pnpm storybook:build
# or
pnpm --filter storybook-react-ui build
```

## 📁 Project Structure

```
apps/storybook-react-ui/
├── .storybook/              # Storybook configuration
│   ├── main.ts             # Main config & addons
│   ├── preview.ts          # Global parameters & decorators
│   └── manager.ts          # Manager UI customization
├── src/                    # Demo components & utilities
│   ├── Component.tsx       # Component showcase examples
│   ├── App.tsx            # Root demo application
│   └── stories/           # Custom story files
└── public/                # Static assets
```

## ✨ Features

- **🎨 Theme Support** - Seamless light/dark mode switching with system detection
- **📱 Responsive Design** - Mobile-first component testing across breakpoints
- **♿ Accessibility** - Built-in a11y addon for compliance testing
- **🎮 Interactive Controls** - Dynamic prop manipulation in real-time
- **📖 Auto-Documentation** - Generated docs from TypeScript types
- **🔍 Component Search** - Quick navigation and filtering
- **📊 Design Tokens** - Visual design system documentation

## 🛠️ Development Workflow

### Adding New Components

1. **Create Component** in `packages/@react-ui/src/lib/components/`:

   ```bash
   mkdir packages/@react-ui/src/lib/components/NewComponent
   ```

2. **Add Stories** alongside your component:

   ```typescript
   // NewComponent.stories.tsx
   import type { Meta, StoryObj } from '@storybook/react';
   import { NewComponent } from './NewComponent';

   const meta: Meta<typeof NewComponent> = {
     title: 'Components/NewComponent',
     component: NewComponent,
     parameters: {
       layout: 'centered',
     },
   };
   export default meta;
   ```

3. **Export Component** in `packages/@react-ui/src/index.ts`

4. **Test in Storybook** - Component automatically appears in the sidebar

### Story Best Practices

```typescript
// Example story with multiple variants
export const Default: StoryObj<typeof NewComponent> = {
  args: {
    variant: 'primary',
    size: 'md',
  },
};

export const AllVariants: StoryObj<typeof NewComponent> = {
  render: () => (
    <div className='space-y-4'>
      <NewComponent variant='primary'>Primary</NewComponent>
      <NewComponent variant='secondary'>Secondary</NewComponent>
    </div>
  ),
};
```

## 🎨 Available Components

### Form Controls

- **Button** - Primary actions with multiple variants
- **TextField** - Text input with validation states
- **Select** - Dropdown selection with search
- **Checkbox** - Binary selection with indeterminate state
- **Switch** - Toggle controls with labels
- **TextArea** - Multi-line text input

### Layout & Structure

- **Box** - Flexible container with spacing props
- **Flex** - Flexbox layout utilities
- **Typography** - Text styling and hierarchy

### Navigation

- **Tabs** - Tabbed navigation with keyboard support

### Feedback & Status

- **Alert** - Contextual messages and notifications
- **Badge** - Status indicators and counts
- **Spinner** - Loading states and progress
- **Tooltip** - Contextual help and information

### System

- **ThemeProvider** - Global theme management

## 🌐 Deployment

The Storybook is automatically deployed to Vercel on every push to the main branch:

- **Production**: https://storybook-react-ui.vercel.app
- **Preview Builds**: Generated for pull requests

## 🤝 Contributing

## 📄 License

MIT License

This Storybook application is part of the React UI Monorepo and is licensed under the MIT License. See the main repository for full license details.
