// מרכז הרפרנס — העמודים המתוכננים (CONTENT_OUTLINE.md → "מרכז רפרנס חי").
// עמוד שנכתב (קיים ב-content/reference) מקבל קישור; השאר מוצגים "בקרוב".
export interface PlannedReference {
  slug: string;
  title: string;
  /** הדף הרשמי תחת code.claude.com/docs/en/ */
  docsPage: string;
}

export const referencePlan: PlannedReference[] = [
  { slug: 'cli', title: 'CLI reference: פקודות ודגלים', docsPage: 'cli-reference' },
  { slug: 'commands', title: 'כל הפקודות בתוך הסשן', docsPage: 'commands' },
  { slug: 'env-vars', title: 'משתני סביבה', docsPage: 'env-vars' },
  { slug: 'tools', title: 'הכלים של Claude', docsPage: 'tools-reference' },
  { slug: 'settings', title: 'Settings reference', docsPage: 'settings-reference' },
  { slug: 'hooks', title: 'Hooks reference', docsPage: 'hooks' },
  { slug: 'plugins', title: 'Plugins reference', docsPage: 'plugins-reference' },
  { slug: 'channels', title: 'Channels reference', docsPage: 'channels-reference' },
  { slug: 'glossary', title: 'מילון מונחים', docsPage: 'glossary' },
  { slug: 'changelog', title: 'Changelog', docsPage: 'changelog' },
  { slug: 'whats-new', title: "What's New", docsPage: 'whats-new' },
];
