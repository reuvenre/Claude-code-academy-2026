# CONTENT_OUTLINE.md — מפת התוכן המלאה (רועננה: ספטמבר 2026)

לכל שיעור: **כותרת** · `slug` · *השאלה שהעמוד עונה עליה* · **מקור רשמי** (תחת
`https://code.claude.com/docs/en/`). 🆕 = נוסף/השתנה מאז גרסת יוני. תמיד לאמת מול הדף החי.

> מקורות אמת: `code.claude.com/docs` + `llms.txt` + `changelog` + **What's New שבועי** + **Claude Academy** (`academy.claude.com`).
> כלל: אין קיבוע שמות מודלים — תמיד להפנות ל‑`model-config`.

---

## רמה 0 — מתחילים לחלוטין  (`/beginner`)
1. **מה זה Claude Code** · `what-is-claude-code` · *מה הוא עושה ובמה שונה?* · `overview`
2. **איך Claude Code עובד** 🆕 · `how-it-works` · *מהו ה‑agentic loop והכלים המובנים?* · `how-claude-code-works`
3. **טרמינל** · `terminal-basics` · *לא מכיר טרמינל — מאיפה מתחילים?* · `terminal-config`
4. **התקנה** · `installation` · *איך מתקינים לפי מערכת הפעלה?* (Windows כבר בלי Git Bash 🆕) · `quickstart`, `setup`
5. **התחברות** · `login` · *איך מתחברים ואיזה חשבון צריך?* · `authentication`
6. **הסשן הראשון** · `first-session` · *הרצתי claude — מה עכשיו?* · `quickstart`
7. **השינוי הראשון** · `first-change` · *איך גורמים ל‑Claude לערוך קובץ?* · `quickstart`
8. **Git בשפה טבעית** · `git-basics` · *commit/branch דרך Claude?* · `quickstart`
9. **פקודות חיוניות + /help** · `essential-commands` · *מה צריך לדעת ביום הראשון?* · `commands`, `quickstart`

## רמה 1 — מתחילים פלוס  (`/beginner-plus`)
10. **ה‑workflow הנכון** · `core-workflow` · *Explore→Plan→Implement→Commit* · `best-practices`, `common-workflows`
11. **CLAUDE.md / AGENTS.md + /init** · `claude-md` · *איך Claude זוכר את הפרויקט?* (המינוף הגבוה ביותר) · `memory`
12. **Auto memory** · `auto-memory` · *איך Claude צובר לקחים לבד?* · `memory`
13. **ניהול sessions** 🆕 · `sessions` · *resume/continue/branch/naming/export?* · `sessions`
14. **Plan mode + מצבי הרשאות** 🆕 · `permission-modes` · *מה זה auto mode (ברירת מחדל!) מול supervised/read‑only?* · `permission-modes`, `permissions`
15. **Common workflows** · `common-workflows` · *debug/refactor/tests/docs* · `common-workflows`
16. **מצב אינטראקטיבי + קיצורים** · `interactive-mode` · *אילו קיצורים חוסכים זמן?* · `interactive-mode`, `keybindings`
17. **Checkpointing + /rewind** 🆕 · `checkpointing` · *איך חוזרים אחורה, גם מלפני /clear?* · `checkpointing`
18. **Prompt library** 🆕 · `prompt-library` · *פרומפטים מוכנים לפי משימה* · `prompt-library`
19. **עלויות + prompt caching** 🆕 · `costs-context` · *איך לא לשרוף מכסה ולהבין caching?* · `costs`, `prompt-caching`, `context-window`
20. **פתרון תקלות** 🆕 · `troubleshooting` · *התקנה/הגדרות/שגיאות* · `troubleshoot-install`, `troubleshooting`, `debug-your-config`, `errors`

