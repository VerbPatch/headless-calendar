// @ts-check
import fs from 'fs';
import path from 'path';
import { buildExamplesNav } from './example-nav-tree.mjs';

function docNavigation() {
  return [
    {
      title: 'Cookbook',
      group: 'doc',
      children: [
        {
          title: 'Building a Full Calendar',
          path: '/Calendar/docs/cookbook/building-a-full-calendar',
        },
        {
          title: 'Building a Mini Calendar',
          path: '/Calendar/docs/cookbook/building-a-mini-calendar',
        },
        {
          title: 'Building a Scheduler',
          path: '/Calendar/docs/cookbook/building-a-scheduler',
        },
        {
          title: 'ICS Import & Export',
          path: '/Calendar/docs/cookbook/ics-integration',
        },
      ],
    },
    {
      title: 'Components',
      group: 'doc',
      children: [
        {
          title: 'Building a Month Grid',
          path: '/Calendar/docs/components/building-a-month-grid',
        },
        {
          title: 'Building a Week View',
          path: '/Calendar/docs/components/building-a-week-view',
        },
        {
          title: 'Building a Weekday View',
          path: '/Calendar/docs/components/building-a-weekday-view',
        },
        {
          title: 'Event Styling & Positioning',
          path: '/Calendar/docs/components/event-styling',
        },
      ],
    },
    {
      title: 'Core Concepts',
      group: 'doc',
      children: [
        {
          title: 'Architecture',
          path: '/Calendar/docs/core-concepts/architecture',
        },
        {
          title: 'Options',
          path: '/Calendar/docs/core-concepts/calendar-options',
        },
        {
          title: 'State',
          path: '/Calendar/docs/core-concepts/calendar-state',
        },
        {
          title: 'Event Management',
          path: '/Calendar/docs/core-concepts/event-management',
        },
        {
          title: 'Drag and Drop',
          path: '/Calendar/docs/core-concepts/drag-and-drop',
        },
        {
          title: 'Custom Views',
          path: '/Calendar/docs/core-concepts/custom-views',
        },
        {
          title: 'Localization',
          path: '/Calendar/docs/core-concepts/localization',
        },
        {
          title: 'Multiple Calendars',
          path: '/Calendar/docs/core-concepts/multiple-calendars',
        },
        {
          title: 'Navigation State',
          path: '/Calendar/docs/core-concepts/use-navigation',
        },
      ],
    },
    {
      title: 'Introduction',
      group: 'doc',
      children: [
        {
          title: 'Headless Calendar?',
          path: '/Calendar/docs/introduction',
        },
        {
          title: 'Getting Started',
          path: '/Calendar/docs/getting-started',
        },
      ],
    },
  ];
}

/**
 * @param {import('typedoc-plugin-markdown').MarkdownApplication} app
 */
export function load(app) {
  let publicPath = '';

  app.renderer.on('beginRender', () => {
    publicPath = (app.options.getValue('publicPath') || '').replace(/\/$/, '');
  });

  app.renderer.on('endPage', (page) => {
    if (!page.contents) return;

    // Remove .md and preserve anchors
    page.contents = page.contents.replace(/(\[[^\]]*]\([^)\s]+?)\.md(#[^)]+)?\)/g, '$1$2)');
  });

  app.renderer.on('endRender', () => {
    const outputDir = app.options.getValue('out');
    const navJsonPath = path.join(outputDir.replace(/\/api$/, ''), 'navigation.json');
    if (!fs.existsSync(navJsonPath)) return;

    try {
      const originalRaw = fs.readFileSync(navJsonPath, 'utf-8');
      const navData = JSON.parse(originalRaw);

      const processNavItem = (item) => {
        if (item.path) {
          item.path = item.path.replace(/\.md$/, '');

          if (publicPath) {
            const normalized = item.path.startsWith('/') ? item.path : '/' + item.path;
            item.path = publicPath + normalized;
          }
        } else {
          item.group = 'api';
        }
        item.children?.forEach(processNavItem);
      };

      Array.isArray(navData) ? navData.forEach(processNavItem) : processNavItem(navData);

      if (Array.isArray(navData)) {
        const index = navData.findIndex((i) => i.title === 'hooks');
        if (index > -1) {
          navData.unshift(navData.splice(index, 1)[0]);
        }

        docNavigation().forEach((item) => {
          navData.unshift(item);
        });
      }

      const examplesPaths = buildExamplesNav('calendar/examples');
      if (examplesPaths) {
        // @ts-ignore
        examplesPaths.forEach((item) => {
          navData.push(item);
        });
      }

      const updatedRaw = JSON.stringify(navData, null, 2);
      if (updatedRaw !== originalRaw) {
        fs.writeFileSync(navJsonPath, updatedRaw, 'utf-8');
        console.log('navigation.json updated');
      } else {
        console.log('navigation.json unchanged — no write performed');
      }
    } catch (error) {
      console.error('Error processing navigation.json:', error);
    }
  });
}
