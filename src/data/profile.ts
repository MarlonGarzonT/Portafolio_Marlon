/**
 * Contenido del portafolio. Todo lo que ves en el sitio sale de aquí.
 * Fuente: hoja de vida de Marlon Garzón (noviembre de 2026). El teléfono no se publica a propósito.
 */
import type { ComponentType, SVGProps } from 'react';
import type { ImageMetadata } from 'astro';
import CameraViewfinder from 'framework7-icons/react/esm/CameraViewfinder.js';
import Wrench from 'framework7-icons/react/esm/Wrench.js';
import { DatabaseGlyph } from '../components/ios/glyphs';
import type { Localized } from '../i18n/ui';
import type { BrandKey } from '../lib/brands';
import retrato from '../assets/retrato-marlon.png';
import fotoPrincipal from '../assets/marlon-avatar.jpg';
import iconoMiCuadre from '../assets/proyectos/mi-cuadre.png';

export interface Job {
  start: Localized;
  /** `null` = trabajo actual. Igual a `start` si duró menos de un año (se muestra un solo año). */
  end: Localized | null;
  company: string;
  role: Localized;
  summary: Localized;
  highlights: Localized<string[]>;
  /** Tecnologías usadas en ese trabajo. */
  stack?: string[];
}

export interface Project {
  slug: string;
  title: Localized;
  kind: Localized;
  summary: Localized;
  stack: string[];
  /** Ícono real de la app (PNG cuadrado). Si no hay, se dibuja uno con `glyph` o `icon` y `tint`. */
  image?: ImageMetadata;
  /** Ícono de sistema (Framework7, estilo SF Symbols) para el ícono generado. Tiene prioridad sobre `icon`. */
  glyph?: ComponentType<SVGProps<SVGSVGElement>>;
  /** Logo de tecnología (Simple Icons) para el ícono generado. */
  icon?: BrandKey;
  /** Degradado del ícono (arriba → abajo), como los íconos de iOS. */
  tint: [string, string];
  links: { live?: string; repo?: string };
  /** En desarrollo: muestra la etiqueta "En desarrollo" en lugar del botón. */
  inProgress?: boolean;
}

export interface Service {
  slug: string;
  title: Localized;
  summary: Localized;
  deliverables: Localized<string[]>;
  glyph: ComponentType<SVGProps<SVGSVGElement>>;
  tint: [string, string];
}

export interface SkillGroup {
  title: Localized;
  /** `name` traducible para lo que cambia por idioma (p. ej. los idiomas). */
  items: { name: string | Localized; icon?: BrandKey }[];
}

export const profile = {
  name: 'Marlon Garzón',
  firstName: 'Marlon',
  /** Foto principal (avatar del inicio y de la cápsula de la barra). Original de 200×200 px. */
  avatar: fotoPrincipal as ImageMetadata,
  /** Retrato recortado sin fondo: lo necesita la tarjeta holográfica de "Sobre mí". */
  photo: retrato as ImageMetadata,
  available: true,
  role: { es: 'Desarrollador web con React, TypeScript y Supabase', en: 'Web developer with React, TypeScript and Supabase' } satisfies Localized,
  intro: {
    es: 'Convierto hojas de cálculo y procesos manuales en apps web. Con base en Bogotá, Colombia, desarrollo la automatización de servicio al cliente en AGP, con experiencia previa construyendo soluciones para los sectores financiero y de recursos humanos: integraciones, bases de datos complejas y arquitecturas seguras.',
    en: 'I turn spreadsheets and manual processes into web apps. Based in Bogotá, Colombia, I build customer service automation at AGP, with prior experience creating solutions for the financial and HR sectors: integrations, complex databases and secure architectures.',
  } satisfies Localized,
  email: 'marlonarley2014@gmail.com',
  socials: {
    linkedin: 'https://www.linkedin.com/in/marlon-arley-garzon-toro-b0a4102ab/',
    github: 'https://github.com/MarlonGarzonT',
  },
  seo: {
    description: {
      es: 'Marlon Garzón, desarrollador web en Bogotá. Construyo apps con React, TypeScript y Supabase: convierto hojas de cálculo y procesos manuales en software real.',
      en: 'Marlon Garzón, web developer in Bogotá. I build apps with React, TypeScript and Supabase: turning spreadsheets and manual processes into real software.',
    } satisfies Localized,
  },
};

