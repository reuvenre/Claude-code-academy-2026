import type { Level } from './levels';

// סילבוס מתוכנן לפי CONTENT_OUTLINE.md: מספר, slug וכותרת בלבד (בלי טענות עובדתיות).
// שיעור שנכתב (קיים ב-content/lessons) מקבל קישור וזמן קריאה בעמוד השער; השאר מוצגים כ"בקרוב".
export interface PlannedLesson {
  n: number;
  slug: string;
  title: string;
}

export const curriculum: Record<Level, PlannedLesson[]> = {
  beginner: [
    { n: 1, slug: 'what-is-claude-code', title: 'מה זה Claude Code' },
    { n: 2, slug: 'how-it-works', title: 'איך Claude Code עובד' },
    { n: 3, slug: 'terminal-basics', title: 'טרמינל למתחילים' },
    { n: 4, slug: 'installation', title: 'התקנה' },
    { n: 5, slug: 'login', title: 'התחברות' },
    { n: 6, slug: 'first-session', title: 'הסשן הראשון' },
    { n: 7, slug: 'first-change', title: 'השינוי הראשון' },
    { n: 8, slug: 'git-basics', title: 'Git בשפה טבעית' },
    { n: 9, slug: 'essential-commands', title: 'פקודות חיוניות ו-/help' },
  ],
  'beginner-plus': [
    { n: 10, slug: 'core-workflow', title: 'ה-workflow הנכון' },
    { n: 11, slug: 'claude-md', title: 'CLAUDE.md ו-/init' },
    { n: 12, slug: 'auto-memory', title: 'Auto memory' },
    { n: 13, slug: 'sessions', title: 'ניהול sessions' },
    { n: 14, slug: 'permission-modes', title: 'Plan mode ומצבי הרשאות' },
    { n: 15, slug: 'common-workflows', title: 'Common workflows' },
    { n: 16, slug: 'interactive-mode', title: 'מצב אינטראקטיבי וקיצורים' },
    { n: 17, slug: 'checkpointing', title: 'Checkpointing ו-/rewind' },
    { n: 18, slug: 'prompt-library', title: 'Prompt library' },
    { n: 19, slug: 'costs-context', title: 'עלויות ו-prompt caching' },
    { n: 20, slug: 'troubleshooting', title: 'פתרון תקלות' },
  ],
  advanced: [
    { n: 21, slug: 'extend-overview', title: 'Extend — מתי משתמשים במה' },
    { n: 22, slug: 'skills', title: 'Skills' },
    { n: 23, slug: 'subagents', title: 'Subagents' },
    { n: 24, slug: 'hooks', title: 'Hooks' },
    { n: 25, slug: 'mcp', title: 'MCP' },
    { n: 26, slug: 'connectors', title: 'קונקטורים' },
    { n: 27, slug: 'plugins', title: 'Plugins ו-evals' },
    { n: 28, slug: 'output-styles', title: 'Output styles' },
    { n: 29, slug: 'advisor', title: 'Advisor tool' },
    { n: 30, slug: 'claude-directory', title: 'תיקיית .claude' },
    { n: 31, slug: 'settings', title: 'Settings' },
    { n: 32, slug: 'permissions-sandbox', title: 'Permissions ו-Sandboxing' },
    { n: 33, slug: 'security', title: 'אבטחה' },
    { n: 34, slug: 'artifacts', title: 'Artifacts' },
    { n: 35, slug: 'accessibility', title: 'נגישות וקורא מסך' },
  ],
  pro: [
    { n: 36, slug: 'agents-overview', title: 'סוכנים במקביל — סקירה' },
    { n: 37, slug: 'agent-view', title: 'Agent view' },
    { n: 38, slug: 'agent-teams', title: 'Agent Teams' },
    { n: 39, slug: 'cross-session', title: 'Cross-session messaging' },
    { n: 40, slug: 'workflows', title: 'Dynamic workflows' },
    { n: 41, slug: 'worktrees', title: 'Worktrees' },
    { n: 42, slug: 'web', title: 'Claude Code on the web' },
    { n: 43, slug: 'projects', title: 'Projects' },
    { n: 44, slug: 'mobile', title: 'Mobile ו-Remote Control' },
    { n: 45, slug: 'routines', title: 'Routines' },
    { n: 46, slug: 'scheduled', title: 'Scheduled tasks ו-/goal' },
    { n: 47, slug: 'channels', title: 'Channels ו-deep links' },
    { n: 48, slug: 'computer-use', title: 'Computer use' },
    { n: 49, slug: 'chrome', title: 'Chrome' },
    { n: 50, slug: 'ultrareview', title: 'ultrareview' },
    { n: 51, slug: 'ci-cd', title: 'CI/CD' },
    { n: 52, slug: 'desktop', title: 'Desktop' },
    { n: 53, slug: 'ide', title: 'IDE' },
    { n: 54, slug: 'claude-tag', title: 'Claude Tag' },
    { n: 55, slug: 'agent-sdk', title: 'Claude Agent SDK' },
    { n: 56, slug: 'large-codebases', title: 'Large codebases ו-monorepo' },
    { n: 57, slug: 'power-tuning', title: 'Fast mode, מודל, קול ומסך מלא' },
  ],
  'product-family': [
    { n: 58, slug: 'surfaces', title: 'משטחים' },
    { n: 59, slug: 'cowork', title: 'Cowork' },
    { n: 60, slug: 'claude-academy', title: 'יישור מול Claude Academy' },
  ],
  fluency: [{ n: 61, slug: 'ai-fluency', title: 'AI Fluency — לחשוב על סוכן' }],
  enterprise: [
    { n: 62, slug: 'admin', title: 'Admin setup ו-managed settings' },
    { n: 63, slug: 'feature-availability', title: 'Feature availability' },
    { n: 64, slug: 'gateways', title: 'Gateways' },
    { n: 65, slug: 'environments', title: 'Self-hosted ו-cloud environments' },
    { n: 66, slug: 'cloud-deploy', title: 'פריסות ענן' },
    { n: 67, slug: 'observability', title: 'Monitoring, Analytics ו-ZDR' },
    { n: 68, slug: 'adoption', title: 'אימוץ בארגון' },
  ],
};
