import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import remarkDocusaurusTabs from 'remark-docusaurus-tabs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Ikalogic Logic Analyzer API documentation',
  tagline: 'Learn how to use API call to control Ikalogic Logic Analyzers',
  favicon: 'img/favicon.png',
  trailingSlash: false,
  // Set the production url of your site here
  url: 'https://ikalogic.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/learn-logic-analyzer-api/',

  themes: ['@docusaurus/theme-mermaid'],
  // Explicitly enable Mermaid in Markdown
  markdown: {
    mermaid: true,
  },
  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'ikalogic', // Usually your GitHub org/user name.
  projectName: 'learn-logic-analyzer-api', // Usually your repo name.
  deploymentBranch: 'main',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          remarkPlugins: [remarkDocusaurusTabs],
          routeBasePath: '/',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: '',
      logo: {
        alt: 'Ikalogic website',
        href: 'https://ikalogic.com/',
        src: 'img/logo-light.png',
        srcDark: 'img/logo-dark.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Logic Analyzers API Documentation',
        },
        //{to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://ikalogic.com/',
          label: 'Ikalogic',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Ikalogic',
          items: [
            {
              label: 'AT1000 product page',
              to: '/docs/intro',
            },
            {
                label: 'Support page',
                to: '/docs/intro',
            },
            {
                label: 'More test instruments',
                to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Learn more',
          items: [
            {
              label: 'Learn JavaScript',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Learn Python',
              href: 'https://discordapp.com/invite/docusaurus',
            }
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Ikalogic Blog',
              href: 'https://ikalogic.com/Blog/',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/facebook/docusaurus',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Ikalogic SAS. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
