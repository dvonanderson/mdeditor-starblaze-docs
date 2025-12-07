# mdEditor Starblaze Documentation

This directory contains the VitePress documentation for mdEditor Starblaze.

## Development

Start the documentation development server:

```bash
npm run docs:dev
```

Visit: `http://localhost:5173/mdeditor-starblaze/`

## Building

Build the documentation for production:

```bash
npm run docs:build
```

The built documentation will be in `docs/.vitepress/dist/`

## Preview

Preview the production build:

```bash
npm run docs:preview
```

## Structure

```
docs/
├── .vitepress/
│   └── config.mjs           # VitePress configuration
├── public/                  # Static assets
│   └── mdeditor.png        # Logo
├── guide/                   # Getting started guides
│   ├── index.md
│   ├── quick-start.md
│   └── setup.md
├── integrations/            # Integration guides
│   ├── bootstrap.md
│   ├── gjs-syntax.md
│   ├── favicon-setup.md
│   └── doctoc-usage.md
├── development/             # Development guides
│   ├── github-setup.md
│   ├── branching.md
│   ├── ci-cd.md
│   └── stylesheet-organization.md
└── index.md                 # Home page
```

## Deployment

The documentation can be deployed to:

- **GitHub Pages** - Automatic deployment via GitHub Actions
- **Netlify** - Connect your repository and set build command to `npm run docs:build` with publish directory `docs/.vitepress/dist`
- **Vercel** - Similar to Netlify
- Any static hosting service

## Configuration

The main configuration file is `docs/.vitepress/config.mjs`. This includes:

- Site metadata (title, description)
- Navigation menu
- Sidebar structure
- Search configuration
- Theme settings

## Adding New Pages

1. Create a new `.md` file in the appropriate directory
2. Update `docs/.vitepress/config.mjs` to add it to the navigation/sidebar
3. The dev server will hot-reload with your changes

## Customization

VitePress uses a default theme that can be customized. See the [VitePress documentation](https://vitepress.dev/) for more details on theming and advanced configuration.
