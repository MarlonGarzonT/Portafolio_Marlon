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

export function brand(key: BrandKey): Brand {
  const icon = simpleIcons[key] as SimpleIcon;
  // Marcas negras (Next.js, Vercel, Express…) heredan el color del texto para verse en ambos temas.
  const color = luminance(icon.hex) < 0.05 ? 'currentColor' : `#${icon.hex}`;
  return { title: icon.title, path: icon.path, color };
}
