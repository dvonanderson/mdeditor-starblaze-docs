import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'mdEditor Starblaze',
  description: 'Documentation for mdEditor Starblaze - A metadata editor application',
  base: '/mdeditor-starblaze-docs/', // Change to '/' if deploying to custom domain

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/mdeditor.png',

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'Integrations', link: '/integrations/bootstrap' },
      { text: 'Development', link: '/development/github-setup' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Introduction', link: '/guide/' },
            { text: 'Quick Start', link: '/guide/quick-start' },
            { text: 'Setup Summary', link: '/guide/setup' },
          ],
        },
      ],
      '/integrations/': [
        {
          text: 'Integrations',
          items: [
            { text: 'Bootstrap Integration', link: '/integrations/bootstrap' },
            { text: 'GJS Syntax Guide', link: '/integrations/gjs-syntax' },
            { text: 'Favicon Setup', link: '/integrations/favicon-setup' },
            { text: 'DocToc Usage', link: '/integrations/doctoc-usage' },
          ],
        },
      ],
      '/development/': [
        {
          text: 'Development',
          items: [
            { text: 'GitHub Setup Checklist', link: '/development/github-setup' },
            { text: 'Branching Strategy', link: '/development/branching' },
            { text: 'CI/CD Guide', link: '/development/ci-cd' },
            {
              text: 'Stylesheet Organization',
              link: '/development/stylesheet-organization',
            },
          ],
        },
      ],
    },

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/dvonanderson/mdeditor-starblaze',
      },
    ],

    search: {
      provider: 'local',
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present mdEditor Starblaze',
    },
  },

  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }],
  ],
});
