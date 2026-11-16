import type { ComponentType, ReactNode, SVGProps } from 'react';
import { Glass } from 'konsta/react';
import { brand, type BrandKey } from '../../lib/brands';

/**
 * Panel de Liquid Glass para bloques de contenido (inicio, experiencia…), con `Glass` de Konsta.
 * Ajustes al material por defecto, pensado para barras pequeñas:
 * - Más desenfoque y saturación y un tinte más denso: superficie grande = material más grueso, y
 *   contraste AA aunque pase por detrás la parte más brillante del fondo.
 * - `touch-auto!`: Glass trae `touch-action: none`, que en un panel grande impediría hacer scroll
 *   en el móvil al deslizar sobre él.
 * - Sin reflejo al pasar el puntero (es un contenedor, no un control) y superficie sólida con
 *   `prefers-reduced-transparency` (clase `chrome`).
 */
export function GlassPanel({ className = '', children }: { className?: string; children: ReactNode }) {
  return (
    <Glass
      component="div"
      highlight={false}
      colors={{ bgIos: 'bg-white/70 dark:bg-[rgba(28,28,30,0.55)]' }}
      className={`chrome rounded-[28px] touch-auto! backdrop-blur-2xl! backdrop-saturate-150 sm:rounded-[32px] ${className}`}
    >
      {children}
    </Glass>
  );
}

/** Ícono cuadrado redondeado de color, como los de Ajustes de iOS. */
export function SettingsIcon({ color, children, size = 'md' }: { color: string; children: ReactNode; size?: 'md' | 'lg' }) {
  return (
    <span
      aria-hidden="true"
      className={
        size === 'lg'
          ? 'grid size-9 shrink-0 place-items-center rounded-[9px] text-[20px] text-white'
          : 'grid size-[30px] shrink-0 place-items-center rounded-[7px] text-[17px] text-white'
      }
      style={{ background: color }}
    >
      {children}
    </span>
  );
}

/** Logo de una tecnología (Simple Icons), en su color de marca o en el color del texto. */
export function BrandGlyph({ icon, className = 'size-4', mono = false }: { icon: BrandKey; className?: string; mono?: boolean }) {
  const b = brand(icon);
  return (
    <svg viewBox="0 0 24 24" className={className} fill={mono ? 'currentColor' : b.color} aria-hidden="true" focusable="false">
      <path d={b.path} />
    </svg>
  );
}

/**
 * Ícono de app (squircle con degradado y brillo superior), como en la App Store.
 * Radio ≈ 22,5% del lado, el de los íconos de iOS.
 */
export function AppIcon({
  icon,
  glyph: Glyph,
  tint,
  image,
}: {
  icon?: BrandKey;
  /** Ícono de sistema (estilo SF Symbols); tiene prioridad sobre el logo `icon`. */
  glyph?: ComponentType<SVGProps<SVGSVGElement>>;
  tint: [string, string];
  image?: { src: string; srcSet: string };
}) {
  if (image) {
    return (
      <img
        src={image.src}
        srcSet={image.srcSet}
        sizes="60px"
        width={60}
        height={60}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="size-[60px] shrink-0 rounded-[13.5px] object-cover shadow-[0_0_0_0.5px_rgb(0_0_0/0.08)]"
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      className="relative grid size-[60px] shrink-0 place-items-center overflow-hidden rounded-[13.5px] text-white shadow-[inset_0_0_0_0.5px_rgb(0_0_0/0.08)]"
      style={{ background: `linear-gradient(180deg, ${tint[0]}, ${tint[1]})` }}
    >
      <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent" />
      {Glyph ? (
        <Glyph className="relative size-[30px]" aria-hidden="true" />
      ) : (
        icon && <BrandGlyph icon={icon} mono className="relative size-[30px]" />
      )}
    </span>
  );
}

/** Título de sección con ícono de Ajustes (estructura de porfolio.dev, lenguaje iOS). */
export function SectionTitle({ id, color, icon, children }: { id: string; color: string; icon: ReactNode; children: ReactNode }) {
  return (
    <h2 id={id} className="mx-4 mb-4 flex items-center gap-3 text-[28px] font-bold leading-tight tracking-display sm:text-[32px]">
      <SettingsIcon color={color} size="lg">
        {icon}
      </SettingsIcon>
      {children}
    </h2>
  );
}