export const experience: Job[] = [
  {
    start: { es: 'jul. 2026', en: 'Jul 2026' },
    end: null,
    company: 'AGP',
    role: { es: 'Desarrollador Junior', en: 'Junior Developer' },
    summary: {
      es: 'Automatización de procesos y mantenimiento del software de la compañía.',
      en: 'Process automation and maintenance of the company’s software.',
    },
    highlights: {
      es: [
        'Desarrollo el proyecto de automatización de SAC (Servicio al Cliente) con Python y React, reduciendo tareas manuales del equipo.',
        'Gestiono las bases de datos en Azure SQL y programo su lógica en PL/SQL (triggers), dando mantenimiento al software existente de la compañía.',
      ],
      en: [
        'I build the Customer Service (SAC) automation project with Python and React, cutting down the team’s manual work.',
        'I manage the Azure SQL databases and write their logic in PL/SQL (triggers), maintaining the company’s existing software.',
      ],
    },
    stack: ['Python', 'React', 'Azure SQL', 'PL/SQL'],
  },
  {
    start: { es: '2025', en: '2025' },
    end: { es: 'jun. 2026', en: 'Jun 2026' },
    company: 'E.B.S. Enterprise Business Solutions',
    role: { es: 'Constructor Junior Multiplataforma', en: 'Junior Cross-platform Developer' },
    summary: {
      es: 'Desarrollo, modernización y mantenimiento de soluciones multiplataforma para el sector financiero.',
      en: 'Development, modernization and maintenance of cross-platform solutions for the financial sector.',
    },
    highlights: {
      es: [
        'Diseñé y documenté el modelo automatizado de evaluación financiera para las solicitudes de crédito de Fundación Coomeva, agilizando el análisis.',
        'Integré sistemas legados con arquitecturas modernas consumiendo servicios SOAP (XML) y API REST (JSON), sin reescribir el software existente.',
      ],
      en: [
        'Designed and documented the automated financial assessment model for Fundación Coomeva’s credit applications, speeding up the review.',
        'Integrated legacy systems with modern architectures by consuming SOAP (XML) services and REST (JSON) APIs, without rewriting the existing software.',
      ],
    },
    stack: ['Java', 'Node.js', 'Angular', 'TypeScript', 'JavaScript', 'PHP', 'Gupta Team Developer', 'Oracle (PL/SQL)', 'SQL Server', 'Git'],
  },
  {
    start: { es: '2024', en: '2024' },
    end: { es: '2024', en: '2024' },
    company: 'Sodexo',
    role: { es: 'Practicante de Desarrollo de Software', en: 'Software Development Intern' },
    summary: {
      es: 'Proyecto Payroll: sistema de evaluación de desempeño de extremo a extremo para recursos humanos.',
      en: 'Payroll project: an end-to-end performance review system for human resources.',
    },
    highlights: {
      es: ['Desarrollé el módulo de evaluación de desempeño full-stack en Velneo V7 para el área de recursos humanos.'],
      en: ['Built the full-stack performance-review module in Velneo V7 for the HR department.'],
    },
    stack: ['Velneo V7'],
  },
  {
    start: { es: '2023', en: '2023' },
    end: { es: '2023', en: '2023' },
    company: 'Pinturas La Mansión',
    role: { es: 'Desarrollador de Software Junior', en: 'Junior Software Developer' },
    summary: {
      es: 'Diseño, modernización y mantenimiento de un sistema crítico de facturación empresarial.',
      en: 'Design, modernization and maintenance of a business-critical billing system.',
    },
    highlights: {
      es: [
        'Optimicé la gestión operativa y el procesamiento de transacciones del sistema de facturación.',
        'Desarrollé arquitecturas CRUD robustas en C# y .NET, con un flujo de datos eficiente y seguro.',
      ],
      en: ['Improved operational management and transaction processing for the billing system.', 'Built robust CRUD architectures in C# and .NET with an efficient, secure data flow.'],
    },
    stack: ['C#', '.NET', 'Oracle (PL/SQL)', 'SQL Server'],
  },
];

