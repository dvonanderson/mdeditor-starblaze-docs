# Stylesheet Organization

This document explains how styles are organized in the MDEditor Starblaze application.

## File Structure

```
app/
├── styles/
│   ├── app.css                          # Main stylesheet (imports all styles)
│   └── components/
│       ├── counter.css                  # Counter component styles
│       └── markdown-editor.css          # Markdown editor component styles
├── components/
│   ├── counter.gjs                      # Counter component (no inline styles)
│   └── markdown-editor.gjs              # Markdown editor component (no inline styles)
└── templates/
    └── application.gts                  # Application template (no inline styles)
```

## Stylesheet Organization Strategy

### 1. Main Stylesheet (`app/styles/app.css`)

The main stylesheet imports all component styles and contains global styles:

```css
/* Component Styles */
@import './components/counter.css';
@import './components/markdown-editor.css';

/* Global Styles */
* { box-sizing: border-box; }
body { ... }
.main-nav { ... }
main { ... }
```

### 2. Component Stylesheets

Each component has its own CSS file in `app/styles/components/`:

- **`counter.css`** - All styles for the Counter component
- **`markdown-editor.css`** - All styles for the Markdown Editor component

### 3. Benefits of Separate Stylesheets

✅ **Better Organization**: Styles are organized by component and easy to find
✅ **Maintainability**: Each component's styles are in a dedicated file
✅ **Reusability**: Stylesheets can be shared across components
✅ **Cleaner Components**: .gjs files focus on logic and markup
✅ **Better Caching**: Browser can cache CSS separately from JavaScript
✅ **Easier Testing**: Style changes don't require component recompilation
✅ **IDE Support**: Better syntax highlighting and CSS tooling

### 4. Component Files (Clean Templates)

Components now contain only logic and markup:

**Before** (with inline styles):
```javascript
export default class Counter extends Component {
  @tracked count = 0;

  <template>
    <div class="counter">...</div>
    <style>
      .counter { /* 100+ lines of CSS */ }
    </style>
  </template>
}
```

**After** (separate stylesheets):
```javascript
export default class Counter extends Component {
  @tracked count = 0;

  <template>
    <div class="counter">...</div>
  </template>
}
```

## How It Works

1. **Vite/Embroider** automatically processes `app/styles/app.css`
2. CSS `@import` statements are resolved at build time
3. All styles are bundled into a single optimized CSS file for production
4. HMR (Hot Module Replacement) updates styles instantly during development

## Adding New Component Styles

To add styles for a new component:

1. Create `app/styles/components/your-component.css`
2. Add `@import './components/your-component.css';` to `app/styles/app.css`
3. Use class names in your component template

## CSS Best Practices

- Use **BEM naming** or similar methodology for class names
- Keep component styles **scoped** to component-specific classes
- Put **global styles** in `app.css` (typography, resets, utilities)
- Put **component styles** in separate files under `components/`
- Use **CSS custom properties** (CSS variables) for theming

## Development Workflow

When you edit a CSS file:
1. Save the file
2. Vite's HMR instantly updates the browser
3. No page reload required
4. Changes are visible immediately

## Production Build

Run `npm run build` to create an optimized production build:
- All CSS is minified
- Unused styles are removed (if using PurgeCSS/similar)
- CSS is bundled into a single file with cache-busting hash
- Optimal performance for production deployment

---

Updated: 2025-11-29
