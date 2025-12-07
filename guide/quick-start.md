# Quick Start Guide

Get up and running with mdEditor Starblaze in minutes!

## Installation

```bash
git clone <repository-url>
cd mdeditor-starblaze
npm install
```

## Development

```bash
npm start
```

Visit: `http://localhost:4200`

## Making Commits

### Option 1: Interactive Commitizen (Recommended)

```bash
git add .
npm run commit
```

Follow the prompts!

### Option 2: Manual Conventional Commits

```bash
git add .
git commit -m "feat: add new feature"
```

## Commit Format

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Formatting
- `refactor` - Code restructuring
- `test` - Add tests
- `chore` - Maintenance

### Examples

```bash
feat: add markdown preview
fix(editor): resolve syntax highlighting bug
docs: update README with new instructions
style: format code with prettier
refactor(components): simplify counter logic
test: add unit tests for markdown parser
chore: update dependencies
```

## Common Commands

```bash
# Development
npm start                    # Start dev server
npm test                     # Run tests

# Linting
npm run lint                 # Lint all files
npm run lint:fix             # Auto-fix linting issues

# Building
npm run build                # Production build
npm run build:gh-pages       # Build for GitHub Pages

# Git
npm run commit               # Commitizen interactive commit
git push                     # Push changes (CI runs automatically)
```

## Project Structure

```
app/
├── components/              # .gjs components
├── templates/               # .gts route templates
├── styles/                  # CSS files
└── router.ts                # Route definitions

.github/workflows/           # CI/CD workflows
.husky/                      # Git hooks
tests/                       # Test files
```

## Git Hooks (Automatic)

When you commit:

1. **Pre-commit** - Lints and formats staged files
2. **Commit-msg** - Validates commit message format

## CI/CD (Automatic)

On push to `main`:

1. **CI Workflow** - Lint, test, build
2. **Deploy** - Automatic deployment to GitHub Pages

## Tips

✅ Always use `npm run commit` for guided commits
✅ Run `npm run lint:fix` before committing
✅ Keep commits small and focused
✅ Write descriptive commit messages
✅ Push regularly to trigger CI checks

Happy coding! 🚀
