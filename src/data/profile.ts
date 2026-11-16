/**
 * Contenido del portafolio. Todo lo que ves en el sitio sale de aquí.
 * Fuente: hoja de vida de Marlon Garzón (noviembre de 2026). El teléfono no se publica a propósito.
 */
import type { ComponentType, SVGProps } from 'react';
import type { ImageMetadata } from 'astro';
import CameraViewfinder from 'framework7-icons/react/esm/CameraViewfinder.js';
import { DatabaseGlyph } from '../components/ios/glyphs';
import type { Localized } from '../i18n/ui';
import type { BrandKey } from '../lib/brands';
import retrato from '../assets/retrato-marlon.png';
import fotoPrincipal from '../assets/marlon-avatar.jpg';
import iconoMiCuadre from '../assets/proyectos/mi-cuadre.png';

export interface Job {
  start: string;
  /** `null` = trabajo actual. Igual a `start` si duró menos de un año (se muestra un solo año). */
  end: string | null;
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
  role: { es: 'Desarrollador de Software', en: 'Software Developer' } satisfies Localized,
  intro: {
    es: 'en Bogotá, Colombia. Hoy lidero la automatización de servicio al cliente en AGP, con experiencia previa construyendo soluciones para los sectores financiero y de recursos humanos: integraciones, bases de datos complejas y arquitecturas seguras.',
    en: 'based in Bogotá, Colombia. I currently lead customer service automation at AGP, with prior experience building solutions for the financial and HR sectors: integrations, complex databases and secure architectures.',
  } satisfies Localized,
  email: 'marlonarley2014@gmail.com',
  socials: {
    linkedin: 'https://www.linkedin.com/in/marlon-arley-garzon-toro-b0a4102ab/',
    github: 'https://github.com/MarlonGarzonT',
  },
  seo: {
    description: {
      es: 'Portafolio de Marlon Garzón, desarrollador de software en Bogotá. Automatización de procesos y soluciones para los sectores financiero y de recursos humanos.',
      en: 'Portfolio of Marlon Garzón, software developer in Bogotá. Process automation and solutions for the financial and HR sectors.',
    } satisfies Localized,
  },
};

