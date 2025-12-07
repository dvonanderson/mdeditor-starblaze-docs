# CI/CD and Git Workflow Guide

This guide explains the complete CI/CD setup, git workflows, and commit conventions for MDEditor Starblaze.

## Table of Contents

1. [Git Hooks with Husky](#git-hooks-with-husky)
2. [Conventional Commits with Commitizen](#conventional-commits-with-commitizen)
3. [GitHub Actions Workflows](#github-actions-workflows)
4. [GitHub Pages Deployment](#github-pages-deployment)
5. [Development Workflow](#development-workflow)

---

## Git Hooks with Husky

### What is Husky?

Husky manages Git hooks to enforce code quality before commits are made or pushed.

### Installed Hooks

#### 1. Pre-commit Hook (`.husky/pre-commit`)

Runs **before** each commit to ensure code quality:

```bash
npx lint-staged
```

**What it does:**

- Lints and auto-fixes JavaScript/TypeScript files
- Lints and auto-fixes CSS files
- Lints templates (.hbs files)
- Formats code with Prettier
- Only runs on **staged files** for speed

#### 2. Commit Message Hook (`.husky/commit-msg`)

Validates commit messages follow conventional commit format:

```bash
npx --no -- commitlint --edit $1
```

**What it does:**

- Checks commit message format
- Ensures messages follow conventional commit standards
- Rejects invalid commit messages

### Lint-staged Configuration

Configured in `package.json`:

```json
{
  "lint-staged": {
    "*.{js,ts,gjs,gts}": ["eslint --fix", "prettier --write"],
    "*.css": ["stylelint --fix", "prettier --write"],
    "*.hbs": ["ember-template-lint --fix"],
    "*.{json,md}": ["prettier --write"]
  }
}
```

---

## Conventional Commits with Commitizen

### What is Commitizen?

Commitizen provides an interactive CLI to create conventional commit messages.

### Commit Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, semicolons, etc.)
- **refactor**: Code refactoring
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **build**: Build system or dependencies
- **ci**: CI/CD configuration changes
- **chore**: Other changes
- **revert**: Revert a previous commit

### Using Commitizen

Instead of `git commit`, use:

```bash
npm run commit
# or
git cz
```

This will prompt you with:

1. **Type of change** (feat, fix, docs, etc.)
2. **Scope** (optional) - What part of the codebase?
3. **Short description** - Brief summary
4. **Longer description** (optional)
5. **Breaking changes** (optional)
6. **Issues closed** (optional)

**Example commit message:**

```
feat(editor): add markdown preview with syntax highlighting

- Implemented real-time markdown preview
- Added syntax highlighting for code blocks
- Updated editor layout to split view

Closes #123
```

### Commitlint Configuration

Located in `commitlint.config.mjs`:

```javascript
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'chore',
        'revert',
      ],
    ],
  },
};
```

---

## GitHub Actions Workflows

### CI Workflow (`.github/workflows/ci.yml`)

Runs on every push and pull request to `main`/`master`.

#### Jobs:

**1. Lint**

- Lints JavaScript/TypeScript
- Lints templates
- Lints CSS
- Checks code formatting
- Runs type checking

**2. Test**

- Builds the application
- Runs all tests

**3. Build**

- Builds production application
- Uploads build artifacts

#### Configuration:

```yaml
on:
  push:
    branches: [main]
  pull_request: {}
```

**Node Version:** 20
**Package Manager:** npm
**Cache:** Enabled for faster builds

---

## GitHub Pages Deployment

### Deployment Workflow (`.github/workflows/deploy-gh-pages.yml`)

Automatically deploys to GitHub Pages on push to `main`/`master`.

#### Jobs:

**1. Build**

- Builds the app with GitHub Pages base path
- Uploads artifact for deployment

**2. Deploy**

- Deploys to GitHub Pages
- Sets up custom domain (if configured)

### Build Command for GitHub Pages

```bash
npm run build:gh-pages
```

This uses the base path `/mdeditor-starblaze/` for GitHub Pages routing.

### Enabling GitHub Pages

1. Go to **Settings** → **Pages** in your GitHub repository
2. Under **Build and deployment**:
   - Source: **GitHub Actions**
3. The workflow will automatically deploy on push

### Accessing Your App

After deployment, your app will be available at:

```
https://<username>.github.io/mdeditor-starblaze/
```

---

## Development Workflow

### Initial Setup

1. **Clone the repository:**

   ```bash
   git clone <your-repo-url>
   cd mdeditor-starblaze
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Husky will be set up automatically** via the `prepare` script.

### Daily Development

1. **Create a feature branch:**

   ```bash
   git checkout -b feat/my-new-feature
   ```

2. **Make your changes**

3. **Stage your changes:**

   ```bash
   git add .
   ```

4. **Commit using Commitizen:**

   ```bash
   npm run commit
   ```

   OR use git directly (commitlint will still validate):

   ```bash
   git commit -m "feat: add new feature"
   ```

5. **The pre-commit hook will:**
   - Lint and auto-fix your code
   - Format with Prettier
   - Only process staged files

6. **The commit-msg hook will:**
   - Validate your commit message format

7. **Push your changes:**

   ```bash
   git push origin feat/my-new-feature
   ```

8. **Create a Pull Request** on GitHub

9. **CI will automatically run:**
   - Linting
   - Tests
   - Build

### Bypassing Hooks (Emergency Only)

If you absolutely must bypass hooks:

```bash
git commit --no-verify -m "emergency fix"
```

**⚠️ Use sparingly!** This skips quality checks.

---

## NPM Scripts

### Development

```bash
npm start              # Start dev server
npm test              # Run tests
```

### Linting

```bash
npm run lint          # Run all linters
npm run lint:js       # Lint JavaScript/TypeScript
npm run lint:hbs      # Lint templates
npm run lint:css      # Lint CSS
npm run lint:format   # Check formatting
npm run lint:types    # Type check
npm run lint:fix      # Auto-fix all issues
```

### Building

```bash
npm run build              # Production build
npm run build:gh-pages     # Build for GitHub Pages
```

### Git Workflow

```bash
npm run commit        # Interactive commit with Commitizen
```

---

## Troubleshooting

### Husky hooks not running

```bash
npx husky install
chmod +x .husky/pre-commit
chmod +x .husky/commit-msg
```

### Commitlint failing

Check your commit message format:

```bash
# ✅ Good
feat: add new feature
fix(editor): resolve bug
docs: update README

# ❌ Bad
Add new feature
Fixed bug
Update
```

### GitHub Actions failing

1. Check the **Actions** tab in GitHub
2. Review error logs
3. Fix issues locally
4. Push again

### Build failing on GitHub Pages

Ensure `package.json` has:

```json
{
  "scripts": {
    "build:gh-pages": "vite build --base=/mdeditor-starblaze/"
  }
}
```

---

## Best Practices

✅ **Always use `npm run commit`** for guided commit messages
✅ **Write descriptive commit messages** explaining "why" not "what"
✅ **Keep commits small and focused** on a single change
✅ **Run `npm run lint:fix`** before committing
✅ **Test locally** before pushing
✅ **Review CI logs** if workflows fail
✅ **Use feature branches** for all changes

---

## Resources

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Commitizen](https://github.com/commitizen/cz-cli)
- [Husky](https://typicode.github.io/husky/)
- [GitHub Actions](https://docs.github.com/en/actions)
- [GitHub Pages](https://docs.github.com/en/pages)

---

Updated: 2025-11-29
