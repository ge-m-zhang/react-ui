# React UI Monorepo

[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/ge-m-zhang/react-ui)

A comprehensive React UI component library monorepo built with TypeScript, Tailwind CSS, and modern development tools.

## 📁 Project Structure

```
react-ui/
├── packages/
│   └── @react-ui/           # Core UI component library
└── apps/
    └── storybook-react-ui/  # Storybook documentation & development
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v20.11.1 or higher)
- **pnpm** (v9.11.0 or higher)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd react-ui

# Install dependencies
pnpm install

# Start development environment
pnpm dev
```

### Development Commands

```bash
# Start all development servers
pnpm start:dev

# Build all packages
pnpm build

# Run linting
pnpm lint

# Format code
pnpm format

# Clean all build artifacts
pnpm clean
```

## 📦 Packages

### @gmzh/react-ui

**📦 [View on NPM →](https://www.npmjs.com/package/@gmzh/react-ui)**

The core UI component library featuring:

- **Production-Ready Components** - From basic buttons to complex data tables
- **TypeScript Support** - Full type safety and IntelliSense
- **Tailwind CSS Integration** - Utility-first styling with custom design system
- **Dark Mode Support** - Built-in theme switching with system detection
- **Accessibility First** - ARIA compliant and keyboard navigable
- **Tree Shaking** - Import only what you need

[📖 View Component Documentation →](./packages/@react-ui/README.md)

### Storybook Documentation

Interactive component playground and documentation:

- **Component Showcase** - Visual examples of all components
- **Live Editing** - Test components in real-time
- **Documentation** - Comprehensive usage guides
- **Theme Testing** - Switch between light/dark modes

**🌐 [View Live Documentation →](https://storybook-react-ui.vercel.app)**

```bash
# Start Storybook locally
pnpm --filter storybook-react-ui dev
```

## 🛠️ Development

### Monorepo Tools

- **pnpm Workspaces** - Efficient dependency management
- **Turbo** - Build system optimization
- **TypeScript** - Type safety across all packages
- **ESLint + Prettier** - Code quality and formatting

### Adding New Components

1. **Create Component**:

   ```bash
   cd packages/@react-ui/src/lib/components
   mkdir MyComponent
   touch MyComponent/MyComponent.tsx MyComponent/MyComponent.stories.tsx
   ```

2. **Export Component**:

   ```typescript
   // packages/@react-ui/src/index.ts
   export { MyComponent } from './lib/components/MyComponent/MyComponent';
   ```

3. **Build & Test**:
   ```bash
   pnpm build
   pnpm --filter storybook-react-ui dev
   ```

### Package Scripts

```bash
# Package-specific commands
pnpm --filter @gmzh/react-ui build    # Build UI library
pnpm --filter @gmzh/react-ui dev      # Watch mode
pnpm --filter @gmzh/react-ui lint     # Lint package

# Storybook commands
pnpm --filter storybook-react-ui dev  # Start Storybook
pnpm --filter storybook-react-ui build # Build static site
```

## 📋 Available Components

### Form Controls

Button, Checkbox, Switch, TextArea, TextField

### Layout & Structure

Box, Flex, Typography

### Navigation

Tabs

### Feedback & Status

Alert, Badge, Spinner, Tooltip

### System

ThemeProvider

## 🎨 Design System

### Color Palette

- **Primary**: Blue variants for main actions
- **Semantic**: Success (green), danger (red), warning (yellow)
- **Neutrals**: Comprehensive gray scale
- **Custom Variables**: CSS custom properties for theming

### Typography

- **Font Family**: Inter (web font)
- **Scale**: 6 heading levels + body variants
- **Responsive**: Mobile-first typography scaling

### Spacing & Layout

- **Consistent Scale**: 4px base unit system
- **Responsive**: Mobile-first breakpoints
- **Flex/Grid**: Modern layout utilities

## 🌙 Theme Support

Built-in dark/light mode with system preference detection:

```tsx
import { ThemeProvider } from '@gmzh/react-ui';

function App() {
  return (
    <ThemeProvider defaultTheme='system'>
      {/* Your app components */}
    </ThemeProvider>
  );
}
```

## 📚 Resources

- [Component Documentation](./packages/@react-ui/README.md)
- [Storybook Documentation](https://storybook-react-ui.vercel.app) - Live component showcase
- [Storybook Demo](http://localhost:6006) (when running locally)

## 📄 License

MIT License

Copyright (c) 2025 ge-m-zhang

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
