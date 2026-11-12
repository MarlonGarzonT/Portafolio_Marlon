/**
 * Contenido del portafolio. Todo lo que ves en el sitio sale de aquí.
 *
 * ⚠ La experiencia, los proyectos, el correo y los enlaces son EJEMPLOS de
 *   estructura: reemplázalos por tu información real antes de publicar.
 *   Busca "EDITAR".
 */
import type { ImageMetadata } from 'astro';
import type { Localized } from '../i18n/ui';
import type { BrandKey } from '../lib/brands';
import retrato from '../assets/retrato-marlon.png';
import iconoMiCuadre from '../assets/proyectos/mi-cuadre.png';

export interface Job {
  start: string;
  /** `null` = trabajo actual. */
  end: string | null;
  company: string;
  role: Localized;
  summary: Localized;
  highlights: Localized<string[]>;
}

export interface Project {
  slug: string;
  title: string;
  kind: Localized;
  summary: Localized;
  stack: string[];
  /** Ícono real de la app (PNG cuadrado). Si no hay, se dibuja uno con `icon` y `tint`. */
  image?: ImageMetadata;
  /** Logo que va en el "ícono de app" generado. */
  icon: BrandKey;
  /** Degradado del ícono (arriba → abajo), como los íconos de iOS. */
  tint: [string, string];
  links: { live?: string; repo?: string };
}

export interface SkillGroup {
  title: Localized;
  items: { name: string; icon?: BrandKey }[];
}

// EDITAR: datos personales
export const profile = {
  name: 'Marlon Garzón',
  firstName: 'Marlon',
  photo: retrato as ImageMetadata,
  available: true,
  role: { es: 'Desarrollador Full Stack', en: 'Full Stack Developer' } satisfies Localized,
  intro: {
    es: 'en Colombia. Construyo productos web completos, de la base de datos al último píxel: interfaces rápidas y claras sobre APIs y datos bien modelados.',
    en: 'based in Colombia. I build complete web products, from the database to the last pixel: fast, clear interfaces on top of well-modeled APIs and data.',
  } satisfies Localized,
  email: 'marlonarley2014@gmail.com',
  socials: {
    linkedin: 'https://www.linkedin.com/in/marlon-arley-garzon-toro-b0a4102ab/',
    github: 'https://github.com/MarlonGarzonT',
  },
  seo: {
    description: {
      es: 'Portafolio de Marlon Garzón, desarrollador full stack. Productos web completos con foco en interfaz, rendimiento y APIs sólidas.',
      en: 'Portfolio of Marlon Garzón, full stack developer. Complete web products focused on interface, performance and solid APIs.',
    } satisfies Localized,
  },
};

// EDITAR: experiencia de ejemplo
export const experience: Job[] = [
  {
    start: '2023',
    end: null,
    company: 'Freelance',
    role: { es: 'Desarrollador Full Stack', en: 'Full Stack Developer' },
    summary: {
      es: 'Construyo productos de punta a punta para startups y pymes: descubrimiento, diseño de interfaz, desarrollo y despliegue.',
      en: 'I build end-to-end products for startups and small businesses: discovery, interface design, development and deployment.',
    },
    highlights: {
      es: ['Lancé 6 productos en producción con Next.js y PostgreSQL.', 'Implementé CI/CD y entornos de previsualización por rama.'],
      en: ['Shipped 6 production products with Next.js and PostgreSQL.', 'Set up CI/CD and per-branch preview environments.'],
    },
  },
  {
    start: '2021',
    end: '2023',
    company: 'Empresa de software',
    role: { es: 'Desarrollador Front-end', en: 'Front-end Developer' },
    summary: {
      es: 'Desarrollo del sistema de diseño y de las aplicaciones web principales del producto.',
      en: 'Built the design system and the core web applications of the product.',
    },
    highlights: {
      es: ['Creé una librería de 40+ componentes accesibles usada por 3 equipos.', 'Reduje el bundle inicial un 45% con code splitting.'],
      en: ['Built a library of 40+ accessible components used by 3 teams.', 'Cut the initial bundle by 45% with code splitting.'],
    },
  },
];

