# @gmzh/react-ui

A comprehensive React UI component library built with TypeScript and Tailwind CSS, featuring accessible, production-ready components with built-in dark mode support.

**🌐 [View Live Documentation →](https://storybook-react-ui.vercel.app)**

## ✨ Features

- **Components** - Complete UI toolkit from buttons to complex data tables
- **TypeScript First** - Full type safety with excellent IntelliSense support
- **Dark Mode Built-in** - System-aware theme switching with custom CSS variables
- **Zero Config** - Works out of the box, no Tailwind CSS setup required
- **Accessibility** - ARIA compliant and keyboard navigable components
- **Tree Shaking** - Import only what you need for optimal bundle size
- **Tailwind Integration** - Optional plugin for existing Tailwind projects

## 📦 Installation & Setup

**📦 [View on NPM →](https://www.npmjs.com/package/@gmzh/react-ui)**

```bash
npm install @gmzh/react-ui
# or
yarn add @gmzh/react-ui
# or
pnpm add @gmzh/react-ui
```

### Option 1: Zero Configuration (Recommended)

Perfect for new projects or if you don't have Tailwind CSS:

```tsx
// 1. Import styles once at your app entry point
import '@gmzh/react-ui/styles';
import { ThemeProvider, Button, TextField } from '@gmzh/react-ui';

function App() {
  return (
    <ThemeProvider defaultTheme='system'>
      <div className='p-6'>
        <Button variant='contained' color='primary'>
          Get Started
        </Button>
        <TextField label='Enter your name' placeholder='John Doe' />
      </div>
    </ThemeProvider>
  );
}
```

**What you get:**

- Complete Tailwind CSS utilities
- Custom color palette with CSS variables
- Inter font family loaded automatically
- Dark/light mode with system detection
- All component styles

### Option 2: Tailwind Integration (Existing projects)

If you already use Tailwind CSS, add our plugin for enhanced integration:

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@gmzh/react-ui/**/*.{js,ts,jsx,tsx}', // Add this line
  ],
  plugins: [
    require('@gmzh/react-ui/tailwind-plugin'), // Add this line
  ],
  // Your existing theme, colors, etc. remain unchanged
};

export default config;
```

```tsx
// Import styles and use with your existing Tailwind classes
import '@gmzh/react-ui/styles';
import { ThemeProvider, Button, TextField } from '@gmzh/react-ui';

function App() {
  return (
    <ThemeProvider defaultTheme='system'>
      <div className='min-h-screen bg-gray-50 dark:bg-gray-900 p-6'>
        <Button variant='contained' color='primary' className='mb-4'>
          Get Started
        </Button>
        <TextField label='Enter your name' className='max-w-md' />
        {/* Use extended color palette */}
        <div className='bg-primary text-white p-4 rounded-lg mt-4'>
          Custom UI colors work seamlessly
        </div>
      </div>
    </ThemeProvider>
  );
}
```

## 🚀 Quick Examples

### Basic Usage

```tsx
import { ThemeProvider, Button, TextField, Alert } from '@gmzh/react-ui';

function App() {
  return (
    <ThemeProvider>
      <div className='p-6 space-y-4'>
        <Button variant='contained'>Click me</Button>
        <TextField label='Name' placeholder='Enter your name' />
        <Alert variant='success'>Success message!</Alert>
      </div>
    </ThemeProvider>
  );
}
```

### Simple Form

```tsx
import { TextField, Button, Checkbox } from '@gmzh/react-ui';

function ContactForm() {
  return (
    <form className='space-y-4'>
      <TextField label='Email' type='email' required />
      <TextField label='Message' multiline rows={3} />
      <Checkbox>I agree to the terms</Checkbox>
      <Button type='submit' variant='contained'>
        Submit
      </Button>
    </form>
  );
}
```

### Layout Example

```tsx
import { Box, Typography, Card } from '@gmzh/react-ui';

function Dashboard() {
  return (
    <Box padding='lg'>
      <Typography variant='h2'>Dashboard</Typography>
      <Card padding='md' className='mt-4'>
        <Typography>Welcome back!</Typography>
      </Card>
    </Box>
  );
}
```

## 📋 Available Components

### Form Controls

Button, TextField, TextArea, Input, Select, Checkbox, Radio, Switch

### Layout & Structure

Box, Flex, Container, Header, Footer, Sidebar, Divider, Typography

### Navigation

Tabs, Breadcrumb, Menu, Pagination

### Feedback & Status

Alert, Badge, Toast, ToastWrapper, Spinner, Progress, Tooltip

### Overlays & Modals

Modal, Dialog, Drawer, Popover, Popper, Portal

### Data Display

Card, Table, List, Heading

### System

ThemeProvider

## 🌙 Dark Mode

Automatic dark mode with system preference detection:

```tsx
import { ThemeProvider, useTheme } from '@gmzh/react-ui';

// Setup (components auto-support dark mode)
function App() {
  return (
    <ThemeProvider defaultTheme='system'>
      <YourComponents />
    </ThemeProvider>
  );
}

// Theme toggle
function ThemeToggle() {
  const { toggleTheme } = useTheme();
  return <Button onClick={toggleTheme}>Toggle Theme</Button>;
}
```

**Options:** `light` | `dark` | `system` (default)

## 🎨 Design System

### Common Props

```tsx
variant?: 'contained' | 'outlined' | 'text'
size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning'
disabled?: boolean
className?: string // Tailwind classes
```

### Typography

```tsx
<Typography variant="h1">Main Title</Typography>
<Typography variant="body1">Body text</Typography>
<Typography variant="caption">Small text</Typography>
```

### Colors & Spacing

- **Colors**: Primary (blue), semantic (green/red/yellow), neutrals (gray)
- **Spacing**: 4px base scale (`xs`, `sm`, `md`, `lg`, `xl`)

## 🔧 TypeScript Support

Full type safety with IntelliSense:

```tsx
import type { ButtonProps } from '@gmzh/react-ui';

// Extend props
interface CustomButtonProps extends ButtonProps {
  analytics?: string;
}

const AnalyticsButton: React.FC<CustomButtonProps> = (props) => {
  return <Button {...props} onClick={() => console.log('clicked')} />;
};
```

## 🛠️ Development

**🎮 Component Playground:** [Try Components Live →](https://storybook-react-ui.vercel.app)

```bash
# Build package
pnpm build

# Development mode
pnpm dev

# View documentation locally
pnpm --filter storybook-react-ui dev
```

### Contributing

1. Fork & clone repository
2. Run `pnpm install`
3. Create feature branch
4. Add component to `src/lib/components/`
5. Export in `src/index.ts`
6. Test in Storybook
7. Submit pull request
