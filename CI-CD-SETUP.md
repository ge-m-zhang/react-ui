# CI/CD Guide

## Overview

- Flow: Version bump → Test/Build → npm publish → Verify → Vercel deploy → Live docs
- Deploy target: only `apps/storybook-react-ui` (Storybook). The library publishes to npm.

## Packages

- Root (`react-ui`): monorepo container; tracks history only
- Library (`@gmzh/react-ui`): main package published to npm
- Docs (`apps/storybook-react-ui`): Storybook app, depends on `@gmzh/react-ui@latest`

## Workflows

- `.github/workflows/ci-cd.yml`

  - Triggers: push/PR to `main`, `develop`
  - Runs: install, lint, TypeScript check, build
  - Purpose: validation only; no publish/deploy

- `.github/workflows/release-and-deploy.yml`
  - Trigger: manual (patch/minor/major)
  - Steps:
    1. Install, lint, type-check, build
    2. Bump versions: `packages/@react-ui` (source of truth) and root (history)
    3. Commit + tag `v<ui_version>`
    4. npm publish `@gmzh/react-ui` (dry-run first)
    5. Verify package is live on npm (poll up to ~5 min)
    6. Push to GitHub (triggers Vercel for Storybook)
    7. Create GitHub Release + job summary

## Setup

- GitHub secrets
  - `NPM_TOKEN`: npm automation token with publish rights
- Vercel project
  - Root Directory: `apps/storybook-react-ui`
  - Local config (`apps/storybook-react-ui/vercel.json`):

```json
{
  "buildCommand": "cd ../.. && pnpm install --frozen-lockfile && pnpm --filter storybook-react-ui build",
  "outputDirectory": "dist",
  "installCommand": "cd ../.. && pnpm install --frozen-lockfile",
  "framework": null
}
```

## Release usage

1. GitHub Actions → Run “Release and Deploy”
2. Pick version: patch | minor | major
3. The workflow handles publish → verify → deploy automatically

## Why Storybook uses "latest"

- Docs always reflect the newest library version
- No manual dependency bumps in the app
- Deployment waits for npm registry propagation (verification step) to avoid race conditions

## Verify

- npm: `npm view @gmzh/react-ui version` shows the new version
- GitHub Release created with the corresponding tag
- Vercel build succeeded for Storybook project
- Live docs updated: https://storybook-react-ui.vercel.app

## Troubleshooting

- Publish fails: check `NPM_TOKEN`, bump version, package availability
- Vercel not deploying: confirm project Root Directory and build logs
- Docs not updated: ensure npm verification passed before push

## Handy commands

```bash
# Dev
pnpm install
pnpm storybook
pnpm build
pnpm lint

# Build specific
pnpm --filter @gmzh/react-ui build
pnpm --filter storybook-react-ui build

# Manual publish (from package dir)
cd packages/@react-ui && npm publish
```
