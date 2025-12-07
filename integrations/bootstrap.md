# Bootstrap 5 Integration Guide

This document explains how Bootstrap 5 has been integrated into the mdEditor Starblaze Ember.js application.

## Installed Packages

```bash
npm install bootstrap @popperjs/core bootstrap-icons
```

### Dependencies

- **bootstrap** (v5.x) - The main Bootstrap CSS and JavaScript framework
- **@popperjs/core** - Required for Bootstrap's JavaScript components (tooltips, popovers, dropdowns)
- **bootstrap-icons** - Official Bootstrap icon font

## Integration Setup

### 1. Import Bootstrap in `app/app.ts`

Bootstrap CSS, JavaScript, and Icons are imported globally in the main application file:

```typescript
// app/app.ts
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
```

**Note**: We use `bootstrap.bundle.min.js` which includes Popper.js bundled in.

### 2. Custom Styles in `app/styles/app.css`

The custom CSS file now works alongside Bootstrap, providing:

- Custom CSS variables for gradients
- Component-specific overrides
- Custom styling that complements Bootstrap

## Bootstrap Components Used

### Navigation (`app/templates/application.gts`)

- **Navbar** - Responsive navigation with hamburger menu
- **Container-fluid** - Full-width container
- **Navbar-toggler** - Mobile menu toggle
- **Bootstrap Icons** - Icons in navigation links

```handlebars
<nav class="navbar navbar-expand-lg main-nav">
  <div class="container-fluid">
    <h1 class="navbar-brand mb-0">MDEditor Starblaze</h1>
    <!-- Navbar items -->
  </div>
</nav>
```

### Markdown Editor Component (`app/components/markdown-editor.gjs`)

- **Card** - Container with header, body, and footer
- **Grid System** - Responsive 2-column layout (`row`, `col-md-6`)
- **Form Controls** - Styled textarea (`form-control`)
- **Buttons** - Bootstrap button styles (`btn`, `btn-danger`)
- **Utility Classes** - Spacing, borders, shadows

```handlebars
<div class="card shadow-sm mb-4">
  <div class="card-header">...</div>
  <div class="card-body">
    <div class="row g-0">
      <div class="col-md-6">...</div>
      <div class="col-md-6">...</div>
    </div>
  </div>
  <div class="card-footer">...</div>
</div>
```

### Counter Component (`app/components/counter.gjs`)

- **Button Group** - Grouped buttons (`btn-group`)
- **Button Variants** - Different button styles (`btn-light`, `btn-warning`)
- **Bootstrap Icons** - Icons in buttons

```handlebars
<div class="btn-group" role="group">
  <button class="btn btn-light">Decrement</button>
  <button class="btn btn-warning">Reset</button>
  <button class="btn btn-light">Increment</button>
</div>
```

## Bootstrap Utility Classes Used

### Spacing

- `p-3`, `p-0` - Padding
- `m-0`, `mb-3`, `mb-4` - Margins
- `px-4`, `py-3` - Horizontal/Vertical padding

### Layout

- `d-flex` - Flexbox display
- `justify-content-between` - Space between items
- `align-items-center` - Center items vertically
- `row`, `col-md-6` - Grid system
- `g-0` - Remove gutters

### Typography

- `text-center` - Center text
- `text-muted` - Muted text color
- `text-primary` - Primary color text

### Borders & Shadows

- `border-end` - Right border
- `shadow-sm` - Small box shadow

### Colors

- `bg-light` - Light background

## Bootstrap Icons

Icons are used throughout the application with the `bi` class:

```html
<i class="bi bi-pencil-square"></i> Markdown Editor
<i class="bi bi-speedometer2"></i> Component Demo
<i class="bi bi-dash-lg"></i> Decrement
<i class="bi bi-plus-lg"></i> Increment
<i class="bi bi-arrow-clockwise"></i> Reset
<i class="bi bi-x-circle"></i> Clear
```

## Responsive Design

Bootstrap's responsive classes ensure the app works on all screen sizes:

- **Navbar**: Collapses to hamburger menu on mobile
- **Markdown Editor**: Two-column layout on desktop (`col-md-6`), stacks on mobile
- **Spacing**: Responsive padding/margins using Bootstrap utilities

## Customization

### Custom Gradients

We maintain custom gradients via CSS variables:

```css
:root {
  --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --editor-gradient: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
}
```

### Overriding Bootstrap Styles

Custom styles in `app.css` override Bootstrap defaults when needed:

```css
.main-nav {
  background: var(--primary-gradient);
}

.markdown-input:focus {
  border-color: #3498db;
  box-shadow: 0 0 0 0.25rem rgba(52, 152, 219, 0.25);
}
```

## Benefits of Bootstrap Integration

✅ **Responsive out of the box** - Mobile-first design
✅ **Consistent styling** - Professional, polished UI
✅ **Rich component library** - Cards, buttons, forms, navbar
✅ **Utility classes** - Rapid development with utility-first CSS
✅ **Accessibility** - Built-in ARIA attributes and semantic HTML
✅ **Icons** - 1,800+ Bootstrap Icons available
✅ **JavaScript components** - Interactive elements (modals, dropdowns, etc.)

## Using Bootstrap JavaScript Components

Bootstrap's JavaScript is available for interactive components:

```javascript
// Example: Show a modal
import { Modal } from 'bootstrap';
const modal = new Modal(document.getElementById('myModal'));
modal.show();
```

## Further Customization

### Add Custom Bootstrap Theme

You can customize Bootstrap variables by creating a custom SCSS file:

1. Create `app/styles/bootstrap-custom.scss`
2. Override Bootstrap variables
3. Import Bootstrap SCSS

### Use More Components

Explore Bootstrap's full component library:

- Modals
- Dropdowns
- Tooltips
- Accordions
- Alerts
- Badges
- Progress bars
- And more!

## Documentation Links

- [Bootstrap 5 Docs](https://getbootstrap.com/docs/5.3/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [Bootstrap Examples](https://getbootstrap.com/docs/5.3/examples/)