export const projects: Project[] = [
  {
    slug: 'mi-cuadre',
    title: { es: 'Mi Cuadre', en: 'Mi Cuadre' },
    kind: { es: 'App de finanzas · PWA', en: 'Finance app · PWA' },
    summary: {
      es: 'Registra ingresos y gastos en segundos, con el balance del mes, gráficos por categoría, historial editable y exportación a Excel. Se instala en el celular como una app nativa.',
      en: 'Log income and expenses in seconds, with the monthly balance, category charts, an editable history and Excel export. Installs on your phone like a native app.',
    },
    stack: ['React', 'TypeScript', 'Supabase', 'Konsta UI'],
    image: iconoMiCuadre,
    tint: ['#2c3445', '#181f2b'],
    links: { live: 'https://micuadre-app.vercel.app', repo: 'https://github.com/MarlonGarzonT/finanzas-pwa' },
  },
  {
    slug: 'acceso-facial',
    title: { es: 'Control de acceso facial', en: 'Facial access control' },
    kind: { es: 'Seguridad · Visión por computador', en: 'Security · Computer vision' },
    summary: {
      es: 'Sistema de seguridad para monitorear el acceso a laboratorios universitarios: registra rostros con cámaras Intel RealSense y emite alertas de intrusión.',
      en: 'Security system that monitors access to university labs: it enrolls faces with Intel RealSense cameras and raises intrusion alerts.',
    },
    stack: ['React', 'Supabase', 'Intel RealSense'],
    glyph: CameraViewfinder,
    tint: ['#5E5CE6', '#3634A3'],
    links: {},
    inProgress: true,
  },
  {
    slug: 'portafolio',
    title: { es: 'Portafolio personal', en: 'Personal portfolio' },
    kind: { es: 'Sitio web', en: 'Website' },
    summary: {
      es: 'Este sitio: bilingüe, con estética de iOS, Liquid Glass, animaciones ligadas al scroll y efectos WebGL, accesible y con JavaScript solo donde hace falta.',
      en: 'This site: bilingual, with an iOS look, Liquid Glass, scroll-linked animations and WebGL effects, accessible and with JavaScript only where it is needed.',
    },
    stack: ['Astro', 'React', 'Konsta UI', 'Tailwind CSS'],
    icon: 'siAstro',
    tint: ['#0A84FF', '#5E5CE6'],
    links: { repo: 'https://github.com/MarlonGarzonT/Portafolio_Marlon' },
  },
];

export interface FeaturedSkill {
  name: string;
  icon?: BrandKey;
  glyph?: ComponentType<SVGProps<SVGSVGElement>>;
  /** Color del ícono (legible sobre fondo oscuro). */
  color: string;
  /** Dónde se usó: respalda la prioridad con hechos, sin barras de porcentaje inventadas. */
  where: Localized;
}

/**
 * Tecnologías principales, por uso real: cuántos trabajos y proyectos las usan y qué tan
 * recientes son (ver `experience` y `projects`).
 */
export const featuredSkills: FeaturedSkill[] = [
  { name: 'SQL · PL/SQL', glyph: DatabaseGlyph, color: '#FF9F0A', where: { es: 'AGP · E.B.S. · La Mansión', en: 'AGP · E.B.S. · La Mansión' } },
  { name: 'React', icon: 'siReact', color: '#61DAFB', where: { es: 'AGP · Mi Cuadre · Portafolio', en: 'AGP · Mi Cuadre · Portfolio' } },
  { name: 'Python', icon: 'siPython', color: '#FFD43B', where: { es: 'AGP (actual)', en: 'AGP (current)' } },
  { name: 'TypeScript', icon: 'siTypescript', color: '#5BA3F5', where: { es: 'E.B.S. · Mi Cuadre', en: 'E.B.S. · Mi Cuadre' } },
];