export const experience: Job[] = [
  {
    start: '2026', // desde el 6 de julio de 2026
    end: null,
    company: 'AGP',
    role: { es: 'Desarrollador Junior', en: 'Junior Developer' },
    summary: {
      es: 'Automatización de procesos y mantenimiento del software de la compañía.',
      en: 'Process automation and maintenance of the company’s software.',
    },
    highlights: {
      es: [
        'Lidero el proyecto de automatización de SAC (Servicio al Cliente).',
        'Gestiono bases de datos en Azure SQL y programo su lógica en PL/SQL, como triggers.',
        'Desarrollo con Python y React, usando librerías y componentes.',
        'Doy mantenimiento al software existente de la compañía.',
      ],
      en: [
        'I lead the Customer Service (SAC) automation project.',
        'I manage Azure SQL databases and write their logic in PL/SQL, such as triggers.',
        'I build with Python and React, using libraries and components.',
        'I maintain the company’s existing software.',
      ],
    },
    stack: ['Python', 'React', 'Azure SQL', 'PL/SQL'],
  },
  {
    start: '2025',
    end: '2026', // hasta junio de 2026
    company: 'E.B.S. Enterprise Business Solutions',
    role: { es: 'Constructor Junior Multiplataforma', en: 'Junior Cross-platform Developer' },
    summary: {
      es: 'Desarrollo, modernización y mantenimiento de soluciones multiplataforma para el sector financiero.',
      en: 'Development, modernization and maintenance of cross-platform solutions for the financial sector.',
    },
    highlights: {
      es: [
        'Diseñé y documenté el modelo automatizado de evaluación financiera para las solicitudes de crédito de Fundación Coomeva.',
        'Integré sistemas legados con arquitecturas modernas consumiendo servicios SOAP (XML) y API REST (JSON).',
        'Implementé flujos de trabajo con IA (Claude) para automatizar la documentación técnica y optimizar procesos internos.',
      ],
      en: [
        'Designed and documented the automated financial assessment model for Fundación Coomeva’s credit applications.',
        'Integrated legacy systems with modern architectures by consuming SOAP (XML) services and REST (JSON) APIs.',
        'Built AI workflows (Claude) to automate technical documentation and streamline internal processes.',
      ],
    },
    stack: ['Java', 'Node.js', 'Angular', 'TypeScript', 'JavaScript', 'PHP', 'Gupta Team Developer', 'Oracle (PL/SQL)', 'SQL Server', 'Git'],
  },
  {
    start: '2024',
    end: '2024',
    company: 'Sodexo',
    role: { es: 'Practicante de Desarrollo de Software', en: 'Software Development Intern' },
    summary: {
      es: 'Proyecto Payroll: sistema de evaluación de desempeño de extremo a extremo para recursos humanos.',
      en: 'Payroll project: an end-to-end performance review system for human resources.',
    },
    highlights: {
      es: ['Desarrollé el módulo de evaluación full-stack en Velneo V7, que soporta la gestión de recursos humanos de más de 8.000 empleados a nivel nacional.'],
      en: ['Built the full-stack evaluation module in Velneo V7, supporting HR management for more than 8,000 employees nationwide.'],
    },
    stack: ['Velneo V7'],
  },
  {
    start: '2023',
    end: '2023',
    company: 'Pinturas La Mansión',
    role: { es: 'Desarrollador de Software Junior', en: 'Junior Software Developer' },
    summary: {
      es: 'Diseño, modernización y mantenimiento de un sistema crítico de facturación empresarial.',
      en: 'Design, modernization and maintenance of a business-critical billing system.',
    },
    highlights: {
      es: [
        'Optimicé la gestión operativa y el procesamiento de transacciones.',
        'Desarrollé arquitecturas CRUD robustas en C# y .NET, con un flujo de datos eficiente y seguro.',
      ],
      en: ['Improved operational management and transaction processing.', 'Built robust CRUD architectures in C# and .NET with an efficient, secure data flow.'],
    },
    stack: ['C#', '.NET', 'Oracle (PL/SQL)', 'SQL Server'],
  },
  {
    start: '2023',
    end: '2023',
    company: 'Pear Solutions',
    role: { es: 'Técnico de Sistemas', en: 'IT Technician' },
    summary: {
      es: 'Mantenimiento preventivo y correctivo y soporte técnico de primer nivel en equipos de hardware y redes.',
      en: 'Preventive and corrective maintenance and first-level technical support for hardware and networks.',
    },
    highlights: { es: [], en: [] },
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
  { name: 'React', icon: 'siReact', color: '#61DAFB', where: { es: 'AGP · Mi Cuadre · 2 proyectos más', en: 'AGP · Mi Cuadre · 2 more projects' } },
  { name: 'Python', icon: 'siPython', color: '#FFD43B', where: { es: 'AGP (actual)', en: 'AGP (current)' } },
  // Simple Icons no incluye Java (marca de Oracle): se usa el logo de OpenJDK, con el naranja de Java.
  { name: 'Java', icon: 'siOpenjdk', color: '#F89820', where: { es: 'E.B.S.', en: 'E.B.S.' } },
  { name: 'TypeScript', icon: 'siTypescript', color: '#5BA3F5', where: { es: 'E.B.S. · Mi Cuadre', en: 'E.B.S. · Mi Cuadre' } },
  { name: 'C# · .NET', icon: 'siDotnet', color: '#9B7BFF', where: { es: 'Pinturas La Mansión', en: 'Pinturas La Mansión' } },
];

/** El resto del stack, de más a menos usado dentro de cada grupo. */
export const skillGroups: SkillGroup[] = [
  {
    title: { es: 'También trabajo con', en: 'Also worked with' },
    items: [
      { name: 'Angular', icon: 'siAngular' },
      { name: 'Node.js', icon: 'siNodedotjs' },
      { name: 'JavaScript', icon: 'siJavascript' },
      { name: 'PHP', icon: 'siPhp' },
      { name: 'Vue.js', icon: 'siVuedotjs' },
    ],
  },
  {
    title: { es: 'Bases de datos', en: 'Databases' },
    items: [{ name: 'Azure SQL' }, { name: 'Oracle Database' }, { name: 'SQL Server' }, { name: 'Supabase', icon: 'siSupabase' }],
  },
  {
    title: { es: 'Integraciones', en: 'Integrations' },
    items: [{ name: 'REST' }, { name: 'SOAP' }, { name: 'JSON', icon: 'siJson' }, { name: 'XML', icon: 'siXml' }],
  },
  {
    title: { es: 'Entornos empresariales', en: 'Enterprise platforms' },
    items: [{ name: 'Gupta Team Developer' }, { name: 'Velneo V7' }],
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

export const about = {
  es: [
    'Soy desarrollador multiplataforma y estudio Ingeniería de Sistemas y Desarrollo de Software en la Institución Universitaria de Colombia (grado esperado en 2026). Llevo más de un año diseñando e implementando soluciones para los sectores financiero y de recursos humanos, y hoy lidero la automatización de servicio al cliente en AGP.',
    'Me enfoco en optimizar procesos, manejar bases de datos complejas y construir arquitecturas seguras e íntegras: desde modelos de evaluación de crédito e integraciones SOAP y REST con sistemas legados hasta módulos de recursos humanos para más de 8.000 empleados.',
    'Hablo inglés a nivel B2 y uso la IA para automatizar documentación y procesos de desarrollo. Fuera del código juego voleibol: fui campeón de la Liga Arena masculina en 2023.',
  ],
  en: [
    'I’m a cross-platform developer studying Systems Engineering and Software Development at Institución Universitaria de Colombia (expected graduation: 2026). For more than a year I’ve been designing and building solutions for the financial and HR sectors, and I currently lead customer service automation at AGP.',
    'I focus on streamlining processes, handling complex databases and building secure, reliable architectures: from credit assessment models and SOAP and REST integrations with legacy systems to HR modules for more than 8,000 employees.',
    'I speak English at a B2 level and use AI to automate documentation and development workflows. Away from code I play volleyball: I won the men’s Liga Arena in 2023.',
  ],
} satisfies Localized<string[]>;
