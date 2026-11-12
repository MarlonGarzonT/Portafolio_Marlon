import type { ReactNode } from 'react';
import StarBorder from './reactbits/StarBorder';
import Magnet from './reactbits/Magnet';
import GlareHover from './reactbits/GlareHover';
import { Envelope, LogoGithub, LogoLinkedin } from './ios/icons';
import { useIsDark } from '../lib/useIsDark';

interface Props {
  labels: { nav: string; contact: string; external: string };
  email: string;
  linkedin: string;
  github: string;
}

/*
 * Acciones del inicio con React Bits (isla; antes de hidratar ya son enlaces normales):
 * - Contáctame: StarBorder, una estrella que recorre el borde. Marca la acción principal, da una
 *   vuelta rápida al pasar el cursor y lanza un pulso al pulsar. Con movimiento reducido, quieta.
 * - LinkedIn / GitHub: pastillas de vidrio con GlareHover (reflejo que barre al pasar el cursor o
 *   al llegar con el teclado).
 * - Las tres: Magnet, atracción sutil hacia el cursor (máx. 6 px, muelle casi sin rebote).
 *   Solo con ratón: Magnet ignora el táctil y respeta el movimiento reducido.
 */

// Muelle con amortiguación ~0,85: sigue al cursor con vida pero sin oscilar (criterio de Apple).
const SPRING = { stiffness: 170, damping: 22, mass: 1 };
const PILL = 24; // radio = mitad de los 48 px de alto

function Magnetic({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <Magnet padding={40} magnetStrength={5} maxOffset={6} spring={SPRING} wrapperClassName={className}>
      {children}
    </Magnet>
  );
}

export default function HeroActions({ labels, email, linkedin, github }: Props) {
  const dark = useIsDark();
  const external = { target: '_blank', rel: 'noopener noreferrer' };

  // Pastilla de vidrio: fondo y borde por variables (GlareHover los aplica como estilo en línea,
  // así que las variantes de tema se resuelven con custom properties).
  const glass = (href: string, icon: ReactNode, label: string) => (
    <Magnetic>
      <GlareHover
        width="var(--pill-w)"
        background="var(--pill-bg)"
        borderColor="var(--pill-border)"
        borderRadius={`${PILL}px`}
        glareColor={dark ? '#ffffff' : '#007aff'}
        glareOpacity={dark ? 0.32 : 0.18}
        blendMode={dark ? 'screen' : 'normal'}
        glareAngle={-30}
        glareSize={45}
        transitionDuration={600}
        className="[--pill-bg:rgba(255,255,255,0.55)] [--pill-border:rgba(0,0,0,0.08)] [--pill-w:100%] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-primary sm:[--pill-w:auto] dark:[--pill-bg:rgba(255,255,255,0.08)] dark:[--pill-border:rgba(255,255,255,0.14)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]"
      >
        <a
          href={href}
          {...external}
          className="press flex h-12 w-full items-center justify-center gap-2 px-5 text-[17px] font-semibold text-black/85 outline-none dark:text-white"
        >
          {icon}
          {label}
          <span className="sr-only">{labels.external}</span>
        </a>
      </GlareHover>
    </Magnetic>
  );

  return (
    // Móvil: la acción principal a lo ancho y las redes en dos mitades; por debajo de 360 px no caben
    // dos pastillas por fila, así que las tres van apiladas.
    <nav aria-label={labels.nav} className="grid grid-cols-1 gap-3 min-[360px]:grid-cols-2 sm:flex sm:flex-wrap sm:items-center">
      <Magnetic className="min-[360px]:col-span-2">
        <StarBorder
          as="a"
          href={`mailto:${email}`}
          theme="dark"
          backgroundColor="var(--color-primary)"
          textColor="#ffffff"
          borderColor="rgba(255,255,255,0.3)"
          color="#ffffff"
          trailColor="#9fd0ff"
          radius={PILL}
          thickness={1.5}
          duration={5}
          trailLength={0.35}
          glow={0.75}
          sparkle
          hover="lap"
          className="press h-12 w-full px-6 py-0 text-[17px] font-semibold shadow-[0_10px_28px_-12px_var(--color-primary)] focus-visible:outline-primary! sm:w-auto"
        >
          <Envelope className="size-[18px]" aria-hidden="true" />
          {labels.contact}
        </StarBorder>
      </Magnetic>
      {glass(linkedin, <LogoLinkedin className="size-[18px] text-[#0a66c2] dark:text-[#4da3ff]" aria-hidden="true" />, 'LinkedIn')}
      {glass(github, <LogoGithub className="size-[18px]" aria-hidden="true" />, 'GitHub')}
    </nav>
  );
}