/** El resto del stack, de más a menos usado dentro de cada grupo. */
export const skillGroups: SkillGroup[] = [
  {
    title: { es: 'También trabajo con', en: 'Also worked with' },
    items: [
      { name: 'Node.js', icon: 'siNodedotjs' },
      { name: 'JavaScript', icon: 'siJavascript' },
    ],
  },
  {
    title: { es: 'Bases de datos', en: 'Databases' },
    items: [{ name: 'Supabase', icon: 'siSupabase' }],
  },
  {
    title: { es: 'Integraciones', en: 'Integrations' },
    items: [{ name: 'REST' }, { name: 'SOAP' }, { name: 'JSON', icon: 'siJson' }, { name: 'XML', icon: 'siXml' }],
  },
  {
    title: { es: 'Control de versiones', en: 'Version control' },
    items: [
      { name: 'Git', icon: 'siGit' },
      { name: 'GitHub', icon: 'siGithub' },
    ],
  },
  {
    title: { es: 'Idiomas', en: 'Languages' },
    items: [{ name: { es: 'Español · Nativo', en: 'Spanish · Native' } }, { name: { es: 'Inglés · B2', en: 'English · B2' } }],
  },
];

/**
 * Servicios como freelance. Precios orientativos ("Desde X USD"): borrador para que Marlon
 * ajuste los montos según cada caso antes de publicar.
 */
export const services: Service[] = [
  {
    slug: 'hoja-a-app',
    title: { es: 'De hoja de cálculo a app', en: 'Spreadsheet to app' },
    summary: {
      es: 'Migro tu Excel o tus procesos manuales a una app web simple, con una base de datos real detrás.',
      en: 'I migrate your Excel sheet or manual process to a simple web app, backed by a real database.',
    },
    deliverables: {
      es: ['App web a la medida de tu proceso actual', 'Base de datos en Supabase (Postgres)', 'Capacitación de 1 hora para tu equipo'],
      en: ['Web app built around your current process', 'Database on Supabase (Postgres)', '1-hour training session for your team'],
    },
    glyph: Wrench,
    tint: ['#30B0C7', '#1a6e7a'],
  },
  {
    slug: 'landing-captura',
    title: { es: 'Landing con captura de datos', en: 'Landing page with lead capture' },
    summary: {
      es: 'Una página de aterrizaje rápida y clara, con un formulario que guarda cada contacto en una base de datos.',
      en: 'A fast, clear landing page with a form that saves every contact to a database.',
    },
    deliverables: {
      es: ['Landing responsiva de una sola página', 'Formulario conectado a base de datos', 'Dominio y despliegue incluidos'],
      en: ['Responsive one-page landing', 'Form wired to a database', 'Domain and deployment included'],
    },
    glyph: Wrench,
    tint: ['#0A84FF', '#0a4c8f'],
  },
  {
    slug: 'bolsa-arreglos',
    title: { es: 'Bolsa de arreglos', en: 'Hours bundle' },
    summary: {
      es: 'Un bloque de horas para arreglar errores, hacer ajustes pequeños o dar mantenimiento a un sitio o app que ya tienes.',
      en: 'A block of hours to fix bugs, make small tweaks, or maintain a site or app you already have.',
    },
    deliverables: {
      es: ['Bloque de horas de desarrollo', 'Reporte de lo que se hizo en cada arreglo', 'Sin permanencia: se usa cuando lo necesitas'],
      en: ['Development hours block', 'Report of what was done on each fix', 'No subscription: use it whenever you need it'],
    },
    glyph: Wrench,
    tint: ['#5E5CE6', '#34339e'],
  },
];

export const about = {
  es: [
    'Construyo apps web y automatizo procesos con React, TypeScript, Node.js y Supabase.',
    'Trabajo con negocios y equipos pequeños que quieren dejar atrás las hojas de cálculo y los procesos manuales, desde modelos de evaluación de crédito hasta módulos de recursos humanos.',
    'Hablo inglés B2 y trabajo en huso horario UTC-5 (Bogotá, Colombia).',
  ],
  en: [
    'I build web apps and automate processes with React, TypeScript, Node.js and Supabase.',
    'I work with small businesses and teams who want to move past spreadsheets and manual processes, from credit assessment models to HR modules.',
    'I speak English at a B2 level and work in the UTC-5 timezone (Bogotá, Colombia).',
  ],
} satisfies Localized<string[]>;
