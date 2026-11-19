/**
 * Logos de tecnologías (Simple Icons). Se resuelven en build: en el HTML solo
 * queda el <path> del SVG, nada de esta librería llega al navegador.
 */
import * as simpleIcons from 'simple-icons';
import type { SimpleIcon } from 'simple-icons';

export type BrandKey = {
  [K in keyof typeof simpleIcons]: (typeof simpleIcons)[K] extends SimpleIcon ? K : never;
}[keyof typeof simpleIcons];

export interface Brand {
  title: string;
  path: string;
  /** Color de marca legible tanto en claro como en oscuro. */
  color: string;
}

function luminance(hex: string): number {
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Mezcla un color con blanco (t de 0 a 1). */
function lighten(hex: string, t: number): string {
  const c = [0, 2, 4].map((i) => {
    const v = parseInt(hex.slice(i, i + 2), 16);
    return Math.round(v + (255 - v) * t)
      .toString(16)
      .padStart(2, '0');
  });
  return c.join('');
}

// Luminancia mínima para que un logo se lea (≥ 4,5:1, trazos finos incluidos) sobre el fondo oscuro del sitio (~#1c1c1e).
const MIN_LUMINANCE_ON_DARK = 0.22;

export function brand(key: BrandKey): Brand {
  const icon = simpleIcons[key] as SimpleIcon;
  const l = luminance(icon.hex);
  // Marcas negras (Next.js, Vercel, Express…) heredan el color del texto (blanco en este sitio).
  if (l < 0.05) return { title: icon.title, path: icon.path, color: 'currentColor' };
  // Marcas oscuras pero con color (azul de XML, morado de .NET…): se aclaran lo justo para leerse
  // sobre fondo negro, conservando su tono.
  let hex = icon.hex;
  for (let t = 0.1; luminance(hex) < MIN_LUMINANCE_ON_DARK && t <= 0.9; t += 0.1) hex = lighten(icon.hex, t);
  return { title: icon.title, path: icon.path, color: `#${hex}` };
}
