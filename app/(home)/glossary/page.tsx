import { permanentRedirect } from 'next/navigation';

// מילון המונחים חי במרכז הרפרנס. /glossary נשמר ככתובת קצרה (CONTENT_OUTLINE → עמודי תשתית).
export default function GlossaryRedirect() {
  permanentRedirect('/reference/glossary');
}
