const getResponseText = (text?: string): string => {
  if (!text) return 'Техническая ошибка при регистрации. Мы уже работаем над её устранением';
  return text.split('"')[3];
};

export default getResponseText;