## רמה 2 — מתקדמים  (`/advanced`)
21. **Extend — מתי מה** · `extend-overview` · *CLAUDE.md מול Skills/Subagents/Hooks/MCP/Plugins?* · `features-overview`
22. **Skills** · `skills` · *מה זה Skill ואיך יוצרים?* · `skills`
23. **Subagents** · `subagents` · *סוכן משנה ייעודי ולמה?* · `sub-agents`
24. **Hooks** · `hooks` · *אוטומציה על אירועים* · `hooks-guide`, `hooks`
25. **MCP** · `mcp` · *חיבור כלים חיצוניים* · `mcp-quickstart`, `mcp`
26. **קונקטורים** · `connectors` · *Google Drive/Slack/Figma/GitHub* · `mcp`
27. **Plugins + evals** 🆕 · `plugins` · *התקנה, יצירה, ובדיקה עם claude plugin eval* · `discover-plugins`, `plugins`, `plugin-evals`, `plugin-marketplaces`
28. **Output styles** · `output-styles` · *התאמה מעבר לקוד (כולל Concise 🆕)* · `output-styles`
29. **Advisor tool** 🆕 · `advisor` · *מודל‑יועץ חזק להחלטות קשות* · `advisor`
30. **תיקיית .claude** · `claude-directory` · *מה יושב שם ואיך מתחבר?* · `claude-directory`
31. **Settings** 🆕 · `settings` · *הגדרה ברמת פרויקט/צוות/ארגון* · `settings`, `settings-reference`, `settings-example`, `env-vars`
32. **Permissions + Sandboxing** 🆕 · `permissions-sandbox` · *שליטה מדויקת + בידוד bash* · `permissions`, `sandboxing`, `sandbox-environments`
33. **Security + תוספי אבטחה** 🆕 · `security` · *בטיחות + security‑guidance / Claude Security* · `security`, `security-guidance`, `claude-security`
34. **Artifacts** 🆕 · `artifacts` · *פרסום עמוד חי מסשן* · `artifacts`
35. **נגישות / קורא מסך** 🆕 · `accessibility` · *screen reader mode* · `accessibility`

## רמה 3 — מקצוענים  (`/pro`)
36. **סוכנים במקביל — סקירה** 🆕 · `agents-overview` · *subagents/agent view/teams/workflows/projects* · `agents`
37. **Agent view** 🆕 · `agent-view` · *ניהול הרבה סשנים ממסך אחד* · `agent-view`
38. **Agent Teams** · `agent-teams` · *תזמור צוות סשנים* · `agent-teams`
39. **Cross‑session messaging** 🆕 · `cross-session` · *סשנים מדברים ביניהם* · `cross-session-messaging`
40. **Dynamic workflows** 🆕 · `workflows` · *תזמור subagents מסקריפט* · `workflows`
41. **Worktrees** 🆕 · `worktrees` · *סשנים מקבילים מבודדים ב‑git worktree* · `worktrees`
42. **Claude Code on the web** · `web` · *ענן מהדפדפן, --cloud/--teleport* · `web-quickstart`, `claude-code-on-the-web`
43. **Projects** 🆕 · `projects` · *תיאום סשני ענן משותפים* · `claude-projects`
44. **Mobile + Remote Control** 🆕 · `mobile` · *להתחיל/לנווט מהנייד* · `mobile`, `remote-control`
45. **Routines** 🆕 · `routines` · *אוטומציית ענן מתוזמנת/מונעת‑אירוע* · `routines`
46. **Scheduled tasks + /goal** 🆕 · `scheduled` · */loop, cron, ותנאי סיום* · `scheduled-tasks`, `goal`
47. **Channels + deep links** 🆕 · `channels` · *דחיפת אירועים + claude-cli:// links* · `channels`, `deep-links`, `channels-reference`
48. **Computer use** · `computer-use` · *פתיחת אפליקציות וראיית מסך* · `computer-use`
49. **Chrome (GA)** · `chrome` · *חיבור לדפדפן לבדיקות/אוטומציה* · `chrome`
50. **ultrareview** 🆕 · `ultrareview` · */code-review ultra — ביקורת עומק* · `ultrareview`, `code-review`
51. **CI/CD** 🆕 · `ci-cd` · *GitHub Actions (+ cloud providers, Enterprise Server) + GitLab* · `github-actions`, `github-actions-cloud-providers`, `github-enterprise-server`, `gitlab-ci-cd`
52. **Desktop** 🆕 · `desktop` · *סשנים מקבילים, /diff, iOS‑sim, Linux/WSL* · `desktop`, `desktop-quickstart`, `desktop-linux`, `desktop-wsl`, `desktop-ios-simulator`, `desktop-scheduled-tasks`
53. **IDE** · `ide` · *VS Code / JetBrains* · `vs-code`, `jetbrains`
54. **Claude Tag (מחליף Slack)** 🆕 · `claude-tag` · *לתייג @Claude ב‑Slack של הצוות* · `claude-tag`, `slack`
55. **Claude Agent SDK** 🆕 · `agent-sdk` · *הרצה תכנותית — sessions, custom tools, hosting* · `headless`, `agent-sdk/overview`, `agent-sdk/quickstart`
56. **Large codebases / monorepo** 🆕 · `large-codebases` · *nested CLAUDE.md, worktrees, per‑package skills* · `large-codebases`
57. **Fast mode / model / voice / fullscreen** · `power-tuning` · *מהירות, בחירת מודל, הכתבה קולית* · `fast-mode`, `model-config`, `voice-dictation`, `fullscreen`

