export async function loadMessages(locale) {
  const module = await import(`./locales/${locale}.js`);

  return module.default;
}