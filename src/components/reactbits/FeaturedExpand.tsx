import { useEffect, useState } from 'react';
import type { FocusEvent, ReactNode } from 'react';
import ScrollExpand from './ScrollExpand';
import { useReducedMotion } from '../../lib/useIsDark';

interface Props {
  /** Portada horizontal (16:9) para pantallas apaisadas. */
  src: string;
  /** Portada vertical (9:16) para móviles y tabletas en vertical. */
  srcPortrait: string;
  alt: string;
  title: string;
  hint: string;
  children?: ReactNode;
}

// Recorrido de la escena en altos de pantalla. El alto reservado de la sección en index.astro
// (245svh = 1 + SCROLL + HOLD) debe coincidir para que la página no salte al hidratar.
const SCROLL = 1.1;
const HOLD = 0.35;

function usePortrait() {
  const [portrait, setPortrait] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(orientation: portrait)');
    const update = () => setPortrait(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return portrait;
}

/**
 * Proyecto destacado con ScrollExpand (React Bits): una ventana redondeada con el título se expande
 * a pantalla completa mientras bajas y, al final, aparecen la descripción y los enlaces.
 * - Portada vertical u horizontal según la orientación (en móvil la horizontal recortaría los teléfonos).
 * - Teclado: al tabular hasta los enlaces, la escena salta a su estado expandido; si no, recibirían
 *   el foco siendo invisibles.
 * - Movimiento reducido: no se fija la escena; se muestra la portada estática con su contenido.
 */
export default function FeaturedExpand({ src, srcPortrait, alt, title, hint, children }: Props) {
  const reduce = useReducedMotion();
  const portrait = usePortrait();
  const image = portrait ? srcPortrait : src;

  if (reduce) {
    // En vertical, el estado final de la escena (a pantalla completa) sin animar: una tarjeta 9:16
    // no deja sitio al texto debajo de los teléfonos. En horizontal, tarjeta redondeada.
    if (portrait) {
      return (
        <div className="relative h-svh overflow-hidden">
          <img src={image} alt={alt} className="absolute inset-0 size-full object-cover" />
          <div className="absolute inset-0">{children}</div>
        </div>
      );
    }
    return (
      <div className="mx-auto max-w-5xl px-4">
        <div className="relative overflow-hidden rounded-[28px]">
          <img src={image} alt={alt} className="aspect-video w-full object-cover" />
          <div className="absolute inset-0">{children}</div>
        </div>
      </div>
    );
  }

  const revealOnFocus = (e: FocusEvent<HTMLDivElement>) => {
    const section = e.currentTarget.closest('section');
    if (!section) return;
    const vh = window.innerHeight;
    const start = section.getBoundingClientRect().top + window.scrollY;
    const expanded = start + vh * SCROLL;
    const y = window.scrollY;
    // Ya expandida y aún fijada: no mover nada.
    if (y >= expanded && y <= start + vh * (SCROLL + HOLD)) return;
    window.scrollTo({ top: expanded + vh * (HOLD / 2), behavior: 'auto' });
  };

  return (
    <ScrollExpand
      // Remontar al cambiar de orientación: la escena se vuelve a medir con la nueva configuración.
      key={portrait ? 'portrait' : 'landscape'}
      src={image}
      alt={alt}
      title={title}
      scrollHint={hint}
      useWindowScroll
      startWidth={portrait ? 80 : 46}
      // En vertical la ventana es casi cuadrada: encuadra los teléfonos y no el fondo vacío de abajo.
      startHeight={portrait ? 38 : 52}
      startRadius={portrait ? 24 : 28}
      endRadius={0}
      mediaZoom={1.25}
      // Punto focal en los teléfonos: a la derecha en la portada horizontal, arriba en la vertical.
      focusX={portrait ? 50 : 66}
      focusY={portrait ? 38 : 50}
      scrollDistance={SCROLL}
      holdDistance={HOLD}
      smoothing={0.08}
      overlayScrim={0.5}
    >
      <div className="contents" onFocus={revealOnFocus}>
        {children}
      </div>
    </ScrollExpand>
  );
}