## משפחת המוצר + Cowork + Academy  (`/product-family`)
58. **משטחים** · `surfaces` · *CLI/Desktop/Web/IDE/Slack/Chrome/Mobile* · `platforms`, `overview`
59. **Cowork** · `cowork` · *ההבדל מ‑Claude Code ולמי* · academy.claude.com/products/cowork (**מוצר אחות — לאמת URL**)
60. **יישור מול Claude Academy** 🆕 · `claude-academy` · *מה יש שם ואיך זה משלים אותנו* · `academy.claude.com/products/code`

## שכבה רוחבית — AI Fluency (4D)  (`/fluency`)
61. **AI Fluency — לחשוב על סוכן** 🆕 · `ai-fluency` · *Delegation/Description/Discernment/Diligence* · `academy.claude.com` (מסגרת 4D)

## ארגוני — אופציונלי  (`/enterprise`)
62. **Admin setup + managed settings** 🆕 · `admin` · `admin-setup`, `managed-settings`, `server-managed-settings`, `managed-mcp`, `auto-mode-config`
63. **Feature availability** 🆕 · `feature-availability` · `feature-availability`
64. **Gateways** 🆕 · `gateways` · *Claude apps gateway / LLM gateway* · `gateways`, `claude-apps-gateway`, `llm-gateway`
65. **Self‑hosted + cloud environments** 🆕 · `environments` · `self-hosted-environments`, `cloud-environments`
66. **פריסות ענן** · `cloud-deploy` · *Bedrock / Claude Platform on AWS / Google Cloud / Foundry* · `amazon-bedrock`, `claude-platform-on-aws`, `google-vertex-ai`, `microsoft-foundry`, `network-config`
67. **Monitoring / Analytics / ZDR** · `observability` · `monitoring-usage`, `analytics`, `costs`, `zero-data-retention`, `data-usage`
68. **אימוץ בארגון** 🆕 · `adoption` · `communications-kit`, `champion-kit`

## מרכז רפרנס חי  (`/reference`)
CLI (`cli-reference`) · פקודות (`commands`) · env vars (`env-vars`) · Tools (`tools-reference`) ·
Settings (`settings-reference`) 🆕 · Hooks (`hooks`) · Plugins (`plugins-reference`) ·
Channels (`channels-reference`) · **Glossary** (`glossary`) 🆕 · Changelog (`changelog`) ·
**What's New שבועי** (`whats-new`) 🆕.

## עמודי תשתית
`/about` (Brand Hub) · `/faq` (FAQPage) · `/glossary` (מונחים he↔en) · `/start` (אבחון רמה).
