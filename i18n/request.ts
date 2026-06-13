import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async (context) => {
  // В новых версиях параметр называется requestLocale, в старых — locale.
  // К тому же, в Next 15/16 это может быть Promise, поэтому используем await.
  const anyContext = context as any;
  let locale = await (anyContext.requestLocale || anyContext.locale);
  
  // Жесткий фоллбек: если локаль по какой-то причине не определилась 
  // (например, при сборке или запросе статических ассетов), ставим дефолтный 'ru'
  if (!locale || typeof locale !== 'string') {
    locale = 'ru';
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});