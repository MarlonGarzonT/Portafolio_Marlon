import { useEffect, useState, type ComponentType, type ReactNode, type SVGProps } from 'react';
import SpotlightCard from './reactbits/SpotlightCard';
import GradientText from './reactbits/GradientText';
import ClickSpark from './reactbits/ClickSpark';
import { GlassPanel } from './ios/parts';
import { ArrowUpRight, Checkmark, DocOnDoc, Envelope, LogoGithub, LogoLinkedin } from './ios/icons';

interface Props {
  labels: {
    lead: string;
    cta: string;
    email: string;
    profile: string;
    external: string;
    copy: string;
    copied: string;
    copiedLive: string;
  };
  email: string;
  linkedin: string;
  github: string;
}

/*
 * Contacto con React Bits (isla; antes de hidratar ya son enlaces normales):
 * - Titular con GradientText (azul → morado de iOS; quieto con movimiento reducido).
 * - Tres tarjetas SpotlightCard: una luz del color de cada marca sigue al cursor o al foco del
 *   teclado. La tarjeta entera es el enlace (enlace estirado), con el anillo de foco por dentro
 *   para que no lo recorte el overflow de la tarjeta.
 * - ClickSpark: chispas al pulsar cualquier tarjeta o el botón de copiar.
 * - Correo: botón "Copiar" (útil para reclutadores) con aviso en una región aria-live. Solo aparece
 *   tras hidratar y si el navegador permite el portapapeles.
 */

type Card = {
  key: string;
  href: string;
  label: string;
  value: string;
  color: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  external: boolean;
};

function IconTile({ color, children }: { color: string; children: ReactNode }) {
  return (
    <span aria-hidden="true" className="grid size-11 shrink-0 place-items-center rounded-[11px] text-[22px] text-white" style={{ background: color }}>
      {children}
    </span>
  );
}

export default function ContactCards({ labels, email, linkedin, github }: Props) {
  const handle = github.replace(/^https?:\/\/(www\.)?github\.com\/?/, '');
  const cards: Card[] = [
    { key: 'email', href: `mailto:${email}`, label: labels.email, value: email, color: '#0A84FF', Icon: Envelope, external: false },
    { key: 'linkedin', href: linkedin, label: 'LinkedIn', value: labels.profile, color: '#0A66C2', Icon: LogoLinkedin, external: true },
    { key: 'github', href: github, label: 'GitHub', value: `@${handle}`, color: '#2d333b', Icon: LogoGithub, external: true },
  ];

  const [canCopy, setCanCopy] = useState(false);
  const [copied, setCopied] = useState(false);
  useEffect(() => setCanCopy(typeof navigator !== 'undefined' && !!navigator.clipboard?.writeText), []);
  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(id);
  }, [copied]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      // Sin permiso de portapapeles: el enlace mailto sigue disponible.
      setCanCopy(false);
    }
  };

  return (
    <GlassPanel className="mx-4 p-5 sm:p-7">
      <p className="text-[22px] font-semibold leading-tight tracking-[-0.01em] text-white sm:text-[26px]">
        {labels.lead}{' '}
        <GradientText colors={['#0A84FF', '#BF5AF2', '#64D2FF']} animationSpeed={10} glow={0.25} className="font-bold">
          {labels.cta}
        </GradientText>
      </p>

      {/* ClickSpark: chispas en cada clic dentro (ratón, táctil y teclado), incluido "Copiar". */}
      <div className="mt-6">
        <ClickSpark sparkColor={['#0A84FF', '#BF5AF2', '#ffffff']} sparkCount={10} sparkRadius={26} shape="star">
          <ul className="grid gap-3 md:grid-cols-3">
            {cards.map(({ key, href, label, value, color, Icon, external }) => (
              <li key={key}>
                <SpotlightCard
                  spotlightColor={key === 'github' ? '#ffffff' : color}
                  intensity={0.18}
                  spotlightSize={220}
                  borderGlow={0.8}
                  className="h-full rounded-[22px]! p-5!"
                  style={{ ['--spotlight-card-surface' as string]: 'rgba(255,255,255,0.05)', ['--spotlight-card-shadow' as string]: 'none' }}
                >
                  <div className="flex items-start justify-between">
                    <IconTile color={color}>
                      <Icon />
                    </IconTile>
                    <ArrowUpRight className="size-4 text-white/45" aria-hidden="true" />
                  </div>
                  <p className="mt-4 text-[13px] font-semibold uppercase tracking-wide text-white/55">{label}</p>
                  <p className="mt-0.5 text-[16px] font-semibold text-white [overflow-wrap:anywhere]">
                    {/* El correo solo puede cortarse antes de la @ (nunca a mitad de "gmail.com"). */}
                    {key === 'email' ? (
                      <span className="[overflow-wrap:normal]">
                        {value.split('@')[0]}
                        <wbr />@{value.split('@')[1]}
                      </span>
                    ) : (
                      value
                    )}
                  </p>

                  {/* Enlace estirado: toda la tarjeta es clicable. */}
                  <a
                    href={href}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="absolute inset-0 z-[2] rounded-[inherit] outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
                  >
                    <span className="sr-only">
                      {label}: {value}
                      {external ? ` ${labels.external}` : ''}
                    </span>
                  </a>

                  {key === 'email' && canCopy && (
                    <button
                      type="button"
                      onClick={copyEmail}
                      aria-label={copied ? labels.copied : `${labels.copy} ${email}`}
                      className="press relative z-[3] mt-3 inline-flex h-9 items-center gap-1.5 rounded-full bg-white/10 px-3.5 text-[14px] font-semibold text-white transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      {copied ? <Checkmark className="size-4 text-[#30d158]" aria-hidden="true" /> : <DocOnDoc className="size-4" aria-hidden="true" />}
                      {copied ? labels.copied : labels.copy}
                    </button>
                  )}
                </SpotlightCard>
              </li>
            ))}
          </ul>
        </ClickSpark>
      </div>
      <p className="sr-only" aria-live="polite">
        {copied ? labels.copiedLive : ''}
      </p>
    </GlassPanel>
  );
}
