import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  // Takumi (תמונות OG עם תמיכה ב-RTL) משתמש בבינארי native — לפי fumadocs.dev/docs/integrations/og/takumi
  serverExternalPackages: ['@takumi-rs/core'],
};

export default withMDX(config);