export const projects: Project[] = [
  // Proyecto real
  {
    slug: 'mi-cuadre',
    title: 'Mi Cuadre',
    kind: { es: 'App de finanzas · PWA', en: 'Finance app · PWA' },
    summary: {
      es: 'Registra ingresos y gastos en segundos, con el balance del mes, gráficos por categoría, historial editable y exportación a Excel. Se instala en el celular como una app nativa.',
      en: 'Log income and expenses in seconds, with the monthly balance, category charts, an editable history and Excel export. Installs on your phone like a native app.',
    },
    stack: ['React', 'TypeScript', 'Supabase', 'Konsta UI'],
    image: iconoMiCuadre,
    icon: 'siReact',
    tint: ['#2c3445', '#181f2b'],
    links: { live: 'https://micuadre-app.vercel.app', repo: 'https://github.com/MarlonGarzonT/finanzas-pwa' },
  },

  // EDITAR: proyectos de ejemplo (reemplázalos o elimínalos antes de publicar)
  {
    slug: 'agenda-clinica',
    title: 'Agenda Clínica',
    kind: { es: 'Web app', en: 'Web app' },
    summary: {
      es: 'Reservas para clínicas con calendario en tiempo real, recordatorios automáticos y panel por sede.',
      en: 'Clinic bookings with a real-time calendar, automatic reminders and a per-location dashboard.',
    },
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma'],
    icon: 'siNextdotjs',
    tint: ['#5AC8FA', '#007AFF'],
    links: { live: 'https://example.com' },
  },
  {
    slug: 'stockline',
    title: 'Stockline',
    kind: { es: 'Dashboard', en: 'Dashboard' },
    summary: {
      es: 'Inventario multi-bodega con sincronización offline, escaneo desde el móvil y reportes exportables.',
      en: 'Multi-warehouse inventory with offline sync, mobile scanning and exportable reports.',
    },
    stack: ['React', 'Node.js', 'MongoDB', 'PWA'],
    icon: 'siReact',
    tint: ['#64D2FF', '#30B0C7'],
    links: { live: 'https://example.com' },
  },
  {
    slug: 'pasarela-pagos',
    title: 'Pasarela de pagos',
    kind: { es: 'API', en: 'API' },
    summary: {
      es: 'Integración de pagos con webhooks idempotentes y conciliación diaria.',
      en: 'Payments integration with idempotent webhooks and daily reconciliation.',
    },
    stack: ['Node.js', 'PostgreSQL', 'Redis'],
    icon: 'siNodedotjs',
    tint: ['#4CD964', '#248A3D'],
    links: {},
  },
  {
    slug: 'lanzamiento-saas',
    title: 'Lanzamiento SaaS',
    kind: { es: 'Sitio web', en: 'Website' },
    summary: {
      es: 'Sitio de marketing con CMS headless y 100 en Lighthouse.',
      en: 'Marketing site with a headless CMS and a 100 Lighthouse score.',
    },
    stack: ['Astro', 'Tailwind CSS', 'Sanity'],
    icon: 'siAstro',
    tint: ['#FF9F0A', '#FF375F'],
    links: { live: 'https://example.com' },
  },
];

// EDITAR: tu stack real
export const skillGroups: SkillGroup[] = [
  {
    title: { es: 'Front-end', en: 'Front-end' },
    items: [
      { name: 'TypeScript', icon: 'siTypescript' },
      { name: 'React', icon: 'siReact' },
      { name: 'Next.js', icon: 'siNextdotjs' },
      { name: 'Astro', icon: 'siAstro' },
      { name: 'Tailwind CSS', icon: 'siTailwindcss' },
    ],
  },
  {
    title: { es: 'Back-end y datos', en: 'Back-end & data' },
    items: [
      { name: 'Node.js', icon: 'siNodedotjs' },
      { name: 'Express', icon: 'siExpress' },
      { name: 'Supabase', icon: 'siSupabase' },
      { name: 'PostgreSQL', icon: 'siPostgresql' },
      { name: 'Prisma', icon: 'siPrisma' },
      { name: 'MongoDB', icon: 'siMongodb' },
    ],
  },
  {
    title: { es: 'Infra y calidad', en: 'Infra & quality' },
    items: [
      { name: 'Docker', icon: 'siDocker' },
      { name: 'Vercel', icon: 'siVercel' },
      { name: 'GitHub Actions', icon: 'siGithubactions' },
      { name: 'Vitest', icon: 'siVitest' },
    ],
  },
];

// EDITAR: tu historia
export const about = {
  es: [
    'Empecé en el desarrollo web porque quería que las cosas que imaginaba existieran en la pantalla. Con el tiempo entendí que un buen producto no es solo código que funciona: es una interfaz que se entiende sin instrucciones y un sistema que no se cae un viernes por la noche.',
    'Hoy trabajo en todo el ciclo: hablo con quien usa el producto, diseño la interfaz, modelo los datos, escribo la API y lo despliego. Me gusta el código simple, los tipos estrictos y las decisiones que se pueden explicar en una línea.',
  ],
  en: [
    'I got into web development because I wanted the things I imagined to exist on screen. Over time I learned that a good product is not just code that works: it is an interface you understand without instructions and a system that does not go down on a Friday night.',
    'Today I work across the whole cycle: I talk to the people who use the product, design the interface, model the data, write the API and ship it. I like simple code, strict types and decisions that can be explained in one line.',
  ],
} satisfies Localized<string[]>;
