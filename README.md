# Portafolio — Marlon Garzón

Sitio personal de Marlon Garzón, desarrollador full stack. Es estático y bilingüe (español / inglés), con aspecto y comportamiento de app de iOS: listas agrupadas como en Ajustes, proyectos como en la App Store y navegación con material de vidrio.

> **Estado:** la estructura y el diseño están listos. El correo, LinkedIn, GitHub y el proyecto Mi Cuadre son reales; la experiencia, los demás proyectos, el stack y el texto de "Sobre mí" de `src/data/profile.ts` son **contenido de ejemplo** (busca `EDITAR`).

## Stack

| Área | Tecnología |
| --- | --- |
| Framework | [Astro 7](https://astro.build): HTML estático; React solo donde hay interacción |
| Componentes | [Konsta UI 5](https://konstaui.com) con tema iOS (React) |
| Estilos | [Tailwind CSS 4](https://tailwindcss.com) |
| Movimiento | [Motion](https://motion.dev): *springs* interrumpibles en la navegación; animaciones CSS ligadas al scroll |
| Efectos | [React Bits](https://reactbits.dev) (en `src/components/reactbits/`): fondo PlasmaWave (fijo), GradualBlur en los bordes, DecryptedText, ProfileCard, ScrollExpand para el proyecto destacado y StarBorder, GlareHover y Magnet en los botones del inicio |
| Íconos | [Framework7 Icons](https://framework7.io/icons/) (estilo SF Symbols) y [Simple Icons](https://simpleicons.org) (logos de tecnologías) |
| Tipografía | SF Pro (fuente de sistema de Apple) con Inter como respaldo en Windows y Android |

## Puesta en marcha

Requisitos: Node.js 22.23.4 o superior.

```sh
npm install
npm run dev
```

| Comando | Acción |
| --- | --- |
| `npm run dev` | Servidor de desarrollo en `localhost:4321` |
| `npm run dev -- --host` | Igual, accesible desde el móvil en la misma red (para ver SF Pro en un iPhone) |
| `npm run check` | Verificación de tipos |
| `npm run build` | Genera el sitio en `dist/` |
| `npm run preview` | Sirve `dist/` localmente |

## Estructura

```text
src/
├── assets/            Imágenes optimizadas por Astro (retrato, íconos y portadas de proyectos)
├── components/
│   ├── Header.tsx       Navegación (isla interactiva): píldora de vidrio en escritorio,
│   │                    barra de pestañas en móvil, idioma y apariencia
│   ├── Hero.tsx         Avatar, estado, saludo y acciones
│   ├── Experience.tsx   Lista agrupada estilo Ajustes
│   ├── Projects.tsx     Lista estilo App Store
│   ├── About.tsx        Texto y stack en fichas
│   ├── Contact.tsx      Filas de contacto con flecha
│   └── ios/             Proveedor del tema iOS, íconos y piezas compartidas
├── data/profile.ts    Todo el contenido
├── i18n/ui.ts         Textos de interfaz (ES/EN, tipados)
├── layouts/           Documento base: SEO, hreflang y tema sin destello
├── lib/               Logos (Simple Icons) y apariencia clara/oscura
└── pages/             / (redirección por idioma) · /[lang]/ · 404
```

## Cómo funciona

- **HTML estático con islas de React.** Las secciones son componentes de Konsta renderizados a HTML en el build. Solo se hidratan las piezas interactivas:
  - La navegación, cuando el navegador está libre (`client:idle`); sus enlaces funcionan antes como HTML normal.
  - Los efectos de React Bits, incluidos los botones del inicio (`HeroActions.tsx`), que antes de hidratar ya funcionan como enlaces normales.
  - El proyecto destacado, al acercarse a la pantalla (`client:visible`).
- **Proyecto destacado (ScrollExpand):** una ventana con el nombre de la app se expande a pantalla completa al hacer scroll y termina con la descripción y los enlaces.
  - Usa una portada horizontal (16:9, teléfonos a la derecha y texto a la izquierda) o vertical (9:16, texto debajo) según la orientación.
  - Con el teclado, al llegar a sus enlaces la escena se expande sola.
  - Con movimiento reducido se muestra estática; sin JavaScript se oculta, porque el proyecto sigue en la lista.
- **Tema iOS en cada sección:** Astro renderiza cada componente React por separado, así que cada uno se envuelve en `components/ios/Ios.tsx` (`KonstaProvider` con tema iOS). La clase `k-ios` está en `<html>`.
- **Apariencia:** automática, clara u oscura. Un script en el `<head>` la aplica antes de pintar y el cambio se hace con un fundido (View Transitions).
- **Principios de diseño de Apple:**
  - Respuesta al pulsar (escala en `:active`; el indicador se mueve en `pointerdown`).
  - *Springs* sin rebote e interrumpibles.
  - Material translúcido en la navegación, con fundido donde se cruza con el contenido.
  - Tracking negativo en títulos.
  - Respeto de `prefers-reduced-motion` y `prefers-reduced-transparency`.

## Editar el contenido

Todo vive en [`src/data/profile.ts`](src/data/profile.ts):

- `profile`: nombre, rol, presentación, correo y redes.
- `experience`: trabajos, con logros.
- `projects`: proyectos con su "ícono de app" (logo y degradado) y enlaces.
- `skillGroups`: stack por áreas.
- `about`: texto de "Sobre mí".

La foto está en `src/assets/retrato-marlon.png`; el avatar se genera en 88, 176 y 264 px en WebP.

Las portadas del proyecto destacado son `src/assets/proyectos/mi-cuadre-portada.webp` (3840×2160) y `mi-cuadre-portada-movil.webp` (1620×2880).

- **Origen:** composiciones hechas a partir de la pantalla pública de inicio de sesión de la app.
- **Cómo cambiarlas:** basta con reemplazar los archivos manteniendo la composición. En la horizontal, el contenido va a la derecha y la izquierda queda despejada para el texto; en la vertical, arriba, con la parte de abajo despejada.
- **Encuadre inicial:** si cambia la composición, ajusta `focusX`/`focusY` en `src/components/reactbits/FeaturedExpand.tsx`.

## Despliegue

Sitio estático: `npm run build` y publicar `dist/` (Vercel, Netlify, Cloudflare Pages…). Define `SITE_URL` con tu dominio para las URL de canonical, hreflang y Open Graph.

## Créditos

- Estructura de secciones inspirada en [porfolio.dev](https://github.com/midudev/porfolio.dev), de midudev. El código y el diseño de este sitio son propios.
- [React Bits](https://github.com/DavidHDev/react-bits), de David Haz: PlasmaWave, GradualBlur, DecryptedText, ProfileCard, ScrollExpand, StarBorder, GlareHover y Magnet. Licencia MIT + Commons Clause, incluida en `src/components/reactbits/LICENSE.md`: se pueden usar en sitios y productos, pero no vender ni redistribuir los componentes en sí.
  - ScrollExpand está adaptado: punto focal, legibilidad del título y accesibilidad. Los cambios se detallan en la cabecera del archivo.
  - El brillo del distintivo "Disponible" reproduce el efecto ShinyText en CSS.
- [Konsta UI](https://github.com/konstaui/konsta) y [Framework7 Icons](https://github.com/framework7io/framework7-icons) (MIT), [Simple Icons](https://github.com/simple-icons/simple-icons) (CC0; los logos son marcas de sus dueños), [Motion](https://github.com/motiondivision/motion) (MIT), [Inter](https://github.com/rsms/inter) (OFL 1.1).
