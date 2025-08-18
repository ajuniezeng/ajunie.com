export const LANGUAGES = {
  en: 'English',
  cn: '简体中文',
};

export const DEFAULT_LANG = 'en';

export const UI = {
  en: {
    'layout.defaultDescription': "Ajunie's spirit lives here.",
    'nav.themeToggle.light': 'Light',
    'nav.themeToggle.dark': 'Dark',
    'nav.themeToggle.system': 'System',
    'nav.archive': 'Archive',
    '404.title': ', Mission Unknown.',
    '404.subtitle': 'What are you doing here?',
    '500.title': ', Mission Failed.',
    '500.subtitle': 'What are you doing here?',
    'error.return': 'Return',
    'footer.subtitle': "(btw I don't drink coffee; LGBTQ+ 🏳️‍🌈 friendly)",
    'archive.title': 'Archive',
    'archive.description': 'You can find all the articles here',
  },
  cn: {
    'layout.defaultDescription': 'Ajunie 自留地',
    'nav.themeToggle.light': '浅色模式',
    'nav.themeToggle.dark': '深色模式',
    'nav.themeToggle.system': '系统偏好',
    'nav.archive': '归档',
    '404.title': '。',
    '404.subtitle': '前面的区域，以后再来探索吧！',
    '500.title': '，远征失败。',
    '500.subtitle': '祝你下次好运 :)',
    'error.return': '主页',
    'footer.subtitle': '(不喝咖啡谢谢；支持还不反对 LGBTQ+ 🏳️‍🌈)',
    'archive.title': '归档',
    'archive.description': '本站的所有文章归档处',
  },
} as const;
