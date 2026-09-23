import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appName } from './shared';

// בלי קישור ל-GitHub באתר (החלטת בעל האתר)
export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      // JSX supported
      title: appName,
    },
    links: [
      { text: 'הקורס', url: '/beginner' },
      { text: 'מרכז הרפרנס', url: '/reference' },
      { text: 'בלוג', url: '/blog' },
    ],
  };
}
