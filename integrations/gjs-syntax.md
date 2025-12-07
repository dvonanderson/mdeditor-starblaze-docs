# .gjs Template Tag Components - Syntax Guide

## Overview

**mdEditor Starblaze** is built using Ember.js with modern `.gjs` (or `.gts` for TypeScript) template tag components. This syntax allows you to write components with inline templates, eliminating the need for separate template files.

## What is .gjs?

`.gjs` (JavaScript) and `.gts` (TypeScript) files use the **template tag format**, where the template is embedded directly in the component class using `<template>` tags. This is the modern, recommended approach for Ember components.

## Key Syntax Elements

### 1. File Structure

```javascript
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';

export default class MyComponent extends Component {
  // Component logic here
  @tracked myProperty = 'initial value';

  myAction = () => {
    // Action handler
  };

  <template>
    <!-- Template markup here -->
    <div>{{this.myProperty}}</div>
    <button {{on "click" this.myAction}}>Click me</button>
  </template>
}
```

### 2. Reactive State with @tracked

The `@tracked` decorator makes properties reactive. When a tracked property changes, the template automatically updates:

```javascript
import { tracked } from '@glimmer/tracking';

export default class Counter extends Component {
  @tracked count = 0;

  increment = () => {
    this.count++; // Template updates automatically
  };

  <template>
    <p>Count: {{this.count}}</p>
    <button {{on "click" this.increment}}>+</button>
  </template>
}
```

### 3. Event Handling with {{on}} Modifier

Use the `{{on}}` modifier to attach event listeners:

```javascript
import { on } from '@ember/modifier';

<template>
  <button {{on "click" this.handleClick}}>Click</button>
  <input {{on "input" this.handleInput}} />
</template>
```

### 4. Inline Styles

You can include `<style>` tags directly in the template:

```javascript
<template>
  <div class="my-component">
    <h1>Hello World</h1>
  </div>

  <style>
    .my-component {
      padding: 2rem;
      background: #f0f0f0;
    }
  </style>
</template>
```

### 5. Importing and Using Components

Components can be imported and used directly:

```javascript
import Counter from './counter.gjs';

<template>
  <div>
    <h1>My Page</h1>
    <Counter />
  </div>
</template>;
```

### 6. Template-Only Components

For simple components without logic, you can export just the template:

```javascript
<template>
  <div class="simple-component">
    <p>This is a template-only component</p>
  </div>
</template>
```

## Benefits of .gjs Syntax

1. **Colocation**: Component logic and template in one file
2. **Better IDE support**: Full JavaScript/TypeScript tooling
3. **Explicit imports**: No magic resolution, clear dependencies
4. **Type safety**: Full TypeScript support with `.gts`
5. **Modern**: Latest Ember best practices
6. **Scoped styles**: Styles can be colocated with components

## Examples in This Project

### Counter Component (`app/components/counter.gjs`)

Demonstrates:

- `@tracked` reactive state
- Multiple action handlers
- Event handling with `{{on}}`
- Inline styles
- Dynamic content rendering

### Markdown Editor Component (`app/components/markdown-editor.gjs`)

Demonstrates:

- Form input handling
- Two-way data binding patterns
- Component state management
- CSS Grid layout
- Real-time preview updates

### Route Templates

Template-only route components:

- `app/templates/editor.gts` - Imports and renders MarkdownEditor
- `app/templates/demo.gts` - Imports and renders Counter
- `app/templates/application.gts` - Navigation with LinkTo component

## Build System

This project uses **Embroider** with **Vite**, the modern build system for Ember that provides:

- Fast HMR (Hot Module Replacement)
- Optimized production builds
- Modern JavaScript output
- Better tree-shaking

Configuration: `vite.config.mjs`

## Running the Application

```bash
# Start development server
npm start

# Visit http://localhost:4200

# Build for production
npm run build

# Run tests
npm test

# Lint code
npm run lint
```

## File Naming Conventions

- `.gjs` - JavaScript components with template tags
- `.gts` - TypeScript components with template tags
- Both formats are fully supported in this project

## Learn More

- [Ember.js Guides](https://guides.emberjs.com/)
- [Glimmer Components](https://guides.emberjs.com/release/components/)
- [Template Tag Format](https://rfcs.emberjs.com/id/0779-first-class-component-templates)
- [Tracked Properties](https://guides.emberjs.com/release/components/component-state-and-actions/)

---

Built with Ember.js 6.8 and Embroider/Vite
