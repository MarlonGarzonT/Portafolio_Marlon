export const locales = ['es', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'es';

/** Texto traducido: un valor por idioma. */
export type Localized<T = string> = Record<Locale, T>;

export const htmlLang: Record<Locale, string> = { es: 'es-CO', en: 'en' };
export const ogLocale: Record<Locale, string> = { es: 'es_CO', en: 'en_US' };

const es = {
  skipToContent: 'Saltar al contenido',
  'nav.label': 'Secciones',
  'nav.experience': 'Experiencia',
  'nav.projects': 'Proyectos',
  'nav.about': 'Sobre mí',
  'nav.contact': 'Contacto',
  'lang.switch': 'Read in English',
  'lang.short': 'EN',
  'theme.label': 'Apariencia',
  'theme.system': 'Automática',
  'theme.light': 'Clara',
  'theme.dark': 'Oscura',
  'hero.available': 'Disponible para trabajar',
  'hero.greeting': 'Hola, soy',
  'hero.contact': 'Contáctame',
  'hero.social': 'Redes sociales y contacto',
  'experience.title': 'Experiencia laboral',
  'experience.present': 'Actual',
  'projects.title': 'Proyectos',
  'projects.view': 'Ver',
  'projects.code': 'Código',
  'featured.hint': 'Desliza para ver',
  'featured.alt': 'Mi Cuadre en un iPhone, en modo claro y oscuro',
  'featured.open': 'Abrir la app',
  'about.title': 'Sobre mí',
  'about.stack': 'Stack',
  'about.status': 'Disponible',
  'contact.title': 'Contacto',
  'contact.intro': '¿Tienes un proyecto en mente? Escríbeme y te respondo en menos de 48 horas.',
  'contact.email': 'Correo',
  'contact.profile': 'Ver perfil',
  'footer.made': 'Hecho con Astro y Konsta UI',
  'common.external': '(se abre en una pestaña nueva)',
} as const;

// Tipado contra `es`: si falta una clave en inglés, TypeScript falla.
const en: Record<keyof typeof es, string> = {
  skipToContent: 'Skip to content',
  'nav.label': 'Sections',
  'nav.experience': 'Experience',
  'nav.projects': 'Projects',
  'nav.about': 'About',
  'nav.contact': 'Contact',
  'lang.switch': 'Leer en español',
  'lang.short': 'ES',
  'theme.label': 'Appearance',
  'theme.system': 'Automatic',
  'theme.light': 'Light',
  'theme.dark': 'Dark',
  'hero.available': 'Available for work',
  'hero.greeting': 'Hi, I’m',
  'hero.contact': 'Contact me',
  'hero.social': 'Social links and contact',
  'experience.title': 'Work experience',
  'experience.present': 'Present',
  'projects.title': 'Projects',
  'projects.view': 'View',
  'projects.code': 'Code',
  'featured.hint': 'Scroll to explore',
  'featured.alt': 'Mi Cuadre on an iPhone, in light and dark mode',
  'featured.open': 'Open the app',
  'about.title': 'About me',
  'about.stack': 'Stack',
  'about.status': 'Available',
  'contact.title': 'Contact',
  'contact.intro': 'Have a project in mind? Write to me and I’ll reply within 48 hours.',
  'contact.email': 'Email',
  'contact.profile': 'View profile',
  'footer.made': 'Built with Astro and Konsta UI',
  'common.external': '(opens in a new tab)',
};

const strings: Record<Locale, Record<keyof typeof es, string>> = { es, en };

export type UiKey = keyof typeof es;
export type Translator = (key: UiKey) => string;

export function useTranslations(locale: Locale): Translator {
  return (key) => strings[locale][key];
}

export function otherLocale(locale: Locale): Locale {
  return locale === 'es' ? 'en' : 'es';
}
