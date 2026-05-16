// @ts-check
const { themes } = require('prism-react-renderer');
const lightCodeTheme = themes?.github ?? require('prism-react-renderer/themes/github');
const darkCodeTheme = themes?.dracula ?? require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Orkestra Docs',
  tagline: 'API Reference & Guides',
  favicon: 'img/favicon.ico',

  url: 'https://docs.orkestra.example',
  baseUrl: '/',

  organizationName: 'orkestra',
  projectName: 'orkestra-docs',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: { defaultLocale: 'en', locales: ['en'] },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          // Serve docs at the site root (API-reference feel, sidebar-first)
          routeBasePath: '/',
          // Pull markdown from the repo-level ../docs folder
          path: '../docs',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/orkestra/orkestra/edit/main/',
          showLastUpdateTime: true,
          showLastUpdateAuthor: true,
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/orkestra-social-card.png',
      colorMode: { defaultMode: 'light', respectPrefersColorScheme: true },
      docs: {
        sidebar: { hideable: true, autoCollapseCategories: true },
      },
      navbar: {
        title: 'Orkestra',
        logo: { alt: 'Orkestra Logo', src: 'img/logo.svg' },
        hideOnScroll: false,
        items: [
          { type: 'docSidebar', sidebarId: 'docs', position: 'left', label: 'Docs' },
          { type: 'docsVersionDropdown', position: 'right' },
          { href: 'https://github.com/orkestra/orkestra', label: 'GitHub', position: 'right' },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [{ label: 'Getting Started', to: '/' }],
          },
          {
            title: 'Community',
            items: [
              { label: 'GitHub', href: 'https://github.com/orkestra/orkestra' },
            ],
          },
          {
            title: 'More',
            items: [{ label: 'License (Apache-2.0)', href: 'https://www.apache.org/licenses/LICENSE-2.0' }],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Orkestra. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['bash', 'yaml', 'json', 'go', 'python', 'docker'],
      },
      // Algolia DocSearch — replace placeholders with real credentials.
      // If you don't have Algolia, remove this block; the local search plugin
      // below provides offline full-text search.
      algolia: {
        appId: 'YOUR_APP_ID',
        apiKey: 'YOUR_SEARCH_API_KEY',
        indexName: 'orkestra',
        contextualSearch: true,
      },
    }),

  // Local full-text search fallback (works without Algolia keys).
  plugins: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        indexDocs: true,
        indexBlog: false,
        docsRouteBasePath: '/',
        highlightSearchTermsOnTargetPage: true,
      },
    ],
  ],
};

module.exports = config;
