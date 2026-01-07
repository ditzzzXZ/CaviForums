/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['en', 'id', 'ms', 'ja', 'zh', 'es', 'es-MX'],
    defaultLocale: 'en',
    localeDetection: true,
  },
};
export default nextConfig;
