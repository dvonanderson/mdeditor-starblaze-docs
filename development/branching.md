# Branching Strategy & Deployment Guide

This document describes the branching strategy, deployment workflow, and GitHub configuration for MDEditor Starblaze.

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

**Table of Contents**

- [Branch Overview](#branch-overview)
  - [Branch Structure](#branch-structure)
  - [Branch Descriptions](#branch-descriptions)
    - [`main` - Production Branch](#main---production-branch)
    - [`development` - Default/Integration Branch](#development---defaultintegration-branch)
    - [`feature/*` - Feature Branches](#feature---feature-branches)
- [Developer Workflow](#developer-workflow)
  - [1. Starting a New Feature](#1-starting-a-new-feature)
  - [2. Opening a Pull Request](#2-opening-a-pull-request)
  - [3. Releasing to Production (Admin Only)](#3-releasing-to-production-admin-only)
- [CI/CD Workflows](#cicd-workflows)
  - [Continuous Integration (CI)](#continuous-integration-ci)
  - [Production Deployment](#production-deployment)
  - [Staging Deployment](#staging-deployment)
- [GitHub Settings Configuration](#github-settings-configuration)
  - [1. Set Default Branch to Development](#1-set-default-branch-to-development)
  - [2. Create Branch Protection Rules](#2-create-branch-protection-rules)
    - [Protection for `main` Branch](#protection-for-main-branch)
    - [Protection for `development` Branch](#protection-for-development-branch)
  - [3. Configure GitHub Pages](#3-configure-github-pages)
  - [4. Create Environments (Optional but Recommended)](#4-create-environments-optional-but-recommended)
    - [Production Environment](#production-environment)
    - [Staging Environment (if using separate Pages site)](#staging-environment-if-using-separate-pages-site)
- [Staging Environment Setup](#staging-environment-setup)
  - [Option 1: Separate GitHub Pages Site (Recommended)](#option-1-separate-github-pages-site-recommended)
  - [Option 2: Use Netlify for Staging (Easier)](#option-2-use-netlify-for-staging-easier)
- [Commit Message Guidelines](#commit-message-guidelines)
  - [Format](#format)
  - [Types](#types)
  - [Using Commitizen](#using-commitizen)
  - [Examples](#examples)
- [Quick Reference](#quick-reference)
  - [Clone Repository](#clone-repository)
  - [Create Feature Branch](#create-feature-branch)
  - [Commit Changes](#commit-changes)
  - [Push and Create PR](#push-and-create-pr)
  - [Update from Development](#update-from-development)
  - [Delete Feature Branch After Merge](#delete-feature-branch-after-merge)
- [Troubleshooting](#troubleshooting)
  - ["Your branch is behind 'origin/development'"](#your-branch-is-behind-origindevelopment)
  - [Merge Conflicts](#merge-conflicts)
  - [CI Checks Failing](#ci-checks-failing)
  - [Accidentally Committed to Wrong Branch](#accidentally-committed-to-wrong-branch)
- [Additional Resources](#additional-resources)
- [Summary](#summary)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Branch Overview

### Branch Structure

```
main (production)
  ↑
  PR (admin only)
  ↑
development (default branch)
  ↑
  PR (team)
  ↑
feature/* branches
```

### Branch Descriptions

#### `main` - Production Branch

- **Purpose:** Production-ready code that deploys to GitHub Pages
- **Deployment:** Automatically deploys to https://[username].github.io/mdeditor-starblaze/
- **Protection:** Admin-only merge access
- **Workflow:** Only receives PRs from `development` after thorough testing

#### `development` - Default/Integration Branch

- **Purpose:** Integration branch for all feature development
- **Default:** Yes - this is what developers see when cloning the repo
- **Deployment:** Builds to staging environment (see Staging Setup below)
- **Protection:** Requires PR reviews, passing CI checks
- **Workflow:** Receives PRs from feature branches, merges to main when ready for production

#### `feature/*` - Feature Branches

- **Purpose:** Individual feature development
- **Naming:** `feature/feature-name` (e.g., `feature/add-export-functionality`)
- **Workflow:** Branch from `development`, PR back to `development`
- **Lifecycle:** Deleted after merge

## Developer Workflow

### 1. Starting a New Feature

```bash
# Make sure you're on development and up-to-date
git checkout development
git pull origin development

# Create your feature branch
git checkout -b feature/my-new-feature

# Make your changes
# ... code, commit, code, commit ...

# Push your feature branch
git push origin feature/my-new-feature
```

### 2. Opening a Pull Request

1. Go to GitHub repository
2. Click "Pull requests" → "New pull request"
3. Set:
   - **Base:** `development`
   - **Compare:** `feature/my-new-feature`
4. Fill out PR template
5. Request reviewers
6. Wait for CI checks to pass
7. Address review feedback
8. Merge when approved

### 3. Releasing to Production (Admin Only)

```bash
# Ensure development is ready for production
git checkout development
git pull origin development

# Run full test suite locally
npm test
npm run lint
npm run build

# Create PR from development to main
# Go to GitHub → New Pull Request
# Base: main, Compare: development
```

After merge to `main`, GitHub Actions automatically deploys to production.

## CI/CD Workflows

### Continuous Integration (CI)

**Workflow:** `.github/workflows/ci.yml`

**Triggers:**

- Push to `main`, `development`
- Pull requests to `main`, `development`

**Jobs:**

1. **Lint** - ESLint, Stylelint, ember-template-lint, Prettier
2. **Test** - Full test suite
3. **Build** - Production build verification

### Production Deployment

**Workflow:** `.github/workflows/deploy-gh-pages.yml`

**Triggers:**

- Push to `main` only
- Manual workflow dispatch

**Process:**

1. Build with GitHub Pages base path
2. Deploy to GitHub Pages (production)
3. Available at: https://[username].github.io/mdeditor-starblaze/

### Staging Deployment

**Workflow:** `.github/workflows/deploy-staging.yml`

**Triggers:**

- Push to `development` only
- Manual workflow dispatch

**Process:**

1. Build with staging base path
2. Creates staging artifact

**⚠️ Staging Deployment Setup Required** - See "Staging Environment Setup" below

## GitHub Settings Configuration

### 1. Set Default Branch to Development

**Steps:**

1. Go to your repository on GitHub
2. Click **Settings** (top navigation)
3. Click **Branches** (left sidebar)
4. Under "Default branch", click the switch icon
5. Select `development` from dropdown
6. Click **Update**
7. Confirm the change

**Why:** Makes `development` the default when people clone or view the repo

---

### 2. Create Branch Protection Rules

#### Protection for `main` Branch

**Steps:**

1. Settings → Branches → Branch protection rules
2. Click **Add rule**
3. Branch name pattern: `main`
4. Configure:

```
☑ Require a pull request before merging
  ☑ Require approvals: 1
  ☑ Dismiss stale pull request approvals when new commits are pushed

☑ Require status checks to pass before merging
  ☑ Require branches to be up to date before merging
  Status checks: (select all from CI workflow)
    - lint
    - test
    - build

☑ Require conversation resolution before merging

☑ Restrict who can push to matching branches
  Add: (your admin username/team)

☑ Allow force pushes: NO
☑ Allow deletions: NO
```

5. Click **Create**

#### Protection for `development` Branch

**Steps:**

1. Settings → Branches → Add rule
2. Branch name pattern: `development`
3. Configure:

```
☑ Require a pull request before merging
  ☑ Require approvals: 1

☑ Require status checks to pass before merging
  ☑ Require branches to be up to date before merging
  Status checks:
    - lint
    - test
    - build

☑ Require conversation resolution before merging

☑ Allow force pushes: NO
☑ Allow deletions: NO
```

4. Click **Create**

---

### 3. Configure GitHub Pages

**Steps:**

1. Settings → Pages
2. Source: **Deploy from a branch**
3. Branch: `main` / `/(root)`
4. Click **Save**

**Verify:**

- Your site will be published at: https://[username].github.io/mdeditor-starblaze/

---

### 4. Create Environments (Optional but Recommended)

#### Production Environment

**Steps:**

1. Settings → Environments
2. Click **New environment**
3. Name: `production`
4. Click **Configure environment**
5. Configure:
   - ☑ Required reviewers: (add admin users)
   - ☑ Wait timer: 0 minutes
   - Deployment branches: **Selected branches**
     - Add rule: `main`
6. Click **Save protection rules**

#### Staging Environment (if using separate Pages site)

**Steps:**

1. Settings → Environments → New environment
2. Name: `staging`
3. Configure:
   - Deployment branches: **Selected branches**
     - Add rule: `development`
4. Click **Save protection rules**

---

## Staging Environment Setup

You have **two options** for staging deployments:

### Option 1: Separate GitHub Pages Site (Recommended)

**Steps:**

1. **Create a new repository:**
   - Name: `mdeditor-starblaze-staging`
   - Public or Private
   - Don't initialize with README

2. **Enable GitHub Pages:**
   - Repo Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` / `/(root)`

3. **Update staging workflow:**
   - Edit `.github/workflows/deploy-staging.yml`
   - Uncomment the `deploy` job
   - Add repository dispatch to push to staging repo

4. **Configure deploy key or token:**
   - Generate a deploy key for the staging repo
   - Add as secret: `STAGING_DEPLOY_TOKEN`

**Result:**

- Production: https://[username].github.io/mdeditor-starblaze/
- Staging: https://[username].github.io/mdeditor-starblaze-staging/

---

### Option 2: Use Netlify for Staging (Easier)

**Steps:**

1. **Sign up for Netlify:** https://www.netlify.com/ (free tier is fine)

2. **Connect your repository:**
   - New site from Git
   - Choose GitHub → Select your repo
   - Branch: `development`
   - Build command: `npm run build`
   - Publish directory: `dist`

3. **Configure Netlify settings:**
   - Site name: `mdeditor-starblaze-staging`
   - Auto-deploy: Enable for `development` branch

4. **Update staging workflow (optional):**
   - Can keep or remove `.github/workflows/deploy-staging.yml`
   - Netlify handles deployment automatically

**Result:**

- Production: https://[username].github.io/mdeditor-starblaze/
- Staging: https://mdeditor-starblaze-staging.netlify.app/

**Benefits:**

- Automatic preview URLs for every PR
- Easy rollbacks
- No need for separate GitHub repo
- Built-in SSL, CDN, and custom domains

---

## Commit Message Guidelines

We use **Conventional Commits** with Commitizen.

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Code style (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvement
- `test`: Adding tests
- `build`: Build system changes
- `ci`: CI/CD changes
- `chore`: Maintenance tasks

### Using Commitizen

```bash
# Stage your changes
git add .

# Use commitizen to create commit
npm run commit

# Follow the interactive prompts
```

### Examples

```
feat(records): add export functionality for metadata records

Implements CSV and JSON export formats with user-selectable options.

Closes #42
```

```
fix(sidebar): correct navigation link routing

The contacts link was routing to dictionaries. Fixed route reference.
```

---

## Quick Reference

### Clone Repository

```bash
git clone https://github.com/[username]/mdeditor-starblaze.git
cd mdeditor-starblaze
# You're automatically on 'development' branch
```

### Create Feature Branch

```bash
git checkout development
git pull
git checkout -b feature/my-feature
```

### Commit Changes

```bash
git add .
npm run commit  # Uses commitizen
```

### Push and Create PR

```bash
git push origin feature/my-feature
# Go to GitHub and create PR to 'development'
```

### Update from Development

```bash
git checkout development
git pull
git checkout feature/my-feature
git merge development
```

### Delete Feature Branch After Merge

```bash
git checkout development
git branch -d feature/my-feature
git push origin --delete feature/my-feature
```

---

## Troubleshooting

### "Your branch is behind 'origin/development'"

```bash
git pull origin development
```

### Merge Conflicts

```bash
# Update your branch
git checkout development
git pull
git checkout feature/my-feature
git merge development

# Resolve conflicts in your editor
# After resolving:
git add .
git commit -m "chore: resolve merge conflicts"
git push
```

### CI Checks Failing

1. Run locally first:

   ```bash
   npm run lint
   npm run lint:fix  # Auto-fix issues
   npm test
   npm run build
   ```

2. Fix issues and commit:
   ```bash
   git add .
   npm run commit
   git push
   ```

### Accidentally Committed to Wrong Branch

```bash
# If you committed to 'main' instead of feature branch:
git reset HEAD~1  # Undo commit, keep changes
git stash
git checkout development
git checkout -b feature/my-feature
git stash pop
git add .
npm run commit
```

---

## Additional Resources

- [Conventional Commits](https://www.conventionalcommits.org/)
- [GitHub Flow](https://docs.github.com/en/get-started/quickstart/github-flow)
- [Branch Protection Rules](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
- [GitHub Actions](https://docs.github.com/en/actions)

---

## Summary

**✅ DO:**

- Branch from `development` for new features
- Create PRs to `development`
- Use conventional commits (via `npm run commit`)
- Keep PRs small and focused
- Write descriptive commit messages
- Run tests locally before pushing

**❌ DON'T:**

- Push directly to `main` (protected)
- Push directly to `development` (protected)
- Create PRs from `main`
- Force push to shared branches
- Merge your own PRs without review

---

**Questions?** Open an issue or contact the maintainers.
