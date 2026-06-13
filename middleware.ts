import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['ru', 'en','kz'],
  defaultLocale: 'ru'
});

export const config = {
  // Запускаем мультиязычность для всего, КРОМЕ папки /api, картинок и служебных файлов Next.js
  matcher: ['/((?!api|_next|_vercel|[\\w-]+\\.\\w+).*)']
};