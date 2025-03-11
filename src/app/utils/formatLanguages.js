// utils/formatLanguages.js
export const languageMap = {
  cpp: "C++",
  python: "Python",
  java: "Java",
  javascript: "JavaScript",
};

export function formatLanguages(languages) {
  return languages ? languages.map(lang => ({
    ...lang,
    formattedLanguage: languageMap[lang.language] || lang.name || lang.language,
  }))
    : [];
}

export function formatLanguageById(languages) {
  return languages ?
    languages.reduce((acc, lang) => {
      acc[lang.id] = languageMap[lang.language] || lang.name || lang.language;
      return acc;
    }, {})
  : [];
}